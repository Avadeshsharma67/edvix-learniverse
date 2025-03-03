
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import AnimatedTitle from '@/components/AnimatedTitle';
import { Search, Book, HelpCircle, MessageSquare, FileText, Users } from 'lucide-react';

const helpCategories = [
  {
    icon: <Book className="h-5 w-5" />,
    title: 'Getting Started',
    description: 'New to EdVix? Learn how to set up your profile and start learning.',
    articles: 12
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Courses & Content',
    description: 'Information about accessing courses, certificates, and materials.',
    articles: 18
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'Account & Billing',
    description: 'Manage your account, subscriptions, and payment information.',
    articles: 15
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Tutoring',
    description: 'How to find tutors, schedule sessions, and get the most from tutoring.',
    articles: 10
  },
  {
    icon: <HelpCircle className="h-5 w-5" />,
    title: 'Technical Support',
    description: 'Troubleshooting common issues and platform accessibility.',
    articles: 14
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Policies',
    description: 'Our terms of service, privacy, and refund policies.',
    articles: 8
  },
];

const popularArticles = [
  'How to reset your password',
  'Downloading course materials for offline use',
  'Requesting a refund for a course',
  'Setting up notifications preferences',
  'Connecting with tutors on the platform',
  'How to get a certificate of completion',
  'Tracking your learning progress',
  'Technical requirements for video conferences'
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">Help Center</span>
            </div>
            
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              How Can We Help You?
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto mb-8">
              Find answers to frequently asked questions and learn how to get the most out of EdVix.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary/40" />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all shadow-subtle"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {helpCategories.map((category, index) => (
              <a 
                key={index}
                href="#"
                className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                    {category.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg">{category.title}</h3>
                </div>
                <p className="text-secondary/70 text-sm mb-4">{category.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary/60">{category.articles} articles</span>
                  <span className="text-secondary font-medium">Browse →</span>
                </div>
              </a>
            ))}
          </div>
          
          {/* Popular Articles */}
          <div className="bg-white rounded-xl p-8 shadow-subtle mb-16">
            <h2 className="text-xl font-display font-semibold mb-6">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {popularArticles.map((article, index) => (
                <a 
                  key={index}
                  href="#"
                  className="flex items-center text-secondary/70 hover:text-secondary transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2 text-secondary/40" />
                  <span>{article}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-subtle text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Chat Support</h3>
              <p className="text-secondary/70 text-sm mb-4">Chat with our support team in real-time.</p>
              <button className="w-full py-2 px-4 rounded bg-secondary text-white hover:bg-secondary/90 transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-secondary/70 text-sm mb-4">Send us an email and we'll get back to you.</p>
              <button className="w-full py-2 px-4 rounded bg-secondary text-white hover:bg-secondary/90 transition-colors">
                Email Us
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Phone Support</h3>
              <p className="text-secondary/70 text-sm mb-4">Call us directly for immediate assistance.</p>
              <button className="w-full py-2 px-4 rounded bg-secondary text-white hover:bg-secondary/90 transition-colors">
                Call Now
              </button>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-subtle">
            <h2 className="text-xl font-display font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  question: 'How do I reset my password?',
                  answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password.'
                },
                {
                  question: 'Can I download course materials for offline viewing?',
                  answer: 'Yes, most course materials can be downloaded for offline viewing. Look for the download icon next to the course material you wish to save.'
                },
                {
                  question: 'How do I get a certificate after completing a course?',
                  answer: 'Once you\'ve completed all required modules and assignments for a course, you can download your certificate from the course completion page or from your achievements section in your profile.'
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, debit cards, UPI, net banking, and PayPal. For certain regions, we also offer additional local payment options.'
                },
                {
                  question: 'How can I connect with a tutor?',
                  answer: 'You can browse available tutors in the "Find a Tutor" section. Filter by subject, availability, and ratings to find the perfect match for your learning needs.'
                },
              ].map((faq, index) => (
                <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-medium text-secondary">{faq.question}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-secondary/70">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <a href="/faq" className="text-secondary font-medium hover:underline">
                View All FAQs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpCenter;
