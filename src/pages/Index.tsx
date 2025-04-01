
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CourseCard from '@/components/CourseCard';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';
import { useEffect, useState, useRef } from 'react';

const Index = () => {
  const [isTransformsVisible, setIsTransformsVisible] = useState(false);
  const transformsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTransformsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (transformsRef.current) {
      observer.observe(transformsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Featured courses data (mock)
  const featuredCourses = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Priya Sharma',
      description: 'Learn the core concepts of machine learning, from algorithms to implementation.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
      category: 'AI & ML',
      price: 6999,
      originalPrice: 9999,
      rating: 4.8,
      studentsCount: 1245,
      isRevamped: false,
    },
    {
      id: '2',
      title: 'Full-Stack Web Development Bootcamp',
      instructor: 'Vikram Mehta',
      description: 'Comprehensive guide to modern web development, from frontend to backend.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
      category: 'Web Dev',
      price: 7499,
      originalPrice: 11999,
      rating: 4.9,
      studentsCount: 3578,
      isRevamped: false,
    },
    {
      id: '3',
      title: 'UX/UI Design Masterclass',
      instructor: 'Anjali Desai',
      description: 'Master the principles of user experience and interface design with practical projects.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
      category: 'Design',
      price: 5499,
      originalPrice: 8999,
      rating: 4.7,
      studentsCount: 2156,
      isRevamped: true,
    },
    {
      id: '4',
      title: 'Data Science with Python',
      instructor: 'Arjun Patel',
      description: 'From data analysis to visualization, master Python for data science.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      category: 'Data Science',
      price: 6499,
      originalPrice: 9999,
      rating: 4.6,
      studentsCount: 1875,
      isRevamped: false,
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">Featured Courses</span>
            </div>
            
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Expand Your Knowledge
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Discover our most popular courses and start your learning journey today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          <div className="mt-14 text-center">
            <AnimatedButton 
              size="lg"
              to="/marketplace"
              asLink
            >
              Explore All Courses
            </AnimatedButton>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">How It Works</span>
            </div>
            
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Your Learning Journey
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              We've designed a simple process to help you get started on your educational path.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
                title: 'Create Your Profile',
                description: 'Sign up and tell us about your interests, goals, and learning style preferences.',
              },
              {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>',
                title: 'Discover Content',
                description: 'Browse our marketplace for courses or find tutors that match your learning needs.',
              },
              {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>',
                title: 'Start Learning',
                description: 'Engage with interactive content, join live sessions, and track your progress as you learn.',
              },
            ].map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-subtle border border-gray-100 text-secondary">
                    <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: step.icon }}></div>
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-secondary">{step.title}</h3>
                <p className="text-secondary/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Transforms Section */}
      <section 
        ref={transformsRef}
        className="py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">Transform Your Learning</span>
            </div>
            
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              A New Era of Education
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              EdVix is revolutionizing how we learn with AI-powered personalization
              and a vibrant community of students and tutors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              className={`relative transition-all duration-1000 transform ${
                isTransformsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-elevation">
                <img 
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1170&auto=format&fit=crop" 
                  alt="Students learning" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating card 1 */}
              <div 
                className={`absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-elevation max-w-[200px] transition-all duration-1000 delay-300 transform ${
                  isTransformsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <h4 className="font-medium text-sm">AI-Powered Learning</h4>
                </div>
                <p className="text-xs text-secondary/70">
                  Personalized content recommendations based on your learning style.
                </p>
              </div>
              
              {/* Floating card 2 */}
              <div 
                className={`absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-elevation max-w-[200px] transition-all duration-1000 delay-500 transform ${
                  isTransformsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h4 className="font-medium text-sm">Real-Time Collaboration</h4>
                </div>
                <p className="text-xs text-secondary/70">
                  Connect with peers and tutors for interactive learning sessions.
                </p>
              </div>
            </div>
            
            <div 
              className={`transition-all duration-1000 delay-200 transform ${
                isTransformsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-6 text-secondary">
                Education for the Future
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Personalized Learning Paths',
                    description: 'Our AI analyzes your learning patterns and adapts content to match your pace and preferences, ensuring you get exactly what you need.',
                  },
                  {
                    title: 'Expert Tutors On-Demand',
                    description: 'Get personalized support from our network of verified tutors, available for 1:1 sessions whenever you need guidance.',
                  },
                  {
                    title: 'Revamped Course Marketplace',
                    description: 'Access quality-verified courses at discounted prices, or resell your completed courses to other learners.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-secondary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2 text-secondary">{item.title}</h4>
                      <p className="text-secondary/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <AnimatedButton 
                  size="lg"
                  to="/signup"
                  asLink
                >
                  Get Started Today
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
              Join thousands of students who are already experiencing
              the future of education with EdVix.
            </p>
            <AnimatedButton 
              className="bg-white text-secondary hover:bg-white/90"
              size="lg"
              to="/signup"
              asLink
            >
              Start Your Journey
            </AnimatedButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
