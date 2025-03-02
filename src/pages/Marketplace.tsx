import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CourseCard from '@/components/CourseCard';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';
import { useNavigate } from 'react-router-dom';

type CourseType = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsCount: number;
  isRevamped?: boolean;
};

const allCourses: CourseType[] = [
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
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    instructor: 'Jessica Lee',
    description: 'Build cross-platform mobile apps with React Native and JavaScript.',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop',
    category: 'Mobile Dev',
    price: 84.99,
    originalPrice: 129.99,
    rating: 4.7,
    studentsCount: 1532,
    isRevamped: true,
  },
  {
    id: '6',
    title: 'Advanced JavaScript Programming',
    instructor: 'David Wilson',
    description: 'Master advanced JavaScript concepts, patterns, and best practices.',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop',
    category: 'JavaScript',
    price: 69.99,
    originalPrice: 109.99,
    rating: 4.9,
    studentsCount: 2756,
    isRevamped: false,
  },
  {
    id: '7',
    title: 'Blockchain Development Fundamentals',
    instructor: 'Robert Zhang',
    description: 'Learn the basics of blockchain technology and smart contract development.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop',
    category: 'Blockchain',
    price: 89.99,
    originalPrice: 139.99,
    rating: 4.5,
    studentsCount: 1024,
    isRevamped: true,
  },
  {
    id: '8',
    title: 'Digital Marketing Strategy',
    instructor: 'Olivia Martinez',
    description: 'Develop comprehensive digital marketing strategies for business growth.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01a?q=80&w=800&auto=format&fit=crop',
    category: 'Marketing',
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.8,
    studentsCount: 3142,
    isRevamped: false,
  },
];

const categories = [
  'All Categories',
  'AI & ML',
  'Web Dev',
  'Design',
  'Data Science',
  'Mobile Dev',
  'JavaScript',
  'Blockchain',
  'Marketing',
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(allCourses);
  const [showRevampedOnly, setShowRevampedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    let filtered = [...allCourses];
    
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    if (showRevampedOnly) {
      filtered = filtered.filter(course => course.isRevamped);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query)
      );
    }
    
    setFilteredCourses(filtered);
  }, [selectedCategory, showRevampedOnly, searchQuery]);
  
  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">Browse Courses</span>
            </div>
            
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Discover Your Next Learning Adventure
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Explore our marketplace of courses, including revamped courses available at special prices.
            </p>
          </div>
          
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label htmlFor="search" className="block text-sm font-medium text-secondary/80 mb-2">Search Courses</label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by title, description, or instructor"
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="category" className="block text-sm font-medium text-secondary/80 mb-2">Category</label>
                  <select
                    id="category"
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-1 flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-secondary rounded"
                      checked={showRevampedOnly}
                      onChange={() => setShowRevampedOnly(!showRevampedOnly)}
                    />
                    <span className="text-sm font-medium text-secondary/80">Show Revamped Courses Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-secondary/70">No courses found matching your criteria</p>
                <AnimatedButton 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setShowRevampedOnly(false);
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </AnimatedButton>
              </div>
            ) : (
              <>
                <p className="text-sm text-secondary/60 mb-6">
                  Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                  {selectedCategory !== 'All Categories' ? ` in ${selectedCategory}` : ''}
                  {showRevampedOnly ? ' (Revamped Only)' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-subtle text-center">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-4 text-secondary">
              Ready to Start Learning?
            </h3>
            <p className="text-secondary/70 mb-6 max-w-xl mx-auto">
              Join thousands of students already using EdVix to transform their learning journey and advance their careers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AnimatedButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Browse All Courses
              </AnimatedButton>
              <AnimatedButton variant="outline" onClick={() => navigate('/register')}>
                Become a Tutor
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
