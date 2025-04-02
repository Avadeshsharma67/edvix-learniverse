
import { useRef, useEffect, useState } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { Lightbulb, Users, MessageSquare, MonitorPlay, BookOpen, Trophy } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index,
  color
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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
      className={`relative p-6 rounded-xl transition-all duration-700 transform glass-card
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                 ${isHovered ? 'shadow-elevation scale-[1.03]' : 'shadow-subtle'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${isHovered ? 'scale-110' : ''} transition-all duration-300`} style={{ backgroundColor: `${color}20` }}>
        <div className="text-2xl" style={{ color }}>{icon}</div>
      </div>
      <h3 className="text-xl font-display font-semibold mb-3 text-secondary">{title}</h3>
      <p className="text-secondary/70">{description}</p>
      
      {isHovered && (
        <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-gradient-to-br from-transparent to-white/10 rounded-br-xl -z-10 opacity-70"></div>
      )}
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Lightbulb size={28} />,
      title: 'Personalized Learning',
      description: 'AI-powered learning paths tailored to your goals, pace, and preferences.',
      color: '#FF6D00'
    },
    {
      icon: <Users size={28} />,
      title: 'Expert Tutors',
      description: 'Connect with verified tutors for 1:1 sessions and get personalized guidance.',
      color: '#2196F3'
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Real-Time Chat',
      description: 'Instant messaging with tutors and peers for collaboration and support.',
      color: '#4CAF50'
    },
    {
      icon: <MonitorPlay size={28} />,
      title: 'Live Sessions',
      description: 'Interactive live classes with real-time feedback and engaging content.',
      color: '#9C27B0'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Engaging Content',
      description: 'Interactive lessons with quizzes, challenges, and multimedia content.',
      color: '#F44336'
    },
    {
      icon: <Trophy size={28} />,
      title: 'Gamified Learning',
      description: 'Earn badges, points and track progress while learning with fun challenges.',
      color: '#FFC107'
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute top-20 -left-24 w-48 h-48 rounded-full bg-purple-100/50 blur-3xl"></div>
      <div className="absolute bottom-20 -right-24 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
            <span className="text-sm font-medium text-secondary/80">Why Choose EdVix</span>
          </div>
          
          <AnimatedTitle 
            element="h2" 
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
          >
            Features that <span className="text-gradient">Transform Learning</span>
          </AnimatedTitle>
          
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto mb-8">
            Our platform combines AI-powered personalization with human expertise to create
            a learning experience that adapts to your unique needs.
          </p>
          
          <Link to="/marketplace">
            <AnimatedButton variant="accent" withArrow={true}>
              Explore Courses
            </AnimatedButton>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
