import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Skill {
  id: string;
  name: string;
  icon_url: string | null;
}

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div 
          ref={ref}
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div>
                <p className="text-sm md:text-base text-primary uppercase tracking-wider font-medium mb-2">
                  MY EXPERTISE
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Skills & Technologies
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A comprehensive toolkit spanning multiple domains - from system design to AI/ML fundamentals.
                </p>
              </div>
              
              <blockquote className="text-lg md:text-xl font-serif italic text-muted-foreground border-l-4 border-primary pl-6 py-2">
                "Currently exploring System Design, C++ Threading, and Neural Predictors."
              </blockquote>
            </div>
            
            {/* Right side - Skills Grid */}
            <div className="relative">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : skills.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No skills added yet
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className={`glass-card p-4 rounded-lg text-center hover-lift flex flex-col items-center gap-2 ${
                        isVisible ? 'animate-fade-in-up' : ''
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill.icon_url && (
                        <img 
                          src={skill.icon_url} 
                          alt={skill.name}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
