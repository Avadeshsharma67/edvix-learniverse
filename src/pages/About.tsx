
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.015] -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
              <span className="text-sm font-medium text-secondary/80">About EdVix</span>
            </div>
            
            <AnimatedTitle 
              element="h1" 
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-secondary"
            >
              Reimagining Education for the <span className="text-gradient">Digital Age</span>
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              EdVix is on a mission to transform learning with AI-powered personalization, connecting students with tutors and creating interactive educational experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedTitle 
                element="h2" 
                className="text-3xl sm:text-4xl font-display font-bold mb-6 text-secondary"
              >
                Our Story
              </AnimatedTitle>
              
              <div className="space-y-6 text-secondary/70">
                <p>
                  Founded in 2023, EdVix was born from a simple observation: traditional education often fails to meet the unique needs of individual learners. Our founders, a team of educators and technologists, believed that by combining cutting-edge AI with human expertise, we could create a learning experience that adapts to each student's unique journey.
                </p>
                
                <p>
                  What began as a small pilot project with just 50 students has grown into a global platform serving learners in over 120 countries. Today, EdVix stands at the forefront of the educational technology revolution, continuously innovating to make quality education more accessible, personalized, and effective for everyone.
                </p>
                
                <p>
                  Our unique approach to course reselling—what we call "Revamped Courses"—was inspired by the sustainable technology movement. By allowing students to resell courses they've completed, we've built a more affordable and sustainable educational ecosystem that benefits everyone.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-video bg-white rounded-xl overflow-hidden shadow-elevation">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop" 
                  alt="EdVix team" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-elevation max-w-[180px]">
                <p className="text-xl font-bold text-secondary mb-1">2M+</p>
                <p className="text-sm text-secondary/70">Students worldwide</p>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-elevation max-w-[180px]">
                <p className="text-xl font-bold text-secondary mb-1">98%</p>
                <p className="text-sm text-secondary/70">Satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl font-display font-bold mb-6 text-secondary"
            >
              Our Mission & Vision
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70">
              We're driven by a clear purpose to transform how the world learns and grows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-subtle border border-gray-100">
              <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-secondary">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-4 text-secondary">Our Mission</h3>
              
              <p className="text-secondary/70 mb-6">
                To democratize education by creating a platform that adapts to individual learning styles, connects learners with expert tutors, and makes high-quality educational content accessible to everyone, regardless of geographic or economic barriers.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Personalize learning for every student',
                  'Make quality education more affordable',
                  'Connect students with the perfect tutors',
                  'Create interactive, engaging learning experiences',
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <div className="mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-secondary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="text-secondary/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Vision */}
            <div className="bg-white rounded-xl p-8 shadow-subtle border border-gray-100">
              <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-secondary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-4 text-secondary">Our Vision</h3>
              
              <p className="text-secondary/70 mb-6">
                To build a world where education is truly personalized, where every learner can access the right resources at the right time, and where AI and human expertise work seamlessly together to unlock each person's full potential.
              </p>
              
              <ul className="space-y-3">
                {[
                  'AI and humans working together in education',
                  'Learning that adapts to each student's needs',
                  'A sustainable educational ecosystem',
                  'Global access to world-class education',
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <div className="mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-secondary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="text-secondary/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedTitle 
              element="h2" 
              className="text-3xl sm:text-4xl font-display font-bold mb-6 text-secondary"
            >
              Meet Our Team
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70">
              The passionate minds behind EdVix, working to revolutionize education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Sarah Johnson, Ph.D.',
                role: 'Co-Founder & CEO',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
                bio: 'Former Stanford professor with 15+ years in educational technology.',
              },
              {
                name: 'Michael Chen',
                role: 'Co-Founder & CTO',
                image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=500&auto=format&fit=crop',
                bio: 'Ex-Google AI researcher specializing in personalized learning algorithms.',
              },
              {
                name: 'Rachel Torres',
                role: 'Chief Education Officer',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500&auto=format&fit=crop',
                bio: 'Experienced educator with expertise in curriculum development and e-learning.',
              },
              {
                name: 'David Lee',
                role: 'Chief Product Officer',
                image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=500&auto=format&fit=crop',
                bio: 'UX specialist focused on creating engaging, accessible learning experiences.',
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-subtle overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-secondary">{member.name}</h3>
                  <p className="text-secondary/70 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-secondary text-white rounded-xl p-12 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Join the EdVix Journey
              </h2>
              
              <p className="text-white/80 mb-8 text-lg">
                Whether you're a student, tutor, or passionate about education, there's a place for you in our growing community. Join us in reimagining education for the digital age.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <AnimatedButton 
                  className="bg-white text-secondary hover:bg-white/90"
                >
                  Explore Courses
                </AnimatedButton>
                
                <AnimatedButton 
                  className="bg-transparent border border-white text-white hover:bg-white/10"
                >
                  Become a Tutor
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
