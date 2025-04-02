
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Avadesh Sharma',
      role: 'Founder & CEO',
      image: 'https://avadesh.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.e3a5a895.png&w=384&q=75',
      caption: 'Tutor and Tech Enthusiast',
      bio: 'A passionate educator and technology innovator with a vision to transform the education landscape through cutting-edge AI solutions.',
      links: {
        twitter: 'https://twitter.com/avadesh',
        linkedin: 'https://www.linkedin.com/in/avadesharma/',
        github: 'https://github.com/avadesh-sharma'
      }
    },
    {
      name: 'Priya Agarwal',
      role: 'Chief Learning Officer',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      caption: 'Education Innovator',
      bio: 'Former principal with 15+ years experience in educational leadership, focused on curriculum development and personalized learning methodologies.',
      links: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Rahul Mehta',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      caption: 'AI Expert & Engineer',
      bio: 'Machine learning specialist with experience at leading tech companies, bringing cutting-edge AI capabilities to our educational platform.',
      links: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Aisha Patel',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
      caption: 'Relationship Builder',
      bio: 'Strategic partnership expert connecting EdVix with leading educational institutions and content creators across India.',
      links: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    }
  ];

  const values = [
    {
      title: 'Accessibility',
      description: 'Making quality education accessible to everyone, regardless of location or background.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-accent">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'Continuously pushing boundaries with AI and technology to enhance learning experiences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-accent">
          <path d="M12 2v4"></path>
          <path d="M18.2 5.8 15.8 8.2"></path>
          <path d="M22 12h-4"></path>
          <path d="M18.2 18.2 15.8 15.8"></path>
          <path d="M12 22v-4"></path>
          <path d="M5.8 18.2 8.2 15.8"></path>
          <path d="M2 12h4"></path>
          <path d="M5.8 5.8 8.2 8.2"></path>
        </svg>
      )
    },
    {
      title: 'Personalization',
      description: 'Tailoring educational experiences to individual needs, learning styles, and goals.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-accent">
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      )
    },
    {
      title: 'Community',
      description: 'Building connections between learners and educators to foster a supportive learning environment.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-accent">
          <path d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 2.3 1.3 4.3 3.2 5.3.8.4 1.3 1.2 1.3 2.1v1.1c0 .3.1.5.4.7.2.1.5.1.8 0l2.8-1.2c.3-.1.5-.4.5-.7v-.1c0-.8.5-1.6 1.3-2C17 12.2 18 10.2 18 8z"></path>
          <path d="M18 8c0 2.2-1.8 4-4 4s-4-1.8-4-4"></path>
          <path d="M5 8h1"></path>
          <path d="M18 8h1"></path>
          <path d="M10 2v1"></path>
          <path d="M14 2v1"></path>
        </svg>
      )
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <AnimatedTitle 
            element="h1" 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-secondary"
          >
            Reimagining Education for a <span className="text-gradient">Digital Future</span>
          </AnimatedTitle>
          
          <p className="text-lg md:text-xl text-secondary/70 max-w-3xl mx-auto mb-12">
            EdVix is on a mission to democratize quality education through technology, making personalized learning accessible to everyone in India and beyond.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to="/marketplace" className="bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition">
              Explore Our Courses
            </Link>
            <Link to="/tutors" className="bg-white text-secondary px-8 py-3 rounded-lg font-medium border border-secondary/20 hover:bg-secondary/5 transition">
              Meet Our Tutors
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedTitle 
              element="h2" 
              className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-secondary"
            >
              Our Story
            </AnimatedTitle>
            
            <div className="space-y-6 text-lg text-secondary/80">
              <p>
                EdVix was born out of a simple yet profound observation: despite India's rich educational heritage and growing technological capabilities, there remained a significant gap in how education was delivered and consumed across the country. 
              </p>
              
              <p>
                Founded in 2021 by Avadesh Sharma, a passionate educator and technology enthusiast, EdVix began with a mission to bridge this gap by leveraging artificial intelligence to create truly personalized learning experiences.
              </p>
              
              <p>
                What started as a small tutoring platform quickly evolved into a comprehensive educational ecosystem that connects students with qualified tutors, offers AI-powered learning paths, and provides access to a vast library of courses tailored to diverse learning needs.
              </p>
              
              <p>
                Today, EdVix is transforming how thousands of students across India learn, making quality education accessible regardless of geographical barriers. Our growing community of educators and learners continues to drive our innovation and expansion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedTitle 
            element="h2" 
            className="text-3xl md:text-4xl font-display font-bold mb-16 text-center text-secondary"
          >
            Our Core Values
          </AnimatedTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-secondary">{value.title}</h3>
                <p className="text-secondary/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedTitle 
            element="h2" 
            className="text-3xl md:text-4xl font-display font-bold mb-4 text-center text-secondary"
          >
            Meet Our Team
          </AnimatedTitle>
          
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto mb-16 text-center">
            The passionate minds behind EdVix, dedicated to transforming educational experiences through innovation and technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all group-hover:shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-1 text-secondary">{member.name}</h3>
                    <p className="text-accent font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-secondary/60 italic mb-4">"{member.caption}"</p>
                    <p className="text-sm text-secondary/70 mb-4">{member.bio}</p>
                    
                    <div className="flex gap-3">
                      {member.links.twitter && (
                        <a 
                          href={member.links.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-secondary/60 hover:bg-accent hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                          </svg>
                        </a>
                      )}
                      
                      {member.links.linkedin && (
                        <a 
                          href={member.links.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-secondary/60 hover:bg-accent hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                      )}
                      
                      {member.links.github && (
                        <a 
                          href={member.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-secondary/60 hover:bg-accent hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <AnimatedTitle 
            element="h2" 
            className="text-3xl md:text-4xl font-display font-bold mb-6 text-white"
          >
            Join the EdVix Community
          </AnimatedTitle>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Become part of our growing network of learners and educators. Start your learning journey today!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/signup" className="bg-white text-accent px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition">
              Sign Up Now
            </Link>
            <Link to="/marketplace" className="bg-transparent text-white px-8 py-3 rounded-lg font-medium border border-white hover:bg-white/10 transition">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
