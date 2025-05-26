
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      year: '2024–2026',
      title: 'M.Tech. in Computer Science',
      institution: 'IIT Tirupati',
      grade: 'CGPA: 6.55'
    },
    {
      year: '2020–2024',
      title: 'B.Tech. in Mechanical Engineering',
      institution: 'JNTUH Sultanpur',
      grade: 'CGPA: 6.60'
    },
    {
      year: '2020',
      title: 'Intermediate',
      institution: 'Sri Chaitanya',
      grade: '97.10%'
    },
    {
      year: '2018',
      title: '10th Grade',
      institution: 'Vasavi High School',
      grade: 'CGPA: 9.80'
    }
  ];

  return (
    <section id="education" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div 
          ref={ref}
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            Education Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
            
            <div className="space-y-12">
              {education.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-start space-x-8 transition-all duration-700 ${
                    isVisible ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <span className="text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-1">{item.institution}</p>
                    <p className="text-sm font-medium text-primary">{item.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
