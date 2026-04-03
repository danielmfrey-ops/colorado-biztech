
import React from 'react';
import { Linkedin, Mail, FileText, Database, Users, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import danielPhoto from '@assets/image_1764953926156.png';

export default function Home() {
  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6">
            2026 INAUGURAL EDITION
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Colorado BizTech 100
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            The BizTech 100 ranks Colorado's top 100 high-tech companies based on high-tech employment, growth trajectory, capital strength, and financial stability. These companies represent the backbone of Colorado's innovation economy. This inaugural 2026 edition provides a data-driven view of where durable technology leadership exists in the state.
          </p>
          
          {/* Key Stats Bullet List */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto text-left">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>100 Companies Ranked</strong> (statewide)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>~34,750 High-Tech Employees</strong> across the Top 100</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>$500–700B Attributable Enterprise Value</strong> (Colorado operations)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>61%</strong> of the Top 100 are Colorado-Headquartered companies</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>~20% Average Tech Workforce Growth</strong> (3-year CAGR)</span>
              </li>
            </ul>
          </div>
          
          <p className="text-slate-600 mb-6">
            Explore the 2026 rankings and <a href="/subscribe" className="text-blue-600 hover:underline font-medium">download the full report</a> for in-depth analysis. Stay tuned for quarterly updates – our next ranking refresh comes in Q2 2026.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-8 py-6"
              onClick={() => window.location.href = '/biztech100'}
              data-testid="button-view-rankings"
            >
              View Rankings
            </Button>
            <Button 
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 text-lg px-8 py-6"
              onClick={() => window.location.href = '/subscribe'}
              data-testid="button-get-report"
            >
              Download Full Report
            </Button>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            To connect the people, data, and resources needed to build world-class 
            technology companies in Colorado—and to address the barriers holding back growth.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            We believe Colorado can rival any tech hub in the nation. But it requires 
            objective data, sustained focus, and collaboration across founders, investors, 
            employees, and policymakers.
          </p>
        </div>

        {/* What We Do */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-display font-bold text-slate-900 text-center mb-10">Our Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Report-First</h3>
              <p className="text-slate-500 text-sm">
                We start with comprehensive quarterly reports that create the proprietary dataset—not superficial daily news.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Data-Driven</h3>
              <p className="text-slate-500 text-sm">
                Every insight is backed by structured data. Search companies, funding rounds, and investors—not just read articles.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">For Decision-Makers</h3>
              <p className="text-slate-500 text-sm">
                Built for investors tracking deal flow, executives navigating regulation, and legal professionals advising on transactions.
              </p>
            </div>
          </div>
        </div>

        {/* 13 Technology Sectors */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-display font-bold text-slate-900 text-center mb-4">13 Technology Sectors in the BizTech 100</h2>
          <p className="text-slate-600 text-center mb-8">Diverse ecosystem spanning software to space</p>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-3"><span>💻</span> Software & SaaS <span className="text-blue-600 text-sm">(24)</span></li>
              <li className="flex items-center gap-3"><span>🚀</span> Aerospace & Defense <span className="text-blue-600 text-sm">(7)</span></li>
              <li className="flex items-center gap-3"><span>☁️</span> Cloud Infrastructure <span className="text-blue-600 text-sm">(6)</span></li>
              <li className="flex items-center gap-3"><span>🔒</span> Cybersecurity <span className="text-blue-600 text-sm">(5)</span></li>
              <li className="flex items-center gap-3"><span>💳</span> Fintech & Payments <span className="text-blue-600 text-sm">(5)</span></li>
            </ul>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-3"><span>🏥</span> Healthtech <span className="text-blue-600 text-sm">(5)</span></li>
              <li className="flex items-center gap-3"><span>🎓</span> Edtech <span className="text-blue-600 text-sm">(5)</span></li>
              <li className="flex items-center gap-3"><span>📊</span> Data Analytics <span className="text-blue-600 text-sm">(3)</span></li>
              <li className="flex items-center gap-3"><span>🌱</span> Cleantech & Energy <span className="text-blue-600 text-sm">(3)</span></li>
              <li className="flex items-center gap-3"><span>📡</span> Telecommunications <span className="text-blue-600 text-sm">(2)</span></li>
            </ul>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
              onClick={() => window.location.href = '/biztech100'}
              data-testid="button-view-all-sectors"
            >
              View Full Sector Analysis
            </Button>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-display font-bold text-slate-900 text-center mb-4">Roadmap</h2>
          <p className="text-slate-600 text-center mb-10">Our website will dramatically improve in Q1!</p>
          
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-lg">1</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">Foundation</h3>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">LIVE</span>
                </div>
                <p className="text-slate-500 text-sm">January 2026</p>
              </div>
            </div>
            
            <div className="space-y-3 pl-16">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-xs">✓</span>
                </div>
                <span className="text-slate-700">BizTech 100 Rankings - Colorado's top 100 tech companies</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-xs">✓</span>
                </div>
                <span className="text-slate-700">Industry Sector Analysis across 13 technology segments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-display font-bold text-slate-900 text-center mb-10">Meet the Founder</h2>
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Photo */}
              <div className="md:col-span-2 bg-slate-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-36 h-36 rounded-full mx-auto mb-4 border-2 border-slate-300 overflow-hidden">
                    <img 
                      src={danielPhoto} 
                      alt="Daniel Frey" 
                      className="w-full h-full object-cover object-top"
                      data-testid="img-founder-photo"
                    />
                  </div>
                  <h3 className="text-slate-900 font-display font-bold text-xl">Daniel Frey</h3>
                  <p className="text-slate-500 text-sm mt-1">Founder & Editor-in-Chief</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <a 
                      href="https://www.linkedin.com/in/daniel-frey-40457a10/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-600 transition-colors"
                      data-testid="link-linkedin"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href="https://x.com/ColoradoBizTech" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-400 transition-colors"
                      data-testid="link-twitter"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href="mailto:daniel@coloradobiztech.com" 
                      className="text-slate-500 hover:text-blue-600 transition-colors"
                      data-testid="link-email"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              <div className="md:col-span-3 p-8">
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Daniel Frey founded Colorado BizTech to fill a gap. We are at a critical time in the development of leading technology. Colorado's tech ecosystem needs better coverage and engagement along with focused, data-driven analysis. Traditional media was too broad to capture the nuance.
                  </p>
                  <p>
                    Dan is a Boulder-based entrepreneur with experience in energy, data, and technology. He's built and funded multiple businesses. Now he's helping build the essential intelligence platform for Colorado's deep tech community.
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {['Energy Transition', 'ESG Strategy', 'Clean Technology', 'Deep Tech', 'Venture Capital', 'AI Regulation'].map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-display font-bold text-slate-900 mb-3">Get in Touch</h3>
          <p className="text-slate-600 mb-6">
            Have a story tip, partnership inquiry, or just want to connect?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => window.location.href = '/subscribe'}
              data-testid="button-subscribe"
            >
              Join the Beta
            </Button>
            <Button 
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              onClick={() => window.location.href = 'mailto:daniel@coloradobiztech.com'}
              data-testid="button-contact"
            >
              <Mail className="mr-2" size={16} />
              Contact Us
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
