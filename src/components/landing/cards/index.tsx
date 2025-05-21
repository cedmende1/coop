
import React from 'react';
import { Shield, Users, PiggyBank, HandCoins, CheckCircle, TrendingUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FeatureCard = ({ icon, title, description, image }) => (
  <div className="bg-card rounded-xl p-6 shadow-md border border-primary/10 hover:shadow-lg transition-all relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
      <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 font-playfair">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export const StepCard = ({ number, icon, title, description, image }) => (
  <div className="bg-card rounded-xl p-6 shadow-md border border-primary/10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
      <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center absolute right-6 top-6">
      <span className="font-bold text-primary">{number}</span>
    </div>
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 font-playfair">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export const TestimonialCard = ({ quote, author, role, image }) => (
  <div className="bg-card rounded-xl p-6 shadow-md border border-primary/10 hover:shadow-lg transition-all">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
        <img src={image} alt={author} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div>
        <h4 className="font-bold">{author}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
    <p className="italic text-muted-foreground">"{quote}"</p>
  </div>
);

export const FaqCard = ({ question, answer }) => (
  <Card className="bg-white border-primary/10 hover:shadow-md transition-all">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <HelpCircle className="text-primary h-5 w-5" />
        {question}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{answer}</p>
    </CardContent>
  </Card>
);
