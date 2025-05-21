import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-br from-red-900 to-rose-800 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">San Jose City Cooperative</h3>
            <p className="text-red-100 mb-6">
              Empowering Filipinos with accessible financial solutions that build brighter futures.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Calculator</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Lending Guidelines</a></li>
              <li><a href="#" className="text-red-100 hover:text-white transition-colors">Anti-Fraud Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-red-100">+63 (2) 8123-4567<br />+63 (2) 8765-4321</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-red-100">support@coop.com<br />info@coop.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-red-100">
                  San Jose City<br />
                  Nueva Ecija, Philippines 3121
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="glass-dark rounded-xl p-6 md:p-8 mb-12 flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h4 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-red-100">Stay updated with our latest offerings and financial tips.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:w-1/2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-red-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-300 flex-grow"
            />
            <Button className="bg-white text-red-900 hover:bg-red-100 border-0">
              Subscribe
            </Button>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-red-200 mb-4 md:mb-0">
            © {new Date().getFullYear()} San Jose City Cooperative. All rights reserved. | SEC Registration: XXXXXXXX | BSP License: XXXXXXXX
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-red-300">
            <p>A BSP Regulated Entity</p>
            <span className="hidden md:inline mx-2">|  Powered by</span>
            <a 
              href="https://www.techpro360solutions.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
            TechPro 360 IT Solutions and Consulting Firm
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
