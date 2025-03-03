
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import { CalendarIcon, Clock, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Education: AI-Powered Learning in 2025',
    excerpt: 'Explore how artificial intelligence is transforming education and creating personalized learning experiences for students worldwide.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    category: 'Education Trends',
    author: 'Dr. Rajesh Sharma',
    date: 'May 15, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: '10 Essential Skills Every Student Needs in the Digital Age',
    excerpt: 'From digital literacy to critical thinking, discover the key skills students need to thrive in today\'s rapidly evolving technological landscape.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop',
    category: 'Student Success',
    author: 'Priya Patel',
    date: 'May 10, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'How to Create an Effective Study Schedule That Actually Works',
    excerpt: 'Learn proven techniques to organize your study time efficiently and boost your productivity while avoiding burnout.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    category: 'Study Tips',
    author: 'Ananya Desai',
    date: 'May 5, 2025',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'The Rise of Micro-Credentials: Are They Worth Your Time?',
    excerpt: 'Explore the growing trend of micro-credentials and how they fit into the modern education and career advancement landscape.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    category: 'Career Development',
    author: 'Vikram Mehta',
    date: 'April 28, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Parent Guide: Supporting Your Child\'s Online Learning Experience',
    excerpt: 'Practical advice for parents to help their children navigate digital education platforms effectively and safely.',
    image: 'https://images.unsplash.com/photo-1484665754804-74b091911871?q=80&w=800&auto=format&fit=crop',
    category: 'Parenting',
    author: 'Neha Gupta',
    date: 'April 22, 2025',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'The Psychology of Learning: Understanding How We Absorb Information',
    excerpt: 'Dive into the cognitive science behind effective learning strategies and how to apply these insights to your studies.',
    image: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=800&auto=format&fit=crop',
    category: 'Learning Science',
    author: 'Dr. Arjun Kumar',
    date: 'April 15, 2025',
    readTime: '10 min read',
    featured: false,
  },
];

const categories = [
  'All Categories',
  'Education Trends',
  'Student Success',
  'Study Tips',
  'Career Development',
  'Parenting',
  'Learning Science',
  'Technology',
  'Teacher Resources',
];

const Blog = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">EdVix Blog</span>
            </div>
            
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Insights for Your Learning Journey
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Expert advice, tips, and trends to help you succeed in your educational pursuits.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                    index === 0 
                      ? 'bg-secondary text-white' 
                      : 'bg-white text-secondary/70 hover:text-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-xl overflow-hidden shadow-subtle">
                <div className="h-80 bg-gray-200">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="inline-block bg-secondary/5 px-3 py-1 rounded-full mb-4">
                    <span className="text-xs font-medium text-secondary/80">{post.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">{post.title}</h2>
                  <p className="text-secondary/70 mb-6">{post.excerpt}</p>
                  
                  <div className="flex items-center text-secondary/60 text-sm mb-6">
                    <div className="flex items-center mr-4">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center px-5 py-2.5 rounded-md bg-secondary text-white hover:bg-secondary/90 transition-colors"
                  >
                    Read Article
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.filter(post => !post.featured).map(post => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-subtle">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block bg-secondary/5 px-3 py-1 rounded-full mb-4">
                    <span className="text-xs font-medium text-secondary/80">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{post.title}</h3>
                  <p className="text-secondary/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-secondary/60 text-xs">
                      <span className="mr-3">{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <a 
                      href={`/blog/${post.id}`} 
                      className="text-secondary font-medium text-sm hover:underline"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Newsletter Subscription */}
          <div className="bg-secondary text-white rounded-xl p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Get the latest articles, resources, and educational insights delivered directly to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-md text-secondary bg-white focus:outline-none"
                />
                <button className="px-6 py-3 bg-white text-secondary rounded-md hover:bg-gray-100 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/60 mt-3">
                By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
