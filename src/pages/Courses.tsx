
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import CourseCard from '@/components/CourseCard';
import AnimatedTitle from '@/components/AnimatedTitle';

const featuredCourses = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Rajesh Sharma',
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
    instructor: 'Priya Patel',
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
    instructor: 'Ananya Desai',
    description: 'Master the principles of user experience and interface design with practical projects.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    category: 'Design',
    price: 5499,
    originalPrice: 7999,
    rating: 4.7,
    studentsCount: 2156,
    isRevamped: true,
  },
  {
    id: '4',
    title: 'Data Science with Python',
    instructor: 'Vikram Mehta',
    description: 'From data analysis to visualization, master Python for data science.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    category: 'Data Science',
    price: 6499,
    originalPrice: 9499,
    rating: 4.6,
    studentsCount: 1875,
    isRevamped: false,
  },
];

const popularCategories = [
  { name: 'Programming', count: 156, icon: '💻' },
  { name: 'Business', count: 124, icon: '📊' },
  { name: 'Design', count: 98, icon: '🎨' },
  { name: 'Marketing', count: 87, icon: '📱' },
  { name: 'Data Science', count: 76, icon: '📈' },
  { name: 'Languages', count: 65, icon: '🌎' },
];

const Courses = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">EdVix Courses</span>
            </div>
            
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Expand Your Knowledge and Skills
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Discover our wide range of courses designed to help you advance your career and achieve your learning goals.
            </p>
          </div>
          
          {/* Popular Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-semibold mb-6 text-secondary">Popular Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {popularCategories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-white p-6 rounded-xl shadow-subtle text-center transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-secondary mb-1">{category.name}</h3>
                  <p className="text-sm text-secondary/60">{category.count} courses</p>
                </a>
              ))}
            </div>
          </div>
          
          {/* Featured Courses */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-secondary">Featured Courses</h2>
              <a href="/marketplace" className="text-sm font-medium text-secondary/80 hover:text-secondary">
                View All →
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
          
          {/* Course Bundles */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-secondary">Special Course Bundles</h2>
              <a href="#" className="text-sm font-medium text-secondary/80 hover:text-secondary">
                View All →
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Web Development Master Bundle",
                  description: "Complete path to becoming a full-stack web developer with 5 comprehensive courses.",
                  image: "https://images.unsplash.com/photo-1573164574511-73c773193279?q=80&w=800&auto=format&fit=crop",
                  courses: 5,
                  price: 13999,
                  originalPrice: 21999,
                },
                {
                  title: "Data Science & AI Bundle",
                  description: "From Python basics to advanced AI algorithms - everything you need for a data science career.",
                  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
                  courses: 4,
                  price: 15999,
                  originalPrice: 24999,
                },
              ].map((bundle, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-subtle transition-all hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5">
                      <div className="h-48 md:h-full bg-gray-200">
                        <img
                          src={bundle.image}
                          alt={bundle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-3/5 p-6">
                      <h3 className="font-display font-semibold text-xl mb-2">{bundle.title}</h3>
                      <p className="text-sm text-secondary/70 mb-4">{bundle.description}</p>
                      <div className="flex items-center mb-4">
                        <span className="text-sm bg-secondary/5 px-2 py-1 rounded-full">
                          {bundle.courses} courses
                        </span>
                      </div>
                      <div className="flex items-baseline mb-4">
                        <span className="font-display font-bold text-lg mr-2">
                          ₹{bundle.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-secondary/50 line-through mr-2">
                          ₹{bundle.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                          {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}% off
                        </span>
                      </div>
                      <button className="w-full bg-secondary text-white rounded-md py-2 hover:bg-secondary/90 transition-colors">
                        View Bundle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Become an Instructor */}
          <div className="bg-white rounded-xl p-8 shadow-subtle text-center">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-4 text-secondary">
              Want to Share Your Knowledge?
            </h3>
            <p className="text-secondary/70 mb-6 max-w-xl mx-auto">
              Join our team of instructors and reach thousands of eager students. Create and sell your own courses on EdVix.
            </p>
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-secondary text-white hover:bg-secondary/90 transition-colors"
            >
              Become an Instructor
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
