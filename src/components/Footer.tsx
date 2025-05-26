
import { Button } from '@/components/ui/button';
import { Github, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:scale-110 transition-transform"
            >
              <a 
                href="https://github.com/shra1-cmd?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </Button>
          </div>
          
          <p className="text-center text-muted-foreground">
            Designed with ✨ by <span className="font-semibold">Parsa Sai Shravan</span>
          </p>
          
          {/* Back to Top FAB */}
          <Button
            onClick={scrollToTop}
            size="sm"
            className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
