
import React, { useState } from 'react';
import { Check, Mail, Globe, Users, FileText, Database, Zap, Download, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { subscribeToNewsletter, submitContactInquiry, registerForReport, trackDownload } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface RegistrationResult {
  reportUrl: string;
  summaryUrl: string;
  email: string;
  registrationId: number;
}

export default function SubscribePage() {
  const { toast } = useToast();
  const { refetch } = useAuth();
  const [subscribing, setSubscribing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);
  const [email, setEmail] = useState('');
  const [selectedTier, setSelectedTier] = useState<'free' | 'pro' | 'team'>('free');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    website: '',
    role: '',
    interest: '',
    newsletter: true
  });
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Newsletter Sponsorship',
    comments: ''
  });

  const handleOpenRegisterModal = (tier: 'free' | 'pro' | 'team') => {
    setSelectedTier(tier);
    setShowRegisterModal(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (registerForm.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    
    setRegistering(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: registerForm.email,
          password: registerForm.password,
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          phone: registerForm.phone,
          company: registerForm.company,
          role: registerForm.role,
          interest: registerForm.interest,
          newsletterSubscribed: registerForm.newsletter
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      await refetch();
      
      const regResult = await registerForReport({
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        phone: registerForm.phone,
        company: registerForm.company,
        website: registerForm.website,
        role: registerForm.role,
        interest: registerForm.interest,
        tier: selectedTier,
        newsletter: registerForm.newsletter
      });
      
      setRegistrationResult({
        reportUrl: regResult.reportUrl,
        summaryUrl: regResult.summaryUrl,
        email: regResult.email,
        registrationId: regResult.registrationId
      });
      setRegistrationComplete(true);
      
      toast({
        title: "Account created!",
        description: "You can now log in anytime to access your reports.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setRegistering(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent, isFree = true) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      await subscribeToNewsletter(email);
      toast({
        title: "Success!",
        description: isFree ? "You're subscribed to the BizTech 100 report!" : "We'll send you payment information shortly.",
      });
      setEmail('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitContactInquiry(contactForm);
      toast({
        title: "Inquiry submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setContactForm({
        name: '',
        email: '',
        company: '',
        interest: 'Newsletter Sponsorship',
        comments: ''
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const roleOptions = [
    'Founder/CEO',
    'Executive (C-Suite)',
    'Investor/VC',
    'Director/Manager',
    'Engineer/Developer',
    'Sales/Marketing',
    'Legal/Policy',
    'Student/Academic',
    'Other'
  ];

  const interestOptions = [
    'Company Research',
    'Investment Opportunities',
    'Job/Career Opportunities',
    'Partnership/Business Development',
    'Market Intelligence',
    'Policy/Regulatory Research',
    'Academic Research',
    'Other'
  ];

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-3">JANUARY 2026 - FREE ACCESS</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Colorado BizTech 100
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            During January, we are offering the free executive summary and full report. In the first quarter we'll provide other updates, expanded content and coverage.
          </p>
          <p className="text-lg text-slate-700 font-medium">
            Sign up now for free, and join the conversation around the Colorado high tech ecosystem!
          </p>
        </div>

        {/* Free Report Signup */}
        <div className="max-w-xl mx-auto mb-20">
          <div className="bg-white border-2 border-blue-500 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">FREE</span>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Get the BizTech 100 Report</h3>
              <p className="text-slate-600">Executive summary + full rankings report</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-slate-600 text-sm">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                BizTech 100 Executive Summary (PDF)
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                Full Rankings Report with all 100 companies
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                Weekly newsletter updates
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                Q1 2026 expanded content & coverage
              </li>
            </ul>
            <Button 
              onClick={() => handleOpenRegisterModal('free')} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-lg h-12"
              data-testid="button-get-free-access"
            >
              Get Free Access Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-slate-600 mb-4">
            Questions or partnership inquiries?
          </p>
          <a 
            href="mailto:Dan@ColoradoBizTech.com" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Dan@ColoradoBizTech.com
          </a>
          <p className="text-slate-500 text-sm mt-2">We respond within one business day</p>
        </div>

      </div>

      {/* Registration Modal */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {!registrationComplete ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-display">
                  {selectedTier === 'free' && 'Get Free Access to the BizTech 100'}
                  {selectedTier === 'pro' && 'Start Your Pro Free Trial'}
                  {selectedTier === 'team' && 'Request Team Access'}
                </DialogTitle>
                <DialogDescription>
                  Complete registration to download the BizTech 100 Colorado Rankings report.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Work Email *</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    required
                    data-testid="input-register-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Create Password *</Label>
                  <div className="relative">
                    <Input
                      id="registerPassword"
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => {
                        setRegisterForm({...registerForm, password: e.target.value});
                        setPasswordError('');
                      }}
                      placeholder="At least 8 characters"
                      required
                      data-testid="input-register-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                  <p className="text-xs text-slate-500">You'll use this to log in and access your reports anytime</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registerCompany">Company/Organization *</Label>
                  <Input
                    id="registerCompany"
                    value={registerForm.company}
                    onChange={(e) => setRegisterForm({...registerForm, company: e.target.value})}
                    required
                    data-testid="input-register-company"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role *</Label>
                    <select
                      id="role"
                      value={registerForm.role}
                      onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                      className="flex h-10 w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      data-testid="select-role"
                    >
                      <option value="">Select role...</option>
                      {roleOptions.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestArea">Primary Interest *</Label>
                    <select
                      id="interestArea"
                      value={registerForm.interest}
                      onChange={(e) => setRegisterForm({...registerForm, interest: e.target.value})}
                      className="flex h-10 w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      data-testid="select-interest-area"
                    >
                      <option value="">Select interest...</option>
                      {interestOptions.map(interest => (
                        <option key={interest} value={interest}>{interest}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                    data-testid="input-phone"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white" 
                  disabled={registering}
                  data-testid="button-submit-registration"
                >
                  {registering ? 'Registering...' : 'Get Access'}
                </Button>
                
                <p className="text-xs text-slate-500 text-center">
                  By registering, you agree to receive emails from Colorado BizTech. You can unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-display text-center">
                  <span className="text-green-600">Registration Complete!</span>
                </DialogTitle>
                <DialogDescription className="text-center">
                  Thank you for registering. Download your reports below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-4">
                    Registered as: <strong>{registrationResult?.email}</strong>
                  </p>
                  
                  <div className="space-y-3">
                    <a 
                      href={registrationResult?.summaryUrl} 
                      download="BizTech100-Executive-Summary.pdf"
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => registrationResult?.registrationId && trackDownload(registrationResult.registrationId, 'executive_summary')}
                      data-testid="link-download-summary"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={20} />
                        <div>
                          <p className="font-medium text-slate-900">Executive Summary</p>
                          <p className="text-xs text-slate-500">PDF, 5 pages</p>
                        </div>
                      </div>
                      <Download className="text-slate-400" size={18} />
                    </a>
                    
                    <a 
                      href={registrationResult?.reportUrl} 
                      download="BizTech100-Full-Report.pdf"
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => registrationResult?.registrationId && trackDownload(registrationResult.registrationId, 'full_report')}
                      data-testid="link-download-report"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={20} />
                        <div>
                          <p className="font-medium text-slate-900">Full Report</p>
                          <p className="text-xs text-slate-500">PDF, 37 pages</p>
                        </div>
                      </div>
                      <Download className="text-slate-400" size={18} />
                    </a>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRegisterModal(false);
                      setRegistrationComplete(false);
                      setRegisterForm({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        phone: '',
                        company: '',
                        website: '',
                        role: '',
                        interest: '',
                        newsletter: true
                      });
                    }}
                    data-testid="button-close-modal"
                  >
                    Close
                  </Button>
                </div>
                
                <p className="text-xs text-slate-500 text-center">
                  Click the buttons above to download your PDF reports.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
