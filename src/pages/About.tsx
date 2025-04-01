
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';

const About = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              About EdVix
            </AnimatedTitle>
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Transforming education through AI-powered personalized learning experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-secondary">Our Mission</h2>
              <p className="text-secondary/80 mb-6">
                At EdVix, we believe in the transformative power of education. Our mission is to democratize access to quality education by connecting students with expert tutors from across India through our innovative platform.
              </p>
              <p className="text-secondary/80">
                We're leveraging AI technology to create personalized learning experiences that cater to individual learning styles, preferences, and goals. By bridging the gap between students and tutors, we're building a community where knowledge flows freely and education becomes a collaborative journey.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-elevation">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1170&auto=format&fit=crop" 
                  alt="Indian students learning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-5 shadow-elevation max-w-[250px]">
                <p className="font-medium text-secondary mb-1">Founded in 2023</p>
                <p className="text-sm text-secondary/70">
                  Starting from a small team in Bangalore, we've grown into a nationwide platform for education
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center text-secondary">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Accessibility",
                  description: "Making quality education accessible to everyone, regardless of location or background."
                },
                {
                  title: "Innovation",
                  description: "Constantly improving our platform with cutting-edge technology to enhance the learning experience."
                },
                {
                  title: "Community",
                  description: "Building a supportive community where students and tutors can connect, collaborate, and grow together."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                    <span className="text-xl font-semibold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-secondary">{value.title}</h3>
                  <p className="text-secondary/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center text-secondary">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Avadesh Sharma",
                  role: "Founder & CEO",
                  caption: "Tutor and Tech Enthusiast",
                  image: "https://avadesh.vercel.app/avatar.jpg",
                  links: {
                    linkedin: "https://www.linkedin.com/in/avadeshseo/",
                    github: "https://github.com/avadesh02",
                    email: "mailto:avadeshpersonal02@gmail.com"
                  }
                },
                {
                  name: "Priya Sharma",
                  role: "Chief Learning Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                },
                {
                  name: "Vikram Mehta",
                  role: "CTO",
                  image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=400&auto=format&fit=crop"
                },
                {
                  name: "Anjali Desai",
                  role: "Head of Tutor Success",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="aspect-square">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-secondary">{member.name}</h3>
                    <p className="text-sm text-secondary/70">{member.role}</p>
                    {member.caption && (
                      <p className="text-xs text-secondary/60 mt-1">{member.caption}</p>
                    )}
                    
                    {member.links && (
                      <div className="flex justify-center space-x-3 mt-3">
                        {member.links.linkedin && (
                          <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary/70 hover:text-primary transition-colors">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.links.github && (
                          <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-secondary/70 hover:text-primary transition-colors">
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {member.links.email && (
                          <a href={member.links.email} className="text-secondary/70 hover:text-primary transition-colors">
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
