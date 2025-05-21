
import { Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityImpact = () => {
  return (
    <section id="community" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <div className="bg-gold-500/20 p-2 rounded-lg mr-3">
                  <Handshake className="h-6 text-red-300 w-6 text-gold-500" />
                </div>
                <h5 className="text-red-300 font-medium">COMMUNITY FOCUS</h5>
              </div>
              
              <h2 className="text-3xl text-red-500 md:text-4xl font-bold mb-6">Building Stronger Filipino Communities</h2>
              
              <p className="text-gray-600 mb-8">
                At San Jose City Cooperative, our commitment extends beyond financial services. We actively invest in the communities we serve through educational programs, disaster relief, and social development initiatives.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <h4 className="text-2xl font-bold text-red-500 mb-1">₱25M+</h4>
                  <p className="text-sm text-gray-600">Invested in community programs</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <h4 className="text-2xl font-bold text-red-500 mb-1">50+</h4>
                  <p className="text-sm text-gray-600">Barangays supported</p>
                </div>
              </div>
              
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 w-full sm:w-auto">
                Learn About Our Programs
              </Button>
            </div>
            
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Community impact programs" 
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-300/10"></div>
              
              {/* Image grid for additional community images */}
              <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                <div className="w-1/3 h-20 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509099652299-30938b0aeb63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmlsaXBpbm8lMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')" }}></div>
                <div className="w-1/3 h-20 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527499456709-838ffdcfee3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmlsaXBpbm8lMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')" }}></div>
                <div className="w-1/3 h-20 bg-cover bg-center rounded-lg relative">
                  <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpbGlwaW5vJTIwY29tbXVuaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60')" }} className="absolute inset-0 bg-cover bg-center rounded-lg"></div>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white font-medium">+12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
