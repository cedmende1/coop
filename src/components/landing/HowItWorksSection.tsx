
import React from 'react';
import { StepCard } from './cards';
import { CreditCard, Award, CircleDollarSign } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 font-playfair">How Lendology Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes getting a loan quick and hassle-free, from application to funding.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connection lines between steps (visible on md screens and up) */}
          <div className="hidden md:block absolute top-24 left-[25%] right-[25%] h-0.5 bg-primary/20"></div>
          
          <StepCard 
            number={1}
            title="Apply Online"
            description="Complete our simple online application in as little as 5 minutes with basic information about yourself and your financial needs."
            icon={<CreditCard className="text-primary" size={24} />}
            image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
          />
          <StepCard 
            number={2}
            title="Get Approved"
            description="Our automated system reviews your application instantly, and in most cases, provides an immediate decision on your loan eligibility."
            icon={<Award className="text-primary" size={24} />}
            image="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
          />
          <StepCard 
            number={3}
            title="Receive Funds"
            description="Once approved and after signing your loan agreement, funds are typically deposited into your account within 1-2 business days."
            icon={<CircleDollarSign className="text-primary" size={24} />}
            image="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
