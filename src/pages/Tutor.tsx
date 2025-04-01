
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';

interface TutorData {
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
  fullBio: string;
  education: { degree: string; institution: string; year: string }[];
  expertise: string[];
  reviews: { name: string; rating: number; comment: string; date: string }[];
}

const Tutor = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock tutor data - in a real app, this would come from an API
  const tutorData: Record<string, TutorData> = {
    '1': {
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
      fullBio: 'With over 8 years of experience in both academia and industry, I specialize in making complex machine learning concepts accessible to students of all levels. I completed my Ph.D. from IIT Bombay with a focus on neural networks and deep learning applications. I've worked as a research scientist at major tech companies and have published several papers in top AI conferences. My teaching philosophy emphasizes practical implementation alongside theoretical understanding, ensuring students can apply what they learn to real-world problems.',
      education: [
        { degree: 'Ph.D. in Computer Science', institution: 'IIT Bombay', year: '2015' },
        { degree: 'M.Tech in Computer Science', institution: 'IIT Delhi', year: '2012' },
        { degree: 'B.Tech in Computer Science', institution: 'NIT Trichy', year: '2010' }
      ],
      expertise: [
        'Machine Learning Algorithms',
        'Neural Networks',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing',
        'Python Programming',
        'TensorFlow & PyTorch'
      ],
      reviews: [
        {
          name: 'Amit Kumar',
          rating: 5,
          comment: 'Dr. Priya is an exceptional teacher who breaks down complex ML concepts into understandable pieces. Her practical approach helped me implement my own models with confidence.',
          date: '15 May 2023'
        },
        {
          name: 'Sneha Reddy',
          rating: 4.8,
          comment: 'I was struggling with deep learning concepts until I started sessions with Dr. Sharma. She provides excellent explanations and practical examples that make learning enjoyable.',
          date: '3 April 2023'
        },
        {
          name: 'Rajesh Verma',
          rating: 4.9,
          comment: 'Dr. Priya helped me prepare for my ML interviews. Her insights and guidance were invaluable. Highly recommend her to anyone serious about machine learning.',
          date: '20 March 2023'
        }
      ]
    },
    '2': {
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
      fullBio: 'I'm a passionate full-stack developer with 6+ years of industry experience working with startups and established tech companies. My expertise spans the entire web development stack with particular focus on React, Node.js, and modern JavaScript frameworks. I believe in learning by doing, and my teaching approach emphasizes building practical projects that solve real problems. I've helped over 100 students transition into web development careers through personalized mentoring and hands-on guidance.',
      education: [
        { degree: 'B.Tech in Information Technology', institution: 'IIIT Allahabad', year: '2017' },
        { degree: 'Full-Stack Development Bootcamp', institution: 'Coding Ninjas', year: '2018' }
      ],
      expertise: [
        'React.js & React Native',
        'Node.js & Express',
        'MongoDB & SQL Databases',
        'JavaScript/TypeScript',
        'RESTful APIs',
        'GraphQL',
        'Web Performance Optimization'
      ],
      reviews: [
        {
          name: 'Preeti Joshi',
          rating: 5,
          comment: 'Vikram's project-based teaching approach is exactly what I needed. Within three months, I built a complete portfolio of web applications that helped me land my first developer job.',
          date: '10 June 2023'
        },
        {
          name: 'Karan Singh',
          rating: 4.7,
          comment: 'Excellent mentor who provides practical insights beyond what you'll find in typical online courses. His feedback on my code greatly improved my development practices.',
          date: '5 May 2023'
        },
        {
          name: 'Ananya Patel',
          rating: 4.8,
          comment: 'I was trying to pivot my career to web development and Vikram's guidance was invaluable. He tailored the sessions to my learning pace and focused on practical skills that employers actually look for.',
          date: '12 April 2023'
        }
      ]
    }
  };
  
  const tutor = tutorData[id || '1'];
  
  if (!tutor) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Tutor Not Found</h1>
          <p className="mb-8">The tutor you're looking for doesn't exist or has been removed.</p>
          <Link to="/tutors">
            <AnimatedButton>
              Back to Tutors
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
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-6">
                  <div className="aspect-square">
                    <img 
                      src={tutor.image} 
                      alt={tutor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-1 font-medium">{tutor.rating}</span>
                      <span className="ml-1 text-sm text-secondary/70">({tutor.reviewsCount} reviews)</span>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg text-secondary mb-1">{formatPrice(tutor.hourlyRate)}<span className="text-sm font-normal text-secondary/60">/hour</span></h3>
                    </div>
                    
                    <div className="space-y-4">
                      <AnimatedButton className="w-full justify-center">
                        Book a Session
                      </AnimatedButton>
                      <AnimatedButton variant="outline" className="w-full justify-center">
                        Message
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="p-5">
                    <h3 className="font-semibold mb-4 text-secondary">Availability</h3>
                    <p className="text-secondary/80 mb-4">{tutor.availability}</p>
                    
                    <h3 className="font-semibold mb-4 text-secondary">Languages</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutor.languages.map((language, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm text-secondary/80">
                          {language}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="font-semibold mb-4 text-secondary">Experience</h3>
                    <p className="text-secondary/80">{tutor.experience} years</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <AnimatedTitle 
                element="h1" 
                className="text-3xl sm:text-4xl font-display font-bold mb-2 text-secondary"
              >
                {tutor.name}
              </AnimatedTitle>
              
              <p className="text-xl text-secondary/70 mb-6">{tutor.specialization} Expert</p>
              
              {/* About */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">About Me</h2>
                <p className="text-secondary/80 mb-6">{tutor.fullBio}</p>
              </div>
              
              {/* Education */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">Education</h2>
                <div className="space-y-4">
                  {tutor.education.map((edu, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary">{edu.degree}</h3>
                        <p className="text-secondary/70">{edu.institution}, {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Expertise */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {tutor.expertise.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-secondary/5 rounded-full text-sm text-secondary/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div className="mb-10">
                <h2 className="text-2xl font-display font-semibold mb-4 text-secondary">Reviews</h2>
                <div className="space-y-6">
                  {tutor.reviews.map((review, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-medium text-secondary">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-secondary">{review.name}</h4>
                          <p className="text-sm text-secondary/60">{review.date}</p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1 font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-secondary/80">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <AnimatedButton variant="outline">
                    See All Reviews
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Tutor;
