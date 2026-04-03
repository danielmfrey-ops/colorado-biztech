
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { TrendingUp, Building2, Users, LayoutGrid, ArrowRight, FileText, X, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { NEWS_ARTICLES, RESEARCH_HUBS } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

const TOP_10_COMPANIES = [
  { rank: 1, name: 'Lockheed Martin', badge: 'hub', badgeLabel: 'Major Hub', employees: '~3,500', sector: 'Aerospace & Defense', growth: '' },
  { rank: 2, name: 'Amazon (AWS)', badge: 'hub', badgeLabel: 'Major Hub', employees: '~2,500', sector: 'Cloud Infrastructure', growth: '' },
  { rank: 3, name: 'Google', badge: 'hub', badgeLabel: 'Major Hub', employees: '~2,000', sector: 'Cloud & Software', growth: '' },
  { rank: 4, name: 'Raytheon Technologies', badge: 'hub', badgeLabel: 'Major Hub', employees: '~1,800', sector: 'Aerospace & Defense', growth: '' },
  { rank: 5, name: 'Oracle', badge: 'hub', badgeLabel: 'Major Hub', employees: '~1,500', sector: 'Enterprise Software', growth: '' },
  { rank: 6, name: 'BAE Space & Mission Systems', badge: 'hq', badgeLabel: 'CO HQ ★', employees: '~1,200', sector: 'Space Systems', growth: '' },
  { rank: 7, name: 'Microsoft', badge: 'hub', badgeLabel: 'Major Hub', employees: '~1,000', sector: 'Cloud Infrastructure', growth: '' },
  { rank: 8, name: 'Workday', badge: 'hub', badgeLabel: 'Major Hub', employees: '~1,000', sector: 'Enterprise SaaS', growth: '~22%' },
  { rank: 9, name: 'Dish Wireless', badge: 'hq', badgeLabel: 'CO HQ ★', employees: '~1,000', sector: 'Telecommunications/5G', growth: '' },
  { rank: 10, name: 'Palantir Technologies', badge: 'hq', badgeLabel: 'CO HQ ★', employees: '~800', sector: 'Data Analytics/AI', growth: '~45%' },
];

export default function BizTech100Page() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  });

  const handleGetReport = () => {
    if (isAuthenticated && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email,
        company: user.company || '',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
      });
    }
    setIsRegistered(false);
    setShowModal(true);
  };

  const resetModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
    });
    setIsRegistered(false);
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      toast({ variant: 'destructive', title: 'Please fill in all fields' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          phone: '',
          website: '',
          role: '',
          interest: '',
          newsletter: false,
          terms: true,
          tier: 'free'
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsRegistered(true);
        toast({ title: 'Success!', description: 'Ready to download your reports.' });
        
        // Track the registration ID for download tracking
        if (data.registrationId) {
          localStorage.setItem('last_registration_id', data.registrationId.toString());
        }
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Registration failed', description: 'Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* BizTech 100 Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="container mx-auto px-6 relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6">
                2026 INAUGURAL EDITION
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-display text-slate-900">
                The BizTech 100
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                The BizTech 100 is Colorado's definitive ranking of the top 100 technology companies, evaluated by high-tech workforce size, growth rate, capital depth, and financial stability. These 100 companies employ an estimated 34,215 technical professionals across Colorado in 2026.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold mb-1 text-slate-900">34,215</div>
                  <div className="text-xs text-slate-500">High-Tech Employees</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold mb-1 text-slate-900">$500-700B</div>
                  <div className="text-xs text-slate-500">Attributable Value</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold mb-1 text-slate-900">62%</div>
                  <div className="text-xs text-slate-500">Colorado HQ</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold mb-1 text-slate-900">20.2%</div>
                  <div className="text-xs text-slate-500">Avg Growth (CAGR)</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  className="bg-blue-600 text-white hover:bg-blue-700 text-sm h-10 px-5 font-semibold shadow-md hover:shadow-lg transition-all"
                  onClick={handleGetReport}
                  data-testid="button-get-report"
                >
                  Get Full Report
                </Button>
                  <a 
                    href="/downloads/biztech100-executive-summary.pdf"
                    download="BizTech100-Executive-Summary.pdf"
                    className="inline-flex items-center justify-center border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm h-10 px-5 font-semibold rounded-md"
                    data-testid="button-read-summary"
                  >
                    Executive Summary (PDF - 5 Pages)
                  </a>
              </div>
              
              <p className="text-sm text-slate-500">
                <Lock className="inline w-4 h-4 mr-1" />
                Free executive summary available now • Full report requires quick registration
              </p>
            </div>
            
            {/* Right: Top 10 Preview Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-xl p-6 lg:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Top 10 Companies</h3>
              <ol className="space-y-3 mb-6">
                {TOP_10_COMPANIES.map((company) => (
                  <li key={company.rank} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-600 font-bold w-6">#{company.rank}</span>
                      <span className="text-slate-800 font-medium">{company.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      company.badge === 'hq' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {company.badge === 'hq' ? '★' : '◆'} {company.badgeLabel}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-slate-600 text-center mb-4 italic">
                "Colorado HQ ★" denotes companies headquartered in Colorado. Growth percentages highlight exceptional 3-year CAGR where applicable.
              </p>
              <div className="text-center pt-2 border-t border-slate-200">
                <button 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  onClick={handleGetReport}
                  data-testid="button-view-rankings"
                >
                  View Complete Rankings <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Rankings Section */}
      <section className="relative z-10 py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold font-display text-slate-900 mb-4 text-center">Complete BizTech 100 Rankings</h2>
          <p className="text-slate-600 text-center mb-8">
            The complete list includes detailed profiles of all 100 companies, organized by sector and growth metrics. Register to access the full analysis.
          </p>
          <p className="text-sm text-slate-500">
            <Lock className="inline w-4 h-4 mr-1" />
            Free executive summary available now • Full report requires quick registration
          </p>
        </div>
      </section>

      {/* Sector Breakdown Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 text-center">Key Sectors in Colorado's Tech Ecosystem</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span> Artificial Intelligence
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Palantir Technologies (CO HQ) leading in data analytics</li>
                <li>• Google and Amazon AI initiatives in Colorado</li>
                <li>• Emerging startup ecosystem focused on AI/ML applications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span> Space & Aerospace
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li>• BAE Space & Mission Systems (CO HQ) defense contractor</li>
                <li>• Sierra Space and major aerospace presence in Colorado</li>
                <li>• Growing commercial space industry</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Clean Energy & Quantum
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li>• NREL in Golden leads renewable energy research</li>
                <li>• NIST and JILA drive quantum computing development</li>
                <li>• Grid modernization and energy tech innovation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧬</span> Biotech & Life Sciences
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Fitzsimons campus biotech hub near Aurora</li>
                <li>• CU Boulder and Colorado State research partnerships</li>
                <li>• Growing pharmaceutical and medical device sector</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Research Hubs Section */}
      <section className="relative z-10 py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 text-center">Research Hubs Driving Innovation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {RESEARCH_HUBS.map((hub, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{hub.name}</h3>
                <p className="text-slate-600 text-sm">{hub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Articles Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 text-center">Featured Coverage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.slice(0, 3).map((article, index) => (
              <div key={index} className="bg-slate-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4">
                  <span className="text-xs text-blue-600 font-semibold">{article.category}</span>
                  <h3 className="font-bold text-slate-900 mt-2">{article.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Target Audience */}
      <section className="relative z-10 py-20 bg-blue-600 border-t border-blue-500">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Built for Decision-Makers</h2>
          <p className="text-blue-100 mb-8">
            Colorado BizTech delivers intelligence—not just news—for investors tracking deal flow, executives navigating regulations, and professionals advising on high tech transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={handleGetReport}
            >
              Get the BizTech 100 Report
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-blue-700"
              onClick={() => setLocation('/subscribe')}
              data-testid="button-become-sponsor"
            >
              Become a Sponsor
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <Dialog open={showModal} onOpenChange={(open) => !open && resetModal()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isRegistered ? 'Your Reports' : 'Get the BizTech 100 Report'}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              {isRegistered ? 'Download both PDFs instantly' : 'Quick registration - 30 seconds'}
            </DialogDescription>
          </DialogHeader>

          {!isRegistered ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">First Name *</label>
                  <Input 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Last Name *</label>
                  <Input 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleInputChange}
                    placeholder="Smith"
                    required
                    data-testid="input-last-name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Email Address *</label>
                <Input 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Company *</label>
                <Input 
                  name="company" 
                  value={formData.company} 
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  required
                  data-testid="input-company"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting} data-testid="button-submit-registration">
                {isSubmitting ? 'Registering...' : 'Get Reports Now'} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-600 mb-6">
                Thanks for registering, <strong>{formData.firstName}</strong>!
              </p>
              <div className="space-y-3">
                <a 
                  href="/downloads/biztech100-full-report.pdf" 
                  download="BizTech100-Full-Report.pdf"
                  className="block"
                  onClick={async () => {
                    const regId = localStorage.getItem('last_registration_id');
                    if (regId) {
                      await fetch('/api/track-download', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ registrationId: parseInt(regId), reportType: 'full_report' })
                      });
                    }
                  }}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-download-report">
                    <FileText className="mr-2 w-4 h-4" /> Download Full Report (PDF - 37 Pages)
                  </Button>
                </a>
                <a 
                  href="/downloads/biztech100-executive-summary.pdf" 
                  download="BizTech100-Executive-Summary.pdf"
                  className="block"
                  onClick={async () => {
                    const regId = localStorage.getItem('last_registration_id');
                    if (regId) {
                      await fetch('/api/track-download', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ registrationId: parseInt(regId), reportType: 'executive_summary' })
                      });
                    }
                  }}
                >
                  <Button variant="outline" className="w-full" data-testid="button-download-summary">
                    Download Executive Summary (5 Pages)
                  </Button>
                </a>
                <Button variant="ghost" className="w-full text-slate-600" onClick={() => resetModal()} data-testid="button-continue-exploring">
                  Continue Exploring
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1 mt-4">
            <Lock size={12} /> Your information is secure and will never be shared
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
