
import AnimatedTitle from './AnimatedTitle';
import { useRef, useEffect, useState } from 'react';
import { 
  Brain, 
  GraduationCap, 
  MessageSquare, 
  Video, 
  BookOpen, 
  Award 
} from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index 
}: { 
  icon: React.ReactNode; 
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
      <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center mb-4 text-accent">
        {icon}
      </div>
      <h3 className="text-lg font-display font-semibold mb-2 text-secondary">{title}</h3>
      <p className="text-secondary/70 text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Personalized Learning',
      description: 'AI-powered learning paths tailored to your goals, pace, and preferences.',
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Expert Tutors',
      description: 'Connect with verified tutors for 1:1 sessions and get personalized guidance.',
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Real-Time Chat',
      description: 'Instant messaging with tutors and peers for collaboration and support.',
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: 'Live Sessions',
      description: 'Interactive live classes with real-time feedback and engaging content.',
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Engaging Content',
      description: 'Interactive lessons with quizzes, challenges, and multimedia content.',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Gamified Learning',
      description: 'Earn badges, points and track progress while learning with fun challenges.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-block bg-accent/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
            <span className="text-sm font-medium text-accent">Why Choose EdVix</span>
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
