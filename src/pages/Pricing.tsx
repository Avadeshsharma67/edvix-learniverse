
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Check, HelpCircle } from 'lucide-react';
import AnimatedTitle from '@/components/AnimatedTitle';
import AnimatedButton from '@/components/AnimatedButton';
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for beginners looking to explore our platform',
    features: [
      'Access to free courses',
      'Join community forums',
      'Mobile app access',
      'Basic learning resources',
      'Email support'
    ],
    limitations: [
      'Limited course selection',
      'No certificate of completion',
      'No 1-on-1 tutoring',
      'No advanced features',
    ],
    recommended: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Pro',
    price: '₹1,199',
    period: 'month',
    description: 'For serious learners ready to advance their skills',
    features: [
      'Everything in Basic',
      'Unlimited course access',
      'Course certificates',
      'Priority email support',
      'Download course materials',
      'Ad-free experience',
      'Access to exclusive webinars',
    ],
    limitations: [
      'Limited 1-on-1 tutoring',
    ],
    recommended: true,
    buttonText: 'Start Pro',
    discount: '20% OFF',
    tag: 'MOST POPULAR'
  },
  {
    name: 'Premium',
    price: '₹2,499',
    period: 'month',
    description: 'The ultimate learning experience with personalized coaching',
    features: [
      'Everything in Pro',
      'Unlimited 1-on-1 tutoring',
      'Personalized learning path',
      'Career coaching sessions',
      'Resume review services',
      '24/7 dedicated support',
      'Early access to new courses',
      'Graded assignments with feedback',
    ],
    limitations: [],
    recommended: false,
    buttonText: 'Start Premium',
  }
];

const frequentlyAskedQuestions = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, UPI, and net banking for Indian customers. International payments can be made via credit card or PayPal.'
  },
  {
    question: 'Are there any discounts for students?',
    answer: 'Yes, we offer a 50% discount for verified students. Please contact our support team with valid student ID proof to apply for the discount.'
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Absolutely! You can upgrade your plan at any time and the new pricing will be prorated. Downgrades will take effect at the start of your next billing cycle.'
  },
  {
    question: 'Is there a refund policy?',
    answer: 'We offer a 7-day money-back guarantee for new subscribers. If you\'re not satisfied with our service, contact us within 7 days of your purchase for a full refund.'
  },
  {
    question: 'How many devices can I use with my subscription?',
    answer: 'You can access your EdVix account on up to 3 devices simultaneously with our Pro plan, and up to 5 devices with our Premium plan.'
  }
];

const PricingPage = () => {
  const handleSubscribe = (planName: string) => {
    toast({
      title: "Subscription initiated!",
      description: `You selected the ${planName} plan. This is a demo function.`,
    });
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-block bg-secondary/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary/80">Pricing Plans</span>
            </div>
            
            <AnimatedTitle 
              element="h1" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-secondary"
            >
              Find the Perfect Plan for Your Learning Journey
            </AnimatedTitle>
            
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to our learning platform and mobile apps.
            </p>
          </div>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-subtle">
              <button className="px-6 py-2 rounded-full bg-secondary text-white">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-full text-secondary/70 hover:text-secondary">
                Yearly (Save 20%)
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-xl overflow-hidden border shadow-subtle transition-all duration-300 hover:shadow-md ${
                  plan.recommended ? 'border-secondary' : 'border-gray-100'
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-secondary text-white text-xs py-1 px-3 rounded-bl-lg">
                      {plan.tag}
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl mb-1">{plan.name}</h3>
                  <p className="text-sm text-secondary/70 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-display font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-secondary/60">/{plan.period}</span>
                    )}
                    {plan.discount && (
                      <span className="ml-2 text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                  
                  <AnimatedButton 
                    className={`w-full ${plan.recommended ? 'bg-secondary text-white' : ''}`}
                    variant={plan.recommended ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {plan.buttonText}
                  </AnimatedButton>
                  
                  <div className="mt-6">
                    <p className="text-xs text-secondary/60 mb-3">Includes:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start text-secondary/50">
                          <span className="h-4 w-4 mr-2 mt-0.5 relative">
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="block w-3 h-0.5 bg-current"></span>
                            </span>
                          </span>
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enterprise Section */}
          <div className="bg-white rounded-xl overflow-hidden shadow-subtle mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-display font-semibold mb-4">Enterprise Plan</h3>
                <p className="text-secondary/70 mb-6">
                  Custom solutions for organizations looking to provide learning opportunities for their employees.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Custom learning paths for teams</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Detailed analytics and progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Custom branding options</span>
                  </li>
                </ul>
                
                <AnimatedButton size="lg">
                  Contact Sales
                </AnimatedButton>
              </div>
              <div className="bg-gray-50 p-8 md:p-10 flex items-center">
                <div>
                  <h4 className="font-medium mb-4">Our Enterprise clients include:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((logo) => (
                      <div key={logo} className="h-12 bg-white rounded shadow-subtle flex items-center justify-center text-secondary/30">
                        <span className="font-display font-semibold">LOGO</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-semibold text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {frequentlyAskedQuestions.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-subtle"
                >
                  <h3 className="font-medium text-lg mb-3">{faq.question}</h3>
                  <p className="text-secondary/70">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <p className="text-secondary/70 mb-4">
                Still have questions? We're here to help.
              </p>
              <AnimatedButton variant="outline" onClick={() => window.location.href = '/contact'}>
                Contact Support
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PricingPage;
