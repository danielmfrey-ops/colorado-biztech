
import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const phases = [
  {
    phase: 1,
    title: 'Foundation',
    status: 'LIVE',
    date: 'January 2026',
    items: [
      'BizTech 100 Rankings - Colorado\'s top 100 tech companies',
      'Industry Sector Analysis across 13 technology segments',
      'Weekly Newsletter with curated insights',
      'Community Survey for content priorities'
    ]
  },
  {
    phase: 2,
    title: 'Capital & Growth',
    status: 'IN DEVELOPMENT',
    date: 'Q1-Q2 2026',
    items: [
      'VC & PE Activity Tracker - Real-time deal flow',
      'Colorado Business Environment Scorecard',
      'Growth Barriers Report with peer-state benchmarks',
      'Investor Directory with focus areas and recent deals'
    ]
  },
  {
    phase: 3,
    title: 'Founder Insights',
    status: 'PLANNED',
    date: 'Q3-Q4 2026',
    items: [
      'Podcast Series - Interviews with Colorado tech leaders',
      'Company Spotlight Features',
      'Executive Profile Database',
      'Funder Views: VC, PE, and Family Office Perspectives'
    ]
  },
  {
    phase: 4,
    title: 'Ecosystem Intelligence',
    status: 'PLANNED',
    date: '2027',
    items: [
      'AI-Powered Query System for database exploration',
      'Custom Benchmark Reports for enterprise clients',
      'Jobs Board for Colorado tech companies',
      'Annual State of Colorado Tech Conference'
    ]
  }
];

export default function RoadmapPage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-3">Our Vision</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Building Colorado's Premier<br/>Technology Intelligence Platform
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to supporting Colorado's tech ecosystem with objective data, 
            comprehensive analysis, and community-driven insights. Here's our roadmap.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {phases.map((phase) => (
            <div 
              key={phase.phase} 
              className={`bg-white rounded-xl shadow-md border-2 p-8 transition ${
                phase.status === 'LIVE' 
                  ? 'border-green-500' 
                  : phase.status === 'IN DEVELOPMENT'
                    ? 'border-blue-500'
                    : 'border-slate-200'
              }`}
              data-testid={`card-phase-${phase.phase}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-blue-600 font-bold text-lg">Phase {phase.phase}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      phase.status === 'LIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : phase.status === 'IN DEVELOPMENT'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {phase.title}
                  </h2>
                </div>
                <div className="text-slate-500 font-medium">
                  {phase.date}
                </div>
              </div>
              
              <ul className="grid md:grid-cols-2 gap-3">
                {phase.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`mr-3 mt-1 ${
                      phase.status === 'LIVE' 
                        ? 'text-green-600' 
                        : phase.status === 'IN DEVELOPMENT'
                          ? 'text-blue-600'
                          : 'text-slate-400'
                    }`}>
                      {phase.status === 'LIVE' ? '✓' : '○'}
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Help Shape Our Roadmap
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Your feedback directly influences our priorities. Take our 2-minute survey 
            to tell us what features and content matter most to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setLocation('/survey')}
              data-testid="button-take-survey"
            >
              Take Our Survey
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-blue-700"
              onClick={() => setLocation('/subscribe')}
              data-testid="button-subscribe"
            >
              Subscribe to Updates
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Our Commitment</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-bold text-slate-900 mb-1">Data Integrity</h4>
              <p className="text-slate-500 text-sm">Rigorous methodology with transparent sources</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-slate-900 mb-1">Editorial Independence</h4>
              <p className="text-slate-500 text-sm">No sponsorships influence our rankings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-bold text-slate-900 mb-1">Community-Driven</h4>
              <p className="text-slate-500 text-sm">Your input shapes our priorities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
