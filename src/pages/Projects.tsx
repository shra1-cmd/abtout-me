import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeProvider } from '@/hooks/useTheme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: string;
  title: string;
  description: string;
  github_link: string;
  live_link: string;
  image_url: string;
  created_at: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent shimmer">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore my work and see what I've been building
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted/20 rounded-lg mb-4" />
                  <div className="h-6 bg-muted/20 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-muted/20 rounded mb-2" />
                  <div className="h-4 bg-muted/20 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="glass-card rounded-xl overflow-hidden hover-lift group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {project.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-4">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Projects;
