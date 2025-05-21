import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, BadgePercent, Users, ShieldCheck, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Hero = () => {
  return (
    <section className="min-h-screen relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Decorative patterns with reduced opacity */}
      <div className="absolute inset-0 z-0 opacity-5" style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C41E3A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundSize: '20rem'
      }}></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content column - Enhanced typography and information */}
        <div className="max-w-xl space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Enhanced badge with improved styling */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-600 font-medium text-sm tracking-wide shadow-sm border border-red-500/10">
            <ShieldCheck className="h-4 w-4" /> MEMBER-EXCLUSIVE LENDING BENEFITS
          </div>

          {/* Enhanced heading with improved typography */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Cooperative <span className="text-gradient font-extrabold">Lending</span> That Empowers Filipino Families
          </h1>
          
          {/* Enhanced feature highlights with icons and better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5">
            <div className="flex items-center gap-3 p-2 rounded-lg border border-red-100 bg-white/50 shadow-sm">
              <div className="bg-red-50 p-2 rounded-full">
                <BadgePercent className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Low Interest</p>
                <p className="text-xs text-gray-600">From 12% p.a.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg border border-red-100 bg-white/50 shadow-sm">
              <div className="bg-red-50 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Flexible Loans</p>
                <p className="text-xs text-gray-600">Up to ₱500,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg border border-red-100 bg-white/50 shadow-sm">
              <div className="bg-red-50 p-2 rounded-full">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Trusted by</p>
                <p className="text-xs text-gray-600">5,000+ members</p>
              </div>
            </div>
          </div>
          
          {/* Enhanced description with more specific information */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700 md:text-xl font-medium">
              Access community-powered financial solutions with flexible terms and lower rates than traditional banks.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-red-600" />
                <span>Customized loan terms from 6 to 60 months</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-red-600" />
                <span>No hidden fees or prepayment penalties</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-red-600" />
                <span>Special rates for long-term members</span>
              </li>
            </ul>
          </div>
          
          {/* Enhanced CTA buttons with improved styling */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-rose-500 text-white hover:opacity-90 group shadow-md">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 shadow-sm">
              Calculate Your Loan
            </Button>
          </div>

          {/* Enhanced testimonial with improved design */}
          <div className="relative mt-8 p-5 glass rounded-lg border-l-4 border-red-500 shadow-md">
            <Badge className="absolute -top-2 -left-2 bg-red-500 text-white">Member Story</Badge>
            <div className="text-gray-700 italic font-medium">
              "San Jose City Cooperative loan helped me start my small business. The process was easy and the terms were better than any bank offered."
            </div>
            <div className="mt-3 font-semibold flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white">MS</div>
              <div>
                <div>Maria Santos</div>
                <div className="text-xs text-gray-500">Member since 2021</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right image column - Enhanced visuals and information cards */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Main image with shadow and border */}
          <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/50">
            <img 
              src="/lovable-uploads/d36d3247-5286-416d-8062-d6a8f6243ae9.png"
              alt="Business professional shaking hands with client" 
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
            {/* Semi-transparent overlay with testimonial */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="text-white text-sm">
                "COOP of San Jose City helped fund my children's education with manageable terms."
                <div className="text-xs mt-1 opacity-80">— Juan Cruz, Member</div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements with improved styling */}
         <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-500 rounded-full opacity-20 blur-md"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-red-600 rounded-full opacity-20 blur-md"></div>
          
          {/* Enhanced loan process infographic with better spacing */}
          <Card className="absolute -bottom-1/2 -right-12 p-6 rounded-lg shadow-xl md:max-w-xs hidden md:block glass border-2 border-white/50">
            <CardContent className="p-0 space-y-2">
              <h4 className="font-bold text-red-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Simple 3-Step Process
              </h4>
              <Separator className="bg-red-100" />
              <ol className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold shadow-sm">1</div>
                  <div>
                    <span className="text-sm font-medium">Apply online or in-branch</span>
                    <p className="text-xs text-gray-500 mt-1">Simple 10-minute application</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold shadow-sm">2</div>
                  <div>
                    <span className="text-sm font-medium">Quick approval process</span>
                    <p className="text-xs text-gray-500 mt-1">Decision within 24-48 hours</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold shadow-sm">3</div>
                  <div>
                    <span className="text-sm font-medium">Receive funds quickly</span>
                    <p className="text-xs text-gray-500 mt-1">Direct deposit to your account</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Enhanced stats card with improved spacing */}
          <div className="glass absolute -bottom-1/2 left-1/4 p-6 rounded-lg shadow-xl hidden md:block border border-white/50">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 p-4 rounded-full shadow-inner">
                <BadgePercent className="h-7 w-7 text-red-500" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">Average interest rate</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">12%</p>
                <p className="text-xs text-red-600 font-medium">35% lower than traditional banks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
