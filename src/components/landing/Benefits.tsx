
import { Shield, Users, Calculator, TrendingUp } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Secure & Trusted',
      description: 'BSP regulated with robust security measures protecting your financial information.'
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: 'Community-Focused',
      description: 'Filipino values of bayanihan at the heart of our financial solutions.'
    },
    {
      icon: <Calculator className="h-8 w-8 text-red-600" />,
      title: 'Flexible Terms',
      description: 'Customizable loan options tailored to fit your unique financial situation.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-600" />,
      title: 'Growth Opportunities',
      description: 'Investment options that help your money grow while supporting local businesses.'
    }
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600">
            We combine Filipino values with world-class financial practices to offer you the best lending experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="bg-red-50 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Filipino-inspired decorative element */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 blur-xl"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 blur-xl"></div>
      </div>
    </section>
  );
};

export default Benefits;
