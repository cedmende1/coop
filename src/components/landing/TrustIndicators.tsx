import { ShieldCheck, BadgeCheck, BadgeHelp, Shield } from 'lucide-react';

const TrustIndicators = () => {
  const badges = [
    { 
      name: 'BSP Regulated', 
      description: 'Supervised by the Bangko Sentral ng Pilipinas',
      icon: ShieldCheck 
    },
    { 
      name: 'SEC Registered', 
      description: 'Registered with the Securities and Exchange Commission',
      icon: BadgeCheck 
    },
    { 
      name: 'CDA Member', 
      description: 'Member of the Cooperative Development Authority',
      icon: BadgeHelp 
    },
    { 
      name: 'PDIC Insured', 
      description: 'Deposits insured by the Philippine Deposit Insurance Corporation',
      icon: Shield 
    }
  ];

  return (
    <section id="trust" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {//<div className="absolute inset-0 z-0 opacity-5" style={{ 
        //backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C41E3A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        //backgroundSize: '20rem'
      //}}></div>}
      }
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600 pb-6">
            Trusted and Regulated
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            San Jose City Cooperative is a fully compliant financial institution backed by leading Philippine regulatory bodies, ensuring your financial security and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="group glass rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-red-100 to-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <badge.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{badge.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
