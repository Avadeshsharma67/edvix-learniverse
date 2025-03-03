
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-secondary">Privacy Policy</h1>
            <p className="text-secondary/70 mb-8">Last updated: June 15, 2025</p>
            
            <div className="bg-white rounded-lg shadow-subtle p-6 sm:p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-secondary/70 mb-4">
                We collect personal information when you register for an account, purchase courses, or participate 
                in our platform. This may include your name, email address, payment information, and learning preferences.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-secondary/70 mb-4">
                We use your information to provide and improve our services, process payments, and send you important 
                updates. We may also use your data to personalize your learning experience and recommend courses.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-secondary/70 mb-4">
                We do not sell your personal information to third parties. We may share your information with service 
                providers who help us operate our platform, process payments, or deliver content.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-secondary/70 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-secondary/70 mb-4">
                You have the right to access, correct, or delete your personal information. You may also object to 
                certain processing activities or request that we restrict the processing of your data.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-secondary/70 mb-4">
                We use cookies and similar technologies to enhance your experience on our platform, analyze usage 
                patterns, and deliver personalized content. You can control cookie settings through your browser.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
              <p className="text-secondary/70 mb-4">
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal 
                information from children under 16 without parental consent.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p className="text-secondary/70 mb-4">
                We may update this privacy policy from time to time. We will notify you of significant changes by 
                posting the new policy on this page and updating the effective date.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-secondary/70 mb-4">
                If you have any questions about our Privacy Policy, please contact us.
              </p>
              <a href="/contact" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
