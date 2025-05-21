import { Check } from 'lucide-react';

const Services = () => {
  const services = [
    {
      name: 'Personal Loan',
      description: 'Quick access to funds for personal expenses, emergencies, or special purchases.',
      rate: '1%',
      amount: '₱10,000 - ₱500,000',
      term: '6 - 36 months',
      features: [
        'No collateral required',
        'Same-day approval',
        'Flexible repayment options',
      ],
      featured: true
    },
    {
      name: 'Business Loan',
      description: 'Support your business growth with our flexible financing solutions.',
      rate: '1%',
      amount: '₱50,000 - ₱2,000,000',
      term: '12 - 60 months',
      features: [
        'Minimal documentation',
        'Grow your business',
        'Competitive interest rates',
        'Specialized business support'
      ],
    },
    {
      name: 'Agricultural Loan',
      description: 'Specially designed for farmers, fisherfolk, and agricultural businesses.',
      rate: '1%',
      amount: '₱20,000 - ₱1,000,000',
      term: '6 - 48 months',
      features: [
        'Seasonal repayment terms',
        'Technical assistance',
        'Weather insurance',
        'Direct market access'
      ],
    }
  ];

  return (
    <section id="services" className="min-h-screen relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-50">
      <div className="absolute inset-0 z-0 opacity-5" style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C41E3A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundSize: '20rem'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Financial Services</h2>
          <p className="text-gray-600">
            Customized lending solutions to meet the diverse needs of Filipinos from all walks of life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`glass rounded-xl overflow-hidden transition-all hover:shadow-xl animate-fade-in ${service.featured ? 'ring-2 ring-red-500 ring-offset-4' : ''}`}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              {service.featured && (
                <div className="bg-red-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center border-b border-red-100 pb-2">
                    <span className="text-sm text-gray-500">Interest Rate</span>
                    <span className="font-medium">{service.rate}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-red-100 pb-2">
                    <span className="text-sm text-gray-500">Loan Amount</span>
                    <span className="font-medium">{service.amount}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-red-100 pb-2">
                    <span className="text-sm text-gray-500">Loan Term</span>
                    <span className="font-medium">{service.term}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
