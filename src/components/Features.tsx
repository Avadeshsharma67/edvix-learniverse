
import AnimatedTitle from './AnimatedTitle';
import { useRef, useEffect, useState } from 'react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  index: number; 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 100 * index);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`relative p-6 bg-white rounded-xl shadow-subtle border border-gray-100 transition-all duration-500 transform 
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-12 h-12 bg-secondary/5 rounded-md flex items-center justify-center mb-4">
        <div className="text-2xl text-secondary" dangerouslySetInnerHTML={{ __html: icon }}></div>
      </div>
      <h3 className="text-lg font-display font-semibold mb-2 text-secondary">{title}</h3>
      <p className="text-secondary/70 text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      title: 'Personalized Learning',
      description: 'AI-powered learning paths tailored to your goals, pace, and preferences.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
      title: 'Expert Tutors',
      description: 'Connect with verified tutors for 1:1 sessions and get personalized guidance.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
      title: 'Real-Time Chat',
      description: 'Instant messaging with tutors and peers for collaboration and support.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
      title: 'Live Sessions',
      description: 'Interactive live classes with real-time feedback and engaging content.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>',
      title: 'Engaging Content',
      description: 'Interactive lessons with quizzes, challenges, and multimedia content.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
      title: 'Gamified Learning',
      description: 'Earn badges, points and track progress while learning with fun challenges.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
            <span className="text-sm font-medium text-secondary/80">Why Choose EdVix</span>
          </div>
          
          <AnimatedTitle 
            element="h2" 
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
          >
            Features that Transform Learning
          </AnimatedTitle>
          
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Our platform combines AI-powered personalization with human expertise to create
            a learning experience that adapts to your unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
