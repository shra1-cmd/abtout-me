
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const skills = [
    'C++', 'Python', 'React', 'TailwindCSS', 'Git', 'AI/ML Fundamentals',
    'System Design', 'Threading', 'Neural Predictors', 'JavaScript',
    'TypeScript', 'Vite', 'Computer Vision', 'Data Structures'
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div 
          ref={ref}
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            Skills & Technologies
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className={`bg-secondary/50 hover:bg-secondary border border-border rounded-lg px-4 py-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-md ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
          
          {/* Currently Learning */}
          <div className="text-center">
            <blockquote className="text-xl md:text-2xl font-serif italic text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              "Currently exploring System Design, C++ Threading, and Neural Predictors."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
