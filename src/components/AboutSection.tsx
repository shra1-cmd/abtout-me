
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const facts = [
    { emoji: '🎓', text: 'M.Tech. @ IIT Tirupati (CGPA: 6.55)' },
    { emoji: '🛠️', text: 'B.Tech. Mech @ JNTUH Sultanpur (CGPA: 6.60)' },
    { emoji: '🗣️', text: 'Languages: Telugu, Hindi, English' },
    { emoji: '📍', text: 'Nirmal, Telangana' },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={ref}
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <div className="w-56 h-56 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-6xl font-light text-muted-foreground">PS</span>
                </div>
              </div>
            </div>
            
            {/* Info */}
            <div className="space-y-6">
              {facts.map((fact, index) => (
                <Card 
                  key={index}
                  className={`p-6 transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                    isVisible ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{fact.emoji}</span>
                    <span className="text-lg font-medium">{fact.text}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
