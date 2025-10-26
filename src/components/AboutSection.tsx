
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const facts = [
    { emoji: '🎓', text: 'M.Tech. @ IIT Tirupati (CGPA: 6.55)' },
    { emoji: '🛠️', text: 'B.Tech. Mech @ JNTUH Sultanpur (CGPA: 6.60)' },
    { emoji: '🗣️', text: 'Languages: Telugu, Hindi, English' },
    { emoji: '📍', text: 'Nirmal, Telangana' },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-accent/5">
      <div className="container mx-auto max-w-7xl">
        <div 
          ref={ref}
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Decorative Element */}
            <div className="relative h-[400px] lg:h-[500px] order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent rounded-lg shadow-[var(--glow-primary)]">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shimmer">
                    <div className="w-40 h-40 lg:w-56 lg:h-56 bg-background rounded-full flex items-center justify-center border border-primary/20">
                      <span className="text-5xl lg:text-7xl font-light bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">PS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <p className="text-sm md:text-base text-primary uppercase tracking-wider font-medium mb-2">
                  MY INTRO
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  About Me
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  A mechanical engineer turned computer scientist, bridging disciplines through innovative solutions and passionate about system design, AI/ML, and building scalable applications.
                </p>
              </div>
              
              <div className="space-y-4">
                {facts.map((fact, index) => (
                  <div
                    key={index}
                    className={`glass-card p-5 rounded-lg hover-lift ${
                      isVisible ? 'animate-fade-in-up' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
                      <div className="flex-1">
                        <p className="text-base font-medium">{fact.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
