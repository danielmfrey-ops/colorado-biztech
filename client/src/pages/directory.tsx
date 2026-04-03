
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Building2, MapPin, DollarSign, Users, ExternalLink, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Company {
  id: number;
  name: string;
  description: string | null;
  sector: string;
  city: string;
  website: string | null;
  fundingStage: string | null;
  fundingAmount: string | null;
  employeeCount: string | null;
  founded: number | null;
}

async function fetchCompanies(search: string, sector: string, city: string): Promise<Company[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (sector && sector !== 'all') params.append('sector', sector);
  if (city && city !== 'all') params.append('city', city);
  
  const response = await fetch(`/api/companies?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch companies');
  return response.json();
}

const SECTORS = ['all', 'AI', 'Space', 'Quantum', 'Biotech', 'Energy'];
const CITIES = ['all', 'Boulder', 'Denver', 'Colorado Springs', 'Louisville', 'Westminster', 'Littleton', 'Fort Collins'];

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('all');
  const [city, setCity] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['companies', debouncedSearch, sector, city],
    queryFn: () => fetchCompanies(debouncedSearch, sector, city),
  });

  const sectorColors: Record<string, string> = {
    'AI': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Space': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Quantum': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    'Biotech': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Energy': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Colorado Tech Directory
          </h1>
          <p className="text-xl text-slate-600">
            Searchable database of {companies.length}+ technology companies in Colorado's high-growth sectors.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  placeholder="Search companies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                  data-testid="input-search"
                />
              </div>
            </div>
            <div>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full h-10 rounded-md bg-white border border-slate-300 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="select-sector"
              >
                {SECTORS.map(s => (
                  <option key={s} value={s}>{s === 'all' ? 'All Sectors' : s}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 rounded-md bg-white border border-slate-300 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="select-city"
              >
                {CITIES.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Cities' : c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-slate-600 text-sm">
          {isLoading ? 'Loading...' : `Showing ${companies.length} companies`}
          {(sector !== 'all' || city !== 'all' || debouncedSearch) && (
            <Button 
              variant="link" 
              className="text-blue-600 ml-2 p-0 h-auto"
              onClick={() => { setSearch(''); setSector('all'); setCity('all'); }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Company Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-slate-100 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
                <div className="h-16 bg-slate-100 rounded mb-4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No companies found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map(company => (
              <div
                key={company.id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors group"
                data-testid={`card-company-${company.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {company.name}
                  </h3>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-600 transition-colors"
                      data-testid={`link-website-${company.id}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded border ${sectorColors[company.sector] || 'bg-slate-100 text-slate-600 border-slate-300'}`}>
                    {company.sector}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <MapPin size={12} /> {company.city}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {company.description}
                </p>
                
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  {company.fundingStage && (
                    <span className="flex items-center gap-1">
                      <DollarSign size={12} /> {company.fundingStage}
                      {company.fundingAmount && company.fundingAmount !== 'N/A' && ` (${company.fundingAmount})`}
                    </span>
                  )}
                  {company.employeeCount && (
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {company.employeeCount}
                    </span>
                  )}
                  {company.founded && (
                    <span>Est. {company.founded}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-white border border-slate-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Want Full Database Access?</h3>
          <p className="text-slate-600 mb-4">
            BizTech Pro subscribers get access to the complete company and investor database with advanced filters and export.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-500"
            onClick={() => window.location.href = '/subscribe'}
          >
            Get Pro Access
          </Button>
        </div>
      </div>
    </div>
  );
}
