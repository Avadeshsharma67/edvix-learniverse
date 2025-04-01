
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsCount: number;
  isRevamped: boolean;
  level: string;
  duration: string;
  language: string;
  lastUpdated: string;
  whatYouWillLearn: string[];
  courseContent: {
    section: string;
    lectures: number;
    duration: string;
  }[];
}

const Course = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock course data - in a real app, this would come from an API
  const courseData: Record<string, CourseData> = {
    '1': {
      id: '1',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Priya Sharma',
      description: 'Learn the core concepts of machine learning, from algorithms to implementation.',
      fullDescription: 'This comprehensive course takes you through the fundamentals of machine learning, starting with basic concepts and progressing to advanced techniques. You\'ll learn about different algorithms, their applications, and how to implement them using Python. By the end of this course, you\'ll have a solid understanding of machine learning principles and be able to build your own models.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
      category: 'AI & ML',
      price: 6999,
      originalPrice: 9999,
      rating: 4.8,
      studentsCount: 1245,
      isRevamped: false,
      level: 'Beginner',
      duration: '10 weeks',
      language: 'English',
      lastUpdated: 'January 2023',
      whatYouWillLearn: [
        'Understand the fundamentals of machine learning algorithms',
        'Implement machine learning models using Python',
        'Process and analyze data for machine learning',
        'Evaluate and improve model performance',
        'Apply machine learning to real-world problems',
      ],
      courseContent: [
        {
          section: 'Introduction to Machine Learning',
          lectures: 5,
          duration: '2 hours',
        },
        {
          section: 'Supervised Learning Algorithms',
          lectures: 8,
          duration: '4.5 hours',
        },
        {
          section: 'Unsupervised Learning Algorithms',
          lectures: 6,
          duration: '3.5 hours',
        },
        {
          section: 'Feature Engineering',
          lectures: 4,
          duration: '2.5 hours',
        },
        {
          section: 'Model Evaluation and Deployment',
          lectures: 7,
          duration: '4 hours',
        },
      ],
    },
    '2': {
      id: '2',
      title: 'Full-Stack Web Development Bootcamp',
      instructor: 'Vikram Mehta',
      description: 'Comprehensive guide to modern web development, from frontend to backend.',
      fullDescription: 'This bootcamp covers everything you need to know to become a full-stack web developer. Starting with HTML, CSS, and JavaScript fundamentals, you\'ll progress to modern frameworks like React for the frontend and Node.js for the backend. You\'ll build multiple real-world projects that you can add to your portfolio, and learn best practices for deployment and optimization.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
      category: 'Web Dev',
      price: 7499,
      originalPrice: 11999,
      rating: 4.9,
      studentsCount: 3578,
      isRevamped: false,
      level: 'Intermediate',
      duration: '12 weeks',
      language: 'English',
      lastUpdated: 'March 2023',
      whatYouWillLearn: [
        'Master HTML5, CSS3, and modern JavaScript',
        'Build responsive websites using React and state-of-the-art frontend tools',
        'Create RESTful APIs with Node.js and Express',
        'Work with databases like MongoDB and MySQL',
        'Deploy applications using cloud services',
      ],
      courseContent: [
        {
          section: 'Web Fundamentals',
          lectures: 10,
          duration: '5 hours',
        },
        {
          section: 'Frontend Development with React',
          lectures: 12,
          duration: '8 hours',
        },
        {
          section: 'Backend Development with Node.js',
          lectures: 9,
          duration: '7 hours',
        },
        {
          section: 'Database Integration',
          lectures: 6,
          duration: '4 hours',
        },
        {
          section: 'Deployment and Best Practices',
          lectures: 5,
          duration: '3 hours',
        },
      ],
    },
    '3': {
      id: '3',
      title: 'UX/UI Design Masterclass',
      instructor: 'Anjali Desai',
      description: 'Master the principles of user experience and interface design with practical projects.',
      fullDescription: 'This masterclass teaches you the fundamentals of UX/UI design through practical, hands-on projects. You\'ll learn design thinking, user research methods, wireframing, prototyping, and how to create beautiful interfaces using industry-standard tools like Figma. By the end of the course, you\'ll have a professional portfolio of projects that showcase your design skills.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
      category: 'Design',
      price: 5499,
      originalPrice: 8999,
      rating: 4.7,
      studentsCount: 2156,
      isRevamped: true,
      level: 'All Levels',
      duration: '8 weeks',
      language: 'English',
      lastUpdated: 'February 2023',
      whatYouWillLearn: [
        'Apply design thinking methodology to solve user problems',
        'Conduct effective user research and usability testing',
        'Create wireframes and interactive prototypes',
        'Design visually appealing and user-friendly interfaces',
        'Build a professional UX/UI design portfolio',
      ],
      courseContent: [
        {
          section: 'Design Thinking Fundamentals',
          lectures: 6,
          duration: '3 hours',
        },
        {
          section: 'User Research Methods',
          lectures: 7,
          duration: '4 hours',
        },
        {
          section: 'Wireframing and Prototyping',
          lectures: 8,
          duration: '5 hours',
        },
        {
          section: 'Interface Design Principles',
          lectures: 10,
          duration: '6 hours',
        },
        {
          section: 'Portfolio Building',
          lectures: 4,
          duration: '2.5 hours',
        },
      ],
    },
  };
  
  const course = courseData[id || '1'];
  
  if (!course) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Course Not Found</h1>
          <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/marketplace">
            <AnimatedButton>
              Back to Marketplace
            </AnimatedButton>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <MainLayout>
      {/* Hero section */}
      <section className="pt-28 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium px-3 py-1 bg-secondary/10 rounded-full text-secondary">
                  {course.category}
                </span>
                {course.isRevamped && (
                  <span className="ml-2 text-sm font-medium px-3 py-1 bg-secondary text-white rounded-full">
                    Revamped
                  </span>
                )}
              </div>
              
              <AnimatedTitle 
                element="h1" 
                className="text-3xl sm:text-4xl font-display font-bold mb-4 text-secondary"
              >
                {course.title}
              </AnimatedTitle>
              
              <p className="text-lg text-secondary/80 mb-5">
                {course.fullDescription}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-yellow-500 mr-1"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-secondary/60 ml-1">({course.studentsCount.toLocaleString()} students)</span>
                </div>
                
                <span className="mx-2 text-gray-300">|</span>
                
                <span className="text-secondary/80">Created by <span className="text-secondary font-medium">{course.instructor}</span></span>
              </div>
              
              <div className="flex flex-wrap items-center text-sm text-secondary/70 gap-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Last updated {course.lastUpdated}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{course.level}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{course.language}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-secondary">{formatPrice(course.price)}</h3>
                {course.originalPrice && (
                  <div className="flex items-center">
                    <span className="text-lg text-secondary/60 line-through mr-2">
                      {formatPrice(course.originalPrice)}
                    </span>
                    <span className="bg-green-50 text-green-600 text-xs font-medium px-2 py-0.5 rounded">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <AnimatedButton size="lg">
                  Enroll Now
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  Add to Wishlist
                </AnimatedButton>
              </div>
            </div>
            
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-elevation">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors">
                    <svg className="w-6 h-6 text-secondary ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {/* What you'll learn */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-secondary">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex">
                      <svg 
                        className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M5 13L9 17L19 7" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-secondary/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Course content */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-secondary">Course Content</h2>
                <div className="text-sm text-secondary/70 mb-4">
                  <span>{course.courseContent.reduce((acc, section) => acc + section.lectures, 0)} lectures</span>
                  <span className="mx-2">•</span>
                  <span>{course.duration} total length</span>
                </div>
                
                <div className="space-y-3">
                  {course.courseContent.map((section, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-medium text-secondary">{section.section}</h3>
                        <div className="text-sm text-secondary/70">
                          <span>{section.lectures} lectures</span>
                          <span className="mx-2">•</span>
                          <span>{section.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Instructor */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-secondary">Your Instructor</h2>
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`} 
                      alt={course.instructor} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary mb-1">{course.instructor}</h3>
                    <p className="text-secondary/70 text-sm mb-2">Expert in {course.category}</p>
                    <p className="text-secondary/80">
                      An experienced educator with a passion for teaching. Specialized in making complex concepts 
                      accessible and engaging for students of all levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="sticky top-24">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-semibold mb-4 text-secondary">This course includes:</h3>
                  <ul className="space-y-3">
                    {[
                      { icon: "📹", text: `${course.courseContent.reduce((acc, section) => acc + section.lectures, 0)} on-demand videos` },
                      { icon: "📝", text: "Downloadable resources" },
                      { icon: "🏆", text: "Certificate of completion" },
                      { icon: "📱", text: "Access on mobile and desktop" },
                      { icon: "⏱️", text: "Lifetime access" },
                    ].map((item, index) => (
                      <li key={index} className="flex">
                        <span className="mr-2">{item.icon}</span>
                        <span className="text-secondary/80">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold mb-4 text-secondary">Share this course</h3>
                  <div className="flex space-x-3">
                    {["facebook", "twitter", "linkedin", "whatsapp"].map((social) => (
                      <a 
                        key={social}
                        href="#" 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-secondary/70 hover:bg-secondary hover:text-white transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related courses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-display font-semibold mb-8 text-secondary">Related Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(courseData)
              .filter(c => c.id !== course.id && c.category === course.category)
              .slice(0, 3)
              .map(relatedCourse => (
                <div 
                  key={relatedCourse.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
                >
                  <Link to={`/course/${relatedCourse.id}`} className="block">
                    <div className="aspect-video">
                      <img 
                        src={relatedCourse.image} 
                        alt={relatedCourse.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold mb-1 text-secondary">{relatedCourse.title}</h3>
                      <p className="text-sm text-secondary/70 mb-2">{relatedCourse.instructor}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1 text-sm font-medium">{relatedCourse.rating}</span>
                        </div>
                      </div>
                      <div className="font-medium">{formatPrice(relatedCourse.price)}</div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Course;
