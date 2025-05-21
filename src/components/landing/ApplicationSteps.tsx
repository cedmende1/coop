
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ApplicationSteps = () => {
  const steps = [
    {
      number: '01',
      title: 'Be a member and Fill out the application',
      description: 'Complete our simple online form or visit any of our branches with valid ID and proof of income.'
    },
    {
      number: '02',
      title: 'Quick verification',
      description: 'Our team verifies your information and assesses your application, usually within 24 hours.'
    },
    {
      number: '03',
      title: 'Approval & terms',
      description: 'Get your loan approved and agree to the personalized terms of your loan based on your profile.'
    },
    {
      number: '04',
      title: 'Receive your funds',
      description: 'Funds are disbursed directly to your bank account or available for pick-up at our branches.'
    }
  ];

  return (
    <section id="apply" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Apply</h2>
          <p className="text-gray-600">
            Our streamlined application process makes getting a loan quick and hassle-free.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              {/* Step number */}
              <div className="text-6xl font-bold text-red-500/10 absolute top-4 right-4">
                {step.number}
              </div>
              
              {/* Completed step indicator */}
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Check className="h-4 w-4 text-red-500" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
              
              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-red-200"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-red-500 to-rose-300 text-white hover:opacity-90 px-8">
            Start Your Application
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ApplicationSteps;
