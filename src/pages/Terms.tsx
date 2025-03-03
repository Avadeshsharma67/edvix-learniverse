
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-secondary">Terms of Service</h1>
            <p className="text-secondary/70 mb-8">Last updated: June 15, 2025</p>
            
            <div className="bg-white rounded-lg shadow-subtle p-6 sm:p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-secondary/70 mb-4">
                By accessing and using the EdVix platform, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
              <p className="text-secondary/70 mb-4">
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for safeguarding your password and for all activities that occur under your account.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">3. Course Content</h2>
              <p className="text-secondary/70 mb-4">
                All course content on EdVix is protected by copyright and other intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without our express permission.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">4. Payment Terms</h2>
              <p className="text-secondary/70 mb-4">
                All payments are processed securely through our payment processors. Prices for courses are subject 
                to change. Refunds are processed according to our refund policy.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">5. User Conduct</h2>
              <p className="text-secondary/70 mb-4">
                Users must not engage in any activity that violates these terms, including but not limited to 
                uploading harmful content, impersonating others, or using our platform for illegal activities.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
              <p className="text-secondary/70 mb-4">
                We reserve the right to terminate or suspend your account and access to our services at our sole 
                discretion, without notice, for conduct that we believe violates these Terms of Service.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-secondary/70 mb-4">
                EdVix shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use or inability to use the service.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-secondary/70 mb-4">
                We may revise these terms at any time by updating this page. By continuing to use our platform after 
                such changes, you agree to the revised terms.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-secondary/70 mb-4">
                If you have any questions about these Terms of Service, please contact us.
              </p>
              <a href="/contact" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
