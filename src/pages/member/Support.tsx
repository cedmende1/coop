import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { PhoneIcon, MailIcon, MessageCircleIcon, SearchIcon, FileTextIcon, ExternalLinkIcon, SendIcon, HelpCircleIcon, ChevronDownIcon } from 'lucide-react';
type TabType = 'contact' | 'faq' | 'resources';
interface FAQItem {
  question: string;
  answer: string;
}
interface ResourceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}
// FAQ data
const faqItems: FAQItem[] = [{
  question: 'How do I apply for a loan?',
  answer: "You can apply for a loan by logging into your account, navigating to the 'Apply Loan' section, and filling out the application form. Make sure to have all required documents ready for upload."
}, {
  question: 'What documents do I need for loan application?',
  answer: "Typically, you'll need proof of identification (valid ID), proof of income (pay slips or tax returns), proof of residence, and any collateral documentation if applicable."
}, {
  question: 'How long does the loan approval process take?',
  answer: 'The standard approval process takes 2-3 business days. However, this can vary depending on the loan type, amount, and completeness of your application.'
}, {
  question: 'How can I check my loan status?',
  answer: "You can check your loan status by logging into your account and navigating to the 'Loans' section where all your active and pending loans are displayed."
}, {
  question: 'What are the repayment options available?',
  answer: 'We offer multiple repayment options including automatic deductions, bank transfers, and over-the-counter payments at our partner banks.'
}, {
  question: 'Can I pay off my loan early?',
  answer: 'Yes, you can pay off your loan early without any prepayment penalties. This can help you save on interest payments.'
}, {
  question: 'What if I miss a payment?',
  answer: 'If you miss a payment, late fees may apply. Contact our support team immediately to discuss your situation and potential solutions.'
}, {
  question: 'How can I update my personal information?',
  answer: "You can update your personal information by going to the 'Profile' section in your account settings."
}];
// Resources data
const resourceItems: ResourceItem[] = [{
  icon: <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  title: 'Loan Application Guide',
  description: 'Step-by-step guide to completing your loan application successfully.',
  link: '/resources/loan-application-guide'
}, {
  icon: <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  title: 'Document Preparation Checklist',
  description: 'Make sure you have all the necessary documents ready for your loan application.',
  link: '/resources/document-checklist'
}, {
  icon: <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  title: 'Financial Planning Tools',
  description: 'Tools and calculators to help you plan your finances better.',
  link: '/resources/financial-tools'
}, {
  icon: <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  title: 'Understanding Interest Rates',
  description: 'Learn how interest rates are calculated and how they affect your loans.',
  link: '/resources/interest-rates'
}, {
  icon: <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  title: 'Repayment Strategies',
  description: 'Effective strategies to manage and pay off your loans faster.',
  link: '/resources/repayment-strategies'
}, {
  icon: <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  title: 'Security Best Practices',
  description: 'Learn how to keep your account and financial information secure.',
  link: '/resources/security-practices'
}];
export const Support = () => {
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Form state for contact support
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    priority: 'medium',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Submitting support request:', formData);
    // Simulate API call
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        priority: 'medium',
        message: ''
      });
    }, 1000);
  };
  // Reset form submission status
  const resetForm = () => {
    setFormSubmitted(false);
  };
  // Toggle FAQ expansion
  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };
  // Filter FAQ items based on search term
  const filteredFAQs = faqItems.filter(item => item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.answer.toLowerCase().includes(searchTerm.toLowerCase()));
  return <>
      <PageHeader title="Support" description="Get help and support for your account" />
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-[rgba(var(--border-color),0.2)]">
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'contact' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('contact')}>
          Contact Support
        </button>
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'faq' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('faq')}>
          Frequently Asked Questions
        </button>
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'resources' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('resources')}>
          Resources
        </button>
      </div>
      {/* Contact Support Tab */}
      {activeTab === 'contact' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
                <h2 className="text-xl font-semibold mb-1">Contact Support</h2>
                <p className="text-[rgb(var(--text-secondary))]">
                  Fill out the form below and our support team will get back to
                  you as soon as possible.
                </p>
              </div>
              {formSubmitted ? <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
                    <SendIcon size={32} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Support Request Submitted!
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-6">
                    Thank you for contacting us. We'll respond to your inquiry
                    as soon as possible.
                  </p>
                  <button onClick={resetForm} className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                    Submit Another Request
                  </button>
                </div> : <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter your email address" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter subject" />
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-1">
                        Priority
                      </label>
                      <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Describe your issue or question in detail"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="px-6 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                      Submit Support Request
                    </button>
                  </div>
                </form>}
            </div>
          </div>
          <div className="space-y-4">
            {/* Phone Support Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <PhoneIcon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Phone Support</h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-3">
                    Call us directly for immediate assistance with your account
                    or loans.
                  </p>
                  <p className="font-medium">+63 (2) 8123-4567</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Monday - Friday: 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
            {/* Email Support Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  <MailIcon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email Support</h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-3">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <p className="font-medium">support@lendology.com</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    24/7 Email Support
                  </p>
                </div>
              </div>
            </div>
            {/* Live Chat Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <MessageCircleIcon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Live Chat</h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-3">
                    Chat with our support team in real-time for quick
                    assistance.
                  </p>
                  <button className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                    Start Chat
                  </button>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mt-2">
                    Available: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* FAQ Tab */}
      {activeTab === 'faq' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="relative mb-4">
              <input type="text" placeholder="Search FAQs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            </div>
            <p className="text-[rgb(var(--text-secondary))]">
              Find answers to the most common questions about our services
            </p>
          </div>
          <div className="divide-y divide-[rgba(var(--border-color),0.2)]">
            {filteredFAQs.length > 0 ? filteredFAQs.map((faq, index) => <div key={index} className="p-4 sm:p-6">
                  <button className="flex justify-between items-center w-full text-left" onClick={() => toggleFAQ(index)}>
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === index && <div className="mt-2 text-[rgb(var(--text-secondary))]">
                      {faq.answer}
                    </div>}
                </div>) : <div className="p-8 text-center">
                <HelpCircleIcon className="mx-auto h-12 w-12 text-[rgb(var(--text-secondary))]" />
                <h3 className="mt-2 text-lg font-medium">No results found</h3>
                <p className="text-[rgb(var(--text-secondary))]">
                  Try adjusting your search terms or browse all FAQs
                </p>
              </div>}
          </div>
        </div>}
      {/* Resources Tab */}
      {activeTab === 'resources' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
            <h2 className="text-xl font-semibold mb-1">Help Resources</h2>
            <p className="text-[rgb(var(--text-secondary))]">
              Access guides, tutorials, and documentation to help you get the
              most out of our services
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resourceItems.map((resource, index) => <div key={index} className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-5 hover:border-neon-red/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{resource.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg">{resource.title}</h3>
                      <p className="text-[rgb(var(--text-secondary))] mb-3">
                        {resource.description}
                      </p>
                      <a href={resource.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                        View Resource
                        <ExternalLinkIcon size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}
    </>;
};