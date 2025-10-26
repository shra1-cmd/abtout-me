
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
    <section id="hero" className="min-h-screen flex items-center px-6 lg:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div 
            ref={ref}
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="shimmer rounded-lg p-1">
              <div className="bg-background rounded-lg p-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Parsa Sai Shravan
                </h1>
                
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light mb-4">
                  M.Tech. in Computer Science @ IIT Tirupati
                </p>
                
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 font-serif italic">
                  "Mechanical mind, computing heart – bridging the gap between engineering disciplines through code."
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={downloadResume}
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <Download className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                    View Resume
                    <div className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </Button>
                  
                  <Button 
                    onClick={scrollToContact}
                    variant="outline" 
                    size="lg"
                    className="group"
                  >
                    <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Spline 3D Animation */}
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
            <iframe 
              src="https://my.spline.design/genkubgreetingrobot-yQZcc4shQb2chAgPhFHnKAha/"
              className="absolute inset-0 w-full h-full border-0"
              title="3D Background"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
