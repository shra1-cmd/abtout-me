import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ThemeProvider } from '@/hooks/useTheme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Mail, Github, Linkedin, Instagram, ArrowLeft } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('about_info')
        .select('*');

      if (error) throw error;

      const dataMap = (data || []).reduce((acc, item) => {
        acc[item.key] = item.value || '';
        return acc;
      }, {} as Record<string, string>);

      setAboutData(dataMap);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Mail, label: 'Email', value: aboutData.email, href: `mailto:${aboutData.email}` },
    { icon: Github, label: 'GitHub', value: aboutData.github, href: aboutData.github },
    { icon: Linkedin, label: 'LinkedIn', value: aboutData.linkedin, href: aboutData.linkedin },
    { icon: Instagram, label: 'Instagram', value: aboutData.instagram, href: aboutData.instagram }
  ].filter(link => link.value);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div
              ref={ref}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
                  About Me
                </h1>
                <p className="text-lg text-muted-foreground">
                  Get to know me better
                </p>
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  {aboutData.bio && (
                    <Card className="p-8">
                      <h2 className="text-2xl font-semibold mb-4">Bio</h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {aboutData.bio}
                      </p>
                    </Card>
                  )}

                  {aboutData.interests && (
                    <Card className="p-8">
                      <h2 className="text-2xl font-semibold mb-4">Interests</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {aboutData.interests}
                      </p>
                    </Card>
                  )}

                  {aboutData.current_focus && (
                    <Card className="p-8">
                      <h2 className="text-2xl font-semibold mb-4">Current Focus</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {aboutData.current_focus}
                      </p>
                    </Card>
                  )}

                  {socialLinks.length > 0 && (
                    <Card className="p-8">
                      <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialLinks.map(({ icon: Icon, label, href }) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                          >
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="font-medium">{label}</span>
                          </a>
                        ))}
                      </div>
                    </Card>
                  )}

                  {!aboutData.bio && !aboutData.interests && !aboutData.current_focus && (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">
                        No information available yet. Add content through the admin panel.
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default About;
