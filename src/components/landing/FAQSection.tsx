
import React from 'react';
import { FaqCard } from './cards';

const FAQSection = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 font-playfair">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? Here are some of the most common questions we receive about our lending services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FaqCard 
            question="What types of loans does Lendology offer?"
            answer="We offer personal loans, business loans, and debt consolidation loans tailored to meet a variety of financial needs."
          />
          <FaqCard 
            question="What are the interest rates and terms?"
            answer="Interest rates vary based on the type of loan, your credit score, and the loan term. We offer competitive rates and flexible repayment options."
          />
          <FaqCard 
            question="How quickly can I get approved?"
            answer="Our automated system allows for quick approvals, often within minutes. Funds are typically deposited within 1-2 business days after final approval."
          />
          <FaqCard 
            question="What documents do I need to apply?"
            answer="You'll typically need to provide proof of income, identification, and bank statements. Additional documents may be required based on the loan type."
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
