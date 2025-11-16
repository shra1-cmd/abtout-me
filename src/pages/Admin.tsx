import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ThemeProvider } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string | null;
  github_link: string | null;
  live_link: string | null;
  image_url: string | null;
}

interface Skill {
  id: string;
  name: string;
  category: string | null;
  icon_url: string | null;
  order_index: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    github_link: '',
    live_link: ''
  });
  const [projectImage, setProjectImage] = useState<File | null>(null);

  // Skill form state
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: ''
  });
  const [skillIcon, setSkillIcon] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!isAdmin) {
        toast({ 
          title: 'Access Denied', 
          description: 'You do not have admin privileges',
          variant: 'destructive' 
        });
        navigate('/');
        return;
      }
      fetchData();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const [projectsData, skillsData] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('order_index', { ascending: true })
      ]);

      if (projectsData.error) throw projectsData.error;
      if (skillsData.error) throw skillsData.error;

      setProjects(projectsData.data || []);
      setSkills(skillsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: 'Error', description: 'Failed to fetch data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const addProject = async () => {
    try {
      let imageUrl = null;
      
      if (projectImage) {
        imageUrl = await uploadImage(projectImage, 'project-images');
        if (!imageUrl) return;
      }

      const { error } = await supabase.from('projects').insert([{
        ...projectForm,
        image_url: imageUrl
      }]);

      if (error) throw error;

      toast({ title: 'Success', description: 'Project added successfully' });
      setProjectForm({ title: '', description: '', github_link: '', live_link: '' });
      setProjectImage(null);
      fetchData();
    } catch (error) {
      console.error('Error adding project:', error);
      toast({ title: 'Error', description: 'Failed to add project', variant: 'destructive' });
    }
  };

  const deleteProject = async (id: string, imageUrl: string | null) => {
    try {
      if (imageUrl) {
        const path = imageUrl.split('/').pop();
        if (path) {
          await supabase.storage.from('project-images').remove([path]);
        }
      }

      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;

      toast({ title: 'Success', description: 'Project deleted successfully' });
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' });
    }
  };

  const addSkill = async () => {
    try {
      let iconUrl = null;
      
      if (skillIcon) {
        iconUrl = await uploadImage(skillIcon, 'skill-icons');
        if (!iconUrl) return;
      }

      const { error } = await supabase.from('skills').insert([{
        ...skillForm,
        icon_url: iconUrl,
        order_index: skills.length
      }]);

      if (error) throw error;

      toast({ title: 'Success', description: 'Skill added successfully' });
      setSkillForm({ name: '', category: '' });
      setSkillIcon(null);
      fetchData();
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({ title: 'Error', description: 'Failed to add skill', variant: 'destructive' });
    }
  };

  const deleteSkill = async (id: string, iconUrl: string | null) => {
    try {
      if (iconUrl) {
        const path = iconUrl.split('/').pop();
        if (path) {
          await supabase.storage.from('skill-icons').remove([path]);
        }
      }

      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;

      toast({ title: 'Success', description: 'Skill deleted successfully' });
      fetchData();
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({ title: 'Error', description: 'Failed to delete skill', variant: 'destructive' });
    }
  };

  if (authLoading || loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </ThemeProvider>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-light tracking-tight mb-8">Admin Panel</h1>
            
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="Project title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Project description"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="github-link">GitHub Link</Label>
                        <Input
                          id="github-link"
                          value={projectForm.github_link}
                          onChange={(e) => setProjectForm({ ...projectForm, github_link: e.target.value })}
                          placeholder="https://github.com/..."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="live-link">Live Demo Link</Label>
                        <Input
                          id="live-link"
                          value={projectForm.live_link}
                          onChange={(e) => setProjectForm({ ...projectForm, live_link: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="project-image">Project Image</Label>
                      <Input
                        id="project-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
                      />
                    </div>
                    
                    <Button onClick={addProject} disabled={!projectForm.title}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-4">
                        {project.image_url && (
                          <img src={project.image_url} alt={project.title} className="w-full h-32 object-cover rounded mb-3" />
                        )}
                        <h3 className="font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProject(project.id, project.image_url)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Skill</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="skill-name">Skill Name</Label>
                        <Input
                          id="skill-name"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          placeholder="e.g., React, Python"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="skill-category">Category</Label>
                        <Input
                          id="skill-category"
                          value={skillForm.category}
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                          placeholder="e.g., Frontend, Backend"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="skill-icon">Skill Icon (optional)</Label>
                      <Input
                        id="skill-icon"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSkillIcon(e.target.files?.[0] || null)}
                      />
                    </div>
                    
                    <Button onClick={addSkill} disabled={!skillForm.name}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {skills.map((skill) => (
                    <Card key={skill.id}>
                      <CardContent className="p-4 text-center">
                        {skill.icon_url && (
                          <img src={skill.icon_url} alt={skill.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
                        )}
                        <h4 className="font-medium mb-1">{skill.name}</h4>
                        {skill.category && (
                          <p className="text-xs text-muted-foreground mb-3">{skill.category}</p>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteSkill(skill.id, skill.icon_url)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Admin;
