
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: '🔍',
  },
  {
    id: 'courses',
    name: 'Courses & Learning',
    icon: '📚',
  },
  {
    id: 'account',
    name: 'Account & Profile',
    icon: '👤',
  },
  {
    id: 'payment',
    name: 'Payments & Billing',
    icon: '💳',
  },
  {
    id: 'tutors',
    name: 'Tutors & Teaching',
    icon: '👨‍🏫',
  },
  {
    id: 'technical',
    name: 'Technical Support',
    icon: '🔧',
  },
];

const faqItems = [
  {
    category: 'general',
    question: 'What is EdVix?',
    answer: 'EdVix is an online learning platform that connects students with expert tutors across various subjects. We offer a wide range of courses, personalized tutoring, and learning resources to help students achieve their educational goals.'
  },
  {
    category: 'general',
    question: 'How do I get started with EdVix?',
    answer: 'To get started, simply create an account by clicking the "Register" button. Once registered, you can browse courses, explore tutors, or take assessment tests to get personalized recommendations based on your learning goals.'
  },
  {
    category: 'general',
    question: 'Is EdVix available on mobile devices?',
    answer: 'Yes, EdVix is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android that you can download from the App Store or Google Play Store for a better mobile learning experience.'
  },
  {
    category: 'courses',
    question: 'Are the courses self-paced or scheduled?',
    answer: 'EdVix offers both self-paced and scheduled courses. Self-paced courses allow you to learn at your own convenience, while scheduled courses follow a specific timeline with live sessions and deadlines for assignments.'
  },
  {
    category: 'courses',
    question: 'Do I get a certificate after completing a course?',
    answer: 'Yes, you receive a certificate of completion for all paid courses once you have completed all required modules and assignments. Some courses also offer professional certification that is recognized by industry partners.'
  },
  {
    category: 'courses',
    question: 'How long do I have access to a course after purchasing?',
    answer: 'Once you purchase a course, you have lifetime access to the course materials. This allows you to revisit the content whenever you need a refresher, even after you have completed the course.'
  },
  {
    category: 'account',
    question: 'How do I update my profile information?',
    answer: 'You can update your profile information by logging into your account and navigating to the "Settings" page. From there, you can edit your personal details, change your password, and manage notification preferences.'
  },
  {
    category: 'account',
    question: 'Can I have both student and tutor accounts?',
    answer: 'Yes, you can have dual roles on EdVix. You can learn as a student and teach as a tutor from the same account. Simply toggle between the student and tutor dashboard from your profile menu.'
  },
  {
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, UPI, and net banking for Indian customers. International payments can be made via credit card or PayPal. All transactions are secured with industry-standard encryption.'
  },
  {
    category: 'payment',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee for most courses. If you\'re not satisfied with a course, you can request a refund within 7 days of purchase, provided you have not completed more than 25% of the course.'
  },
  {
    category: 'tutors',
    question: 'How do I become a tutor on EdVix?',
    answer: 'To become a tutor, click on the "Become a Tutor" button and complete the application process. You\'ll need to provide your educational qualifications, teaching experience, and subject expertise. Our team will review your application and get back to you.'
  },
  {
    category: 'tutors',
    question: 'How much can I earn as a tutor?',
    answer: 'Earnings vary based on your expertise, the number of courses you create, and your engagement with students. Tutors typically earn 70% of the course fee for self-created courses and hourly rates for one-on-one sessions.'
  },
  {
    category: 'technical',
    question: 'What should I do if a course video isn\'t playing?',
    answer: 'If you\'re experiencing playback issues, try refreshing the page, clearing your browser cache, or switching to a different browser. Ensure you have a stable internet connection. If the problem persists, please contact our technical support team.'
  },
  {
    category: 'technical',
    question: 'How do I report a technical issue?',
    answer: 'You can report technical issues by clicking on the "Help" button at the bottom of any page or by emailing support@edvix.com. Please include details about the issue, your device, browser, and screenshots if possible to help us resolve it quickly.'
  },
];

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFaqs = searchQuery 
    ? faqItems.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems.filter(faq => faq.category === activeCategory);
  
  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-secondary">Frequently Asked Questions</h1>
              <p className="text-secondary/70 max-w-2xl mx-auto">
                Find answers to common questions about EdVix. Can't find what you're looking for? 
                Contact our support team for assistance.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-10">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary/40" />
              </div>
              <Input
                type="text"
                placeholder="Search for questions or keywords..."
                className="pl-10 py-6 text-base rounded-full border-gray-200 shadow-subtle"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            {!searchQuery && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary/5 border-primary text-primary'
                        : 'bg-white border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery('');
                    }}
                  >
                    <span className="text-2xl mb-2">{category.icon}</span>
                    <span className="text-sm font-medium text-center">{category.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* FAQ Items */}
            <div className="bg-white rounded-xl shadow-subtle overflow-hidden">
              {searchQuery && filteredFaqs.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-secondary/60 mb-4">No results found for "{searchQuery}"</p>
                  <Button onClick={() => setSearchQuery('')} variant="outline">Clear Search</Button>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <span className="text-left font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-secondary/70">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
            
            {/* Contact Section */}
            <div className="mt-12 bg-white p-8 rounded-xl shadow-subtle text-center">
              <h2 className="text-xl font-display font-semibold mb-3">Still have questions?</h2>
              <p className="text-secondary/70 mb-6">
                Our support team is ready to help you with any questions or concerns you might have.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => window.location.href = '/contact'}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => window.location.href = 'mailto:support@edvix.com'}>
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Faq;
