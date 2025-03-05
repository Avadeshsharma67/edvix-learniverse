import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CourseCard from '@/components/CourseCard';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';
import { useEffect, useState, useRef } from 'react';
import { 
  Trophy, 
  Brain, 
  LightbulbIcon, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [isTransformsVisible, setIsTransformsVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const transformsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const observers = [];
    
    const transformsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTransformsVisible(true);
          transformsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStatsVisible(true);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const testimonialsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTestimonialsVisible(true);
          testimonialsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (transformsRef.current) {
      transformsObserver.observe(transformsRef.current);
      observers.push(transformsObserver);
    }
    
    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
      observers.push(statsObserver);
    }
    
    if (testimonialsRef.current) {
      testimonialsObserver.observe(testimonialsRef.current);
      observers.push(testimonialsObserver);
    }
    
    return () => observers.forEach(observer => observer.disconnect());
  }, []);
  
  // Featured courses data (mock)
  const featuredCourses = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      description: 'Learn the core concepts of machine learning, from algorithms to implementation.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
      category: 'AI & ML',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      studentsCount: 1245,
      isRevamped: false,
    },
    {
      id: '2',
      title: 'Full-Stack Web Development Bootcamp',
      instructor: 'Michael Thompson',
      description: 'Comprehensive guide to modern web development, from frontend to backend.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
      category: 'Web Dev',
      price: 94.99,
      originalPrice: 149.99,
      rating: 4.9,
      studentsCount: 3578,
      isRevamped: false,
    },
    {
      id: '3',
      title: 'UX/UI Design Masterclass',
      instructor: 'Emma Roberts',
      description: 'Master the principles of user experience and interface design with practical projects.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
      category: 'Design',
      price: 65.99,
      originalPrice: 99.99,
      rating: 4.7,
      studentsCount: 2156,
      isRevamped: true,
    },
    {
      id: '4',
      title: 'Data Science with Python',
      instructor: 'Alex Chen',
      description: 'From data analysis to visualization, master Python for data science.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      category: 'Data Science',
      price: 79.99,
      originalPrice: 119.99,
      rating: 4.6,
      studentsCount: 1875,
      isRevamped: false,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Jennifer M.",
      role: "Computer Science Student",
      text: "The personalized learning approach helped me grasp complex programming concepts I had been struggling with for months. The tutors are extremely knowledgeable and patient.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      rating: 5
    },
    {
      name: "Mark T.",
      role: "Physics Tutor",
      text: "As a tutor on EdVix, I've found the platform incredibly intuitive. The scheduling system and interactive whiteboard make remote tutoring just as effective as in-person sessions.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
      rating: 5
    },
    {
      name: "Sophia L.",
      role: "High School Student",
      text: "I improved my calculus grade from a C to an A- in just two months of using EdVix. The ability to message my tutor whenever I got stuck on homework was a game-changer.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
      rating: 4
    },
  ];

  // Learning stats data
  const learningStats = [
    { 
      label: "Average Grade Improvement", 
      value: "+27%", 
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      description: "Average improvement after 3 months"
    },
    { 
      label: "Knowledge Retention", 
      value: "94%", 
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      description: "Compared to traditional methods"
    },
    { 
      label: "Completion Rate", 
      value: "89%", 
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      description: "Students who finish their courses"
    },
    { 
      label: "Learning Efficiency", 
      value: "2.3x", 
      icon: <LightbulbIcon className="h-6 w-6 text-amber-500" />,
      description: "Faster than conventional learning"
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Stats Section - New! */}
      <section 
        ref={statsRef}
        className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">Learning Impact</span>
            </div>
            
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Results That Speak <span className="text-gradient">Volumes</span>
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Our personalized approach to education delivers measurable outcomes for students across all subjects and skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-elevation hover:shadow-elevation-hover transition-shadow overflow-hidden bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-primary/5 rounded-full">
                        {stat.icon}
                      </div>
                      <h3 className="text-4xl font-display font-bold mb-2 text-secondary">
                        {stat.value}
                      </h3>
                      <p className="font-medium text-sm mb-1">{stat.label}</p>
                      <p className="text-xs text-secondary/60">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </section>
      
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
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="hover-scale"
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-14 text-center">
            <AnimatedButton size="lg" onClick={() => navigate("/marketplace")}>
              Explore All Courses
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New! */}
      <section 
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80 flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                Student Success Stories
              </span>
            </div>
            
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Hear From Our Community
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Real stories from students and tutors who've transformed their educational experience with EdVix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isTestimonialsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full bg-white border-none shadow-elevation hover:shadow-elevation-hover transition-all">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      
                      <p className="italic text-secondary/80 mb-6">"{testimonial.text}"</p>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary">{testimonial.name}</h4>
                        <p className="text-sm text-secondary/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
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
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
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
              </motion.div>
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
                  <motion.div 
                    key={index} 
                    className="flex"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isTransformsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  >
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
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <AnimatedButton size="lg" onClick={() => navigate(currentUser ? (currentUser.role === 'tutor' ? '/tutors' : '/students') : '/register')}>
                  Get Started Today <ChevronRight className="h-4 w-4 ml-1" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
                Join thousands of students who are already experiencing
                the future of education with EdVix.
              </p>
              <AnimatedButton 
                className="bg-white text-blue-600 hover:bg-white/90"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Start Your Journey
              </AnimatedButton>
            </motion.div>

            {/* Floating animation elements */}
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { icon: <Calendar className="h-6 w-6" />, label: "Flexible Schedule" },
                { icon: <Clock className="h-6 w-6" />, label: "Learn at Your Pace" },
                { icon: <CheckCircle className="h-6 w-6" />, label: "Guaranteed Results" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-full bg-white/10 p-3 mb-2">
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
