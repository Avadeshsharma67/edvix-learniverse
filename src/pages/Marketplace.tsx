
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CourseCard from '@/components/CourseCard';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';

interface Course {
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
  isRevamped: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
}

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [showRevamped, setShowRevamped] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Mock categories
  const categories = [
    'All', 
    'Development', 
    'Business', 
    'Design', 
    'Marketing', 
    'AI & ML', 
    'Data Science', 
    'Language'
  ];
  
  // Mock levels
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  // Mock courses data
  const courses: Course[] = [
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
      level: 'Beginner',
      duration: '10 weeks',
    },
    {
      id: '2',
      title: 'Full-Stack Web Development Bootcamp',
      instructor: 'Vikram Mehta',
      description: 'Comprehensive guide to modern web development, from frontend to backend.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
      category: 'Development',
      price: 7499,
      originalPrice: 11999,
      rating: 4.9,
      studentsCount: 3578,
      isRevamped: false,
      level: 'Intermediate',
      duration: '12 weeks',
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
      level: 'All Levels',
      duration: '8 weeks',
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
      level: 'Intermediate',
      duration: '10 weeks',
    },
    {
      id: '5',
      title: 'Digital Marketing Strategy',
      instructor: 'Neha Verma',
      description: 'Learn to create effective digital marketing campaigns across multiple platforms.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
      category: 'Marketing',
      price: 5999,
      originalPrice: 8999,
      rating: 4.5,
      studentsCount: 2345,
      isRevamped: false,
      level: 'Beginner',
      duration: '6 weeks',
    },
    {
      id: '6',
      title: 'Advanced JavaScript Patterns',
      instructor: 'Raj Malhotra',
      description: 'Deep dive into advanced JavaScript concepts, design patterns, and best practices.',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=800&auto=format&fit=crop',
      category: 'Development',
      price: 6999,
      originalPrice: 9999,
      rating: 4.9,
      studentsCount: 1678,
      isRevamped: true,
      level: 'Advanced',
      duration: '8 weeks',
    },
    {
      id: '7',
      title: 'Business Financial Analysis',
      instructor: 'Rahul Gupta',
      description: 'Learn to analyze financial statements and make data-driven business decisions.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
      category: 'Business',
      price: 6499,
      originalPrice: 9999,
      rating: 4.7,
      studentsCount: 1489,
      isRevamped: false,
      level: 'Intermediate',
      duration: '8 weeks',
    },
    {
      id: '8',
      title: 'Hindi for Beginners',
      instructor: 'Meera Iyer',
      description: 'Learn Hindi from scratch with a focus on conversation and practical usage.',
      image: 'https://images.unsplash.com/photo-1535302717252-32212bad2d78?q=80&w=800&auto=format&fit=crop',
      category: 'Language',
      price: 3999,
      originalPrice: 6999,
      rating: 4.8,
      studentsCount: 3789,
      isRevamped: true,
      level: 'Beginner',
      duration: '12 weeks',
    },
  ];
  
  // Filter and sort courses
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let filtered = [...courses];
      
      // Filter by category
      if (activeCategory !== 'All') {
        filtered = filtered.filter(course => course.category === activeCategory);
      }
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          course => 
            course.title.toLowerCase().includes(term) || 
            course.description.toLowerCase().includes(term) ||
            course.instructor.toLowerCase().includes(term)
        );
      }
      
      // Filter by level
      if (selectedLevel !== 'All') {
        filtered = filtered.filter(course => course.level === selectedLevel);
      }
      
      // Filter by price range
      filtered = filtered.filter(
        course => course.price >= priceRange[0] && course.price <= priceRange[1]
      );
      
      // Filter by revamped
      if (showRevamped) {
        filtered = filtered.filter(course => course.isRevamped);
      }
      
      // Sort
      switch (sortBy) {
        case 'popularity':
          filtered.sort((a, b) => b.studentsCount - a.studentsCount);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      
      setFilteredCourses(filtered);
      setIsLoading(false);
    }, 600);
  }, [activeCategory, searchTerm, selectedLevel, priceRange, showRevamped, sortBy]);
  
  // Handle price range input
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };
  
  return (
    <MainLayout className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="pt-28 pb-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Course Marketplace
            </AnimatedTitle>
            <p className="text-lg text-secondary/70 mb-8 max-w-xl mx-auto">
              Discover thousands of courses from expert tutors around the world,
              including revamped courses at special prices.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for courses, topics, or tutors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <div className="w-full lg:w-64 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category
                          ? 'bg-secondary text-white'
                          : 'text-secondary/70 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedLevel === level
                          ? 'bg-secondary text-white'
                          : 'text-secondary/70 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between">
                    <span className="text-secondary/70">₹0</span>
                    <span className="text-secondary font-medium">₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Revamped Courses</h3>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRevamped}
                      onChange={() => setShowRevamped(!showRevamped)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    <span className="ml-3 text-secondary/70 text-sm">Show only revamped courses</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Courses grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-secondary/70 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary/20"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                      <div className="aspect-video bg-gray-200"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">No courses found</h3>
                  <p className="text-secondary/70 mb-6">
                    Try adjusting your filters or search term to find what you're looking for.
                  </p>
                  <AnimatedButton onClick={() => {
                    setActiveCategory('All');
                    setSearchTerm('');
                    setSelectedLevel('All');
                    setPriceRange([0, 15000]);
                    setShowRevamped(false);
                  }}>
                    Reset Filters
                  </AnimatedButton>
                </div>
              )}
              
              {/* Pagination - simplified version */}
              {filteredCourses.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <div className="flex space-x-1">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-secondary">
                      &laquo;
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg bg-secondary text-white">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-secondary">
                      2
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-secondary">
                      3
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-secondary">
                      &raquo;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-secondary">
              Want to sell your own courses?
            </h2>
            <p className="text-lg text-secondary/70 mb-8">
              Join our tutor community and share your knowledge with students around the world.
            </p>
            <AnimatedButton size="lg">
              Become a Tutor
            </AnimatedButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Marketplace;
