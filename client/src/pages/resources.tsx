
import React, { useState } from 'react';
import { Search, Building2, MapPin, DollarSign, Users, ExternalLink, Star, Hexagon, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BIZTECH_100_TOP_20 } from '@/lib/data';

const sectorColors: Record<string, string> = {
  'AI': 'bg-purple-100 text-purple-700 border-purple-200',
  'Software': 'bg-blue-100 text-blue-700 border-blue-200',
  'Fintech': 'bg-green-100 text-green-700 border-green-200',
  'EdTech': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Hardware': 'bg-slate-100 text-slate-700 border-slate-200',
  'Space': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Telecom': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Cybersecurity': 'bg-red-100 text-red-700 border-red-200',
  'Quantum': 'bg-violet-100 text-violet-700 border-violet-200',
};

function HQBadge({ type }: { type: string }) {
  if (type === 'hq') {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded border border-amber-200" title="Colorado Corporate Headquarters">
        <Star size={10} className="fill-amber-500" /> HQ
      </span>
    );
  }
  if (type === 'hub') {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200" title="Major Colorado Hub">
        <Hexagon size={10} /> Hub
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200" title="Colorado Operations">
      <Circle size={10} /> Ops
    </span>
  );
}

export default function ResourcesPage() {
  const [companySearch, setCompanySearch] = useState('');

  const top10Companies = BIZTECH_100_TOP_20.slice(0, 10);
  
  const filteredCompanies = top10Companies.filter(company => {
    const searchLower = companySearch.toLowerCase();
    return (
      company.name.toLowerCase().includes(searchLower) ||
      company.sector.toLowerCase().includes(searchLower) ||
      company.city.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Resources
          </h1>
          <p className="text-xl text-slate-600">
            Download the BizTech 100 report, explore methodology, and access the company directory.
          </p>
        </div>

        {/* Report Download */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg mb-2">Download the BizTech 100 Report (2026 Edition)</h3>
              <p className="text-slate-600 text-sm">
                Get the complete rankings, company profiles, sector analyses, and methodology in one comprehensive PDF.
              </p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
              onClick={() => window.location.href = '/subscribe'}
              data-testid="button-download-report"
            >
              Download Full Report
            </Button>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="mb-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Methodology (2026)</h3>
            <p className="text-slate-600 text-sm mb-4">
              The BizTech 100 uses a transparent 4-factor scoring system:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>High-Tech Employment</strong> (30% weight)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>Employment Growth</strong> (35% weight)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>Capital Strength</strong> (20% weight)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span><strong>Financial Stability</strong> (15% weight)</span>
              </li>
            </ul>
            <p className="text-slate-500 text-xs mt-4 italic">
              Companies are ranked by a composite index of these factors.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Inclusion Criteria</h3>
            <p className="text-slate-600 text-sm mb-4">
              Companies must meet the following requirements to be included:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mt-1.5"></span>
                <span><strong>100+ high-tech employees</strong> in Colorado</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mt-1.5"></span>
                <span>At least <strong>50% of workforce</strong> in technical roles</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mt-1.5"></span>
                <span>Either <strong>15%+ annual tech workforce growth</strong> (3-year CAGR) or <strong>1,000+ tech employees</strong> total</span>
              </li>
            </ul>

            <h4 className="font-bold text-slate-900 mt-6 mb-3">Data Sources</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              We compiled data from LinkedIn (Colorado employee counts), SEC filings (public financials and headcounts), Crunchbase/PitchBook (private funding and valuations), and industry reports (e.g., CTA's 2025 Colorado Tech report and CBRE's Tech Talent Report). We cross-verified important figures with multiple sources and company disclosures to ensure accuracy.
            </p>
          </div>
        </div>

        {/* Directory CTA */}
        <div className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-slate-900 mb-2">Want access to all 100 companies?</h3>
          <p className="text-slate-600 mb-4">
            Register for free to unlock the full BizTech 100 directory with detailed company profiles.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.location.href = '/biztech100'}
            data-testid="button-view-full-rankings"
          >
            View Full Rankings
          </Button>
        </div>

      </div>
    </div>
  );
}
