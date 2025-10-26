
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Placeholder for resume download
    console.log('Resume download triggered');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center relative">
          {/* Left side - Text content */}
          <div 
            ref={ref}
            className={`relative z-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="space-y-8 py-12">
              <div className="space-y-2">
                <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-light">
                  WE DESIGN & BUILD BRANDS
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  Hi, I am <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Parsa</span> This is my favorite work.
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                M.Tech. in Computer Science @ IIT Tirupati
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={downloadResume}
                  size="lg"
                  className="group hover-lift"
                >
                  <Download className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  View Resume
                </Button>
                
                <Button 
                  onClick={scrollToContact}
                  variant="outline" 
                  size="lg"
                  className="group hover-lift"
                >
                  <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  Contact Me
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Spline 3D Animation with diagonal split */}
          <div className="relative h-[500px] lg:h-[700px]">
            {/* Diagonal overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-lg overflow-hidden shadow-[var(--glow-primary)]">
              <iframe 
                src="https://my.spline.design/genkubgreetingrobot-yQZcc4shQb2chAgPhFHnKAha/"
                className="absolute inset-0 w-full h-full border-0"
                title="3D Animation"
              />
            </div>
            {/* Diagonal accent line */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 -left-12 w-24 h-full bg-gradient-to-r from-background via-background/50 to-transparent transform -skew-x-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
