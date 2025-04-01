
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';
import { useNavigate } from 'react-router-dom';

interface Tutor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  image: string;
  availability: string;
  languages: string[];
  description: string;
}

const Tutors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  
  // Mock tutors data
  const tutors: Tutor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: 'Machine Learning',
      experience: 8,
      rating: 4.9,
      reviewsCount: 145,
      hourlyRate: 1500,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      availability: 'Weekdays, Evening',
      languages: ['English', 'Hindi', 'Marathi'],
      description: 'Ph.D. in Computer Science with specialization in AI and Machine Learning. I offer personalized guidance to help students master complex ML concepts and implementations.',
    },
    {
      id: '2',
      name: 'Vikram Mehta',
      specialization: 'Web Development',
      experience: 6,
      rating: 4.8,
      reviewsCount: 124,
      hourlyRate: 1200,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      availability: 'Flexible',
      languages: ['English', 'Hindi', 'Gujarati'],
      description: 'Full-stack developer with expertise in React, Node.js, and modern web technologies. I focus on practical, project-based learning to help students build real-world applications.',
    },
    {
      id: '3',
      name: 'Anjali Desai',
      specialization: 'UI/UX Design',
      experience: 5,
      rating: 4.9,
      reviewsCount: 98,
      hourlyRate: 1400,
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&auto=format&fit=crop',
      availability: 'Weekends, Evenings',
      languages: ['English', 'Hindi', 'Tamil'],
      description: 'Design professional with experience at leading tech companies. I teach practical design skills that help students create intuitive, beautiful, and functional user interfaces.',
    },
    {
      id: '4',
      name: 'Arjun Patel',
      specialization: 'Data Science',
      experience: 7,
      rating: 4.7,
      reviewsCount: 112,
      hourlyRate: 1350,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      availability: 'Weekdays, Morning',
      languages: ['English', 'Hindi', 'Punjabi'],
      description: 'Data scientist with extensive experience in statistical analysis, data visualization, and Python. I help students develop practical data science skills through real-world projects.',
    },
    {
      id: '5',
      name: 'Neha Verma',
      specialization: 'Digital Marketing',
      experience: 6,
      rating: 4.8,
      reviewsCount: 87,
      hourlyRate: 1100,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      availability: 'Flexible',
      languages: ['English', 'Hindi'],
      description: 'Digital marketing specialist with experience across multiple industries. I teach practical strategies that help students build effective online marketing campaigns.',
    },
    {
      id: '6',
      name: 'Raj Malhotra',
      specialization: 'JavaScript',
      experience: 9,
      rating: 4.9,
      reviewsCount: 156,
      hourlyRate: 1300,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      availability: 'Weekends, Afternoons',
      languages: ['English', 'Hindi', 'Bengali'],
      description: 'JavaScript expert with extensive experience in modern frameworks. I focus on teaching advanced concepts and practical implementations for real-world applications.',
    },
    {
      id: '7',
      name: 'Rahul Gupta',
      specialization: 'Finance',
      experience: 12,
      rating: 4.8,
      reviewsCount: 134,
      hourlyRate: 1600,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      availability: 'Weekdays, Evenings',
      languages: ['English', 'Hindi'],
      description: 'Financial expert with MBA and extensive industry experience. I help students understand complex financial concepts and their practical applications in business.',
    },
    {
      id: '8',
      name: 'Meera Iyer',
      specialization: 'Languages',
      experience: 10,
      rating: 4.9,
      reviewsCount: 167,
      hourlyRate: 1000,
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=400&auto=format&fit=crop',
      availability: 'Flexible',
      languages: ['English', 'Hindi', 'Tamil', 'Malayalam'],
      description: 'Language expert with a focus on conversational fluency. I teach Hindi and English with a practical approach that helps students gain confidence quickly.',
    },
  ];
  
  // Specializations extracted from tutors data
  const specializations = ['All', ...Array.from(new Set(tutors.map(tutor => tutor.specialization)))];
  
  // Filter tutors based on search term and selected specialization
  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = 
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tutor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'All' || tutor.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });
  
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
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Find Your Perfect Tutor
            </AnimatedTitle>
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto mb-8">
              Connect with expert tutors from across India who can help you achieve your learning goals through personalized sessions.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search tutors by name, specialty, or keyword..."
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
          
          {/* Specialization filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {specializations.map((specialization) => (
              <button
                key={specialization}
                onClick={() => setSelectedSpecialization(specialization)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialization === specialization
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-secondary/70 hover:bg-gray-200'
                }`}
              >
                {specialization}
              </button>
            ))}
          </div>
          
          {/* Tutors grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredTutors.map((tutor) => (
              <div 
                key={tutor.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
                onClick={() => navigate(`/tutor/${tutor.id}`)}
              >
                <div className="aspect-square">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-1 text-sm font-medium">{tutor.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-secondary/70">{tutor.reviewsCount} reviews</span>
                  </div>
                  
                  {/* Name & Specialization */}
                  <h3 className="text-lg font-semibold mb-1 text-secondary">{tutor.name}</h3>
                  <p className="text-sm text-secondary/70 mb-2">{tutor.specialization}</p>
                  
                  {/* Experience */}
                  <div className="flex items-center mb-3">
                    <span className="text-xs bg-gray-100 text-secondary/80 px-2 py-0.5 rounded">
                      {tutor.experience} years experience
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{formatPrice(tutor.hourlyRate)}<span className="text-sm text-secondary/60">/hour</span></span>
                    <AnimatedButton size="sm" variant="outline">
                      View Profile
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* If no tutors found */}
          {filteredTutors.length === 0 && (
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
              <h3 className="text-xl font-semibold mb-2 text-secondary">No tutors found</h3>
              <p className="text-secondary/70 mb-6">
                Try adjusting your search or filter to find tutors that match your criteria.
              </p>
              <AnimatedButton onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('All');
              }}>
                Reset Filters
              </AnimatedButton>
            </div>
          )}
          
          {/* Call to action */}
          <div className="bg-gray-50 rounded-xl p-8 text-center mt-16">
            <h3 className="text-2xl font-display font-semibold mb-4 text-secondary">
              Are You an Expert?
            </h3>
            <p className="text-secondary/70 mb-6 max-w-lg mx-auto">
              Join our platform as a tutor and share your knowledge with students who are eager to learn from you.
            </p>
            <AnimatedButton>
              Become a Tutor
            </AnimatedButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Tutors;
