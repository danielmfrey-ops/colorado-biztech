
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, DollarSign, ExternalLink, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Deal {
  id: number;
  company: string;
  round: string;
  amount: string;
  leadInvestor: string | null;
  articleLink: string | null;
  dealDate: string | null;
  sector: string | null;
}

async function fetchDeals(search: string, round: string, sector: string): Promise<Deal[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (round && round !== 'all') params.append('round', round);
  if (sector && sector !== 'all') params.append('sector', sector);
  
  const response = await fetch(`/api/deals?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch deals');
  return response.json();
}

const ROUNDS = ['all', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Public', 'Acquisition'];
const SECTORS = ['all', 'AI', 'Space', 'Quantum', 'Biotech', 'Energy'];

export default function FundingPage() {
  const [search, setSearch] = useState('');
  const [round, setRound] = useState('all');
  const [sector, setSector] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: deals = [], isLoading } = useQuery({
    queryKey: ['deals', debouncedSearch, round, sector],
    queryFn: () => fetchDeals(debouncedSearch, round, sector),
  });

  const sectorColors: Record<string, string> = {
    'AI': 'bg-purple-500/20 text-purple-400',
    'Space': 'bg-blue-500/20 text-blue-400',
    'Quantum': 'bg-indigo-500/20 text-indigo-400',
    'Biotech': 'bg-emerald-500/20 text-emerald-400',
    'Energy': 'bg-amber-500/20 text-amber-400',
  };

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Deal Flow Database
          </h1>
          <p className="text-xl text-slate-600">
            Track funding rounds, exits, and investor activity in Colorado's high-growth tech sectors.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  placeholder="Search by company or investor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                  data-testid="input-search-deals"
                />
              </div>
            </div>
            <div>
              <select
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className="w-full h-10 rounded-md bg-white border border-slate-300 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="select-round"
              >
                {ROUNDS.map(r => (
                  <option key={r} value={r}>{r === 'all' ? 'All Rounds' : r}</option>
                ))}
              </select>
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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-slate-600 text-sm">
          {isLoading ? 'Loading...' : `Showing ${deals.length} deals`}
          {(round !== 'all' || sector !== 'all' || debouncedSearch) && (
            <Button 
              variant="link" 
              className="text-blue-600 ml-2 p-0 h-auto"
              onClick={() => { setSearch(''); setRound('all'); setSector('all'); }}
              data-testid="button-clear-filters"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Deals Table */}
        {isLoading ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="animate-pulse p-6 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-12 bg-slate-100 rounded"></div>
              ))}
            </div>
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
            <DollarSign className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No deals found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium">Company</th>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium">Round</th>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium">Amount</th>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Lead Investor</th>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium hidden lg:table-cell">Sector</th>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium">Date</th>
                    <th className="px-6 py-4 text-left text-slate-600 text-xs uppercase tracking-wider font-medium w-16">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {deals.map(deal => (
                    <tr 
                      key={deal.id} 
                      className="hover:bg-slate-50 transition-colors"
                      data-testid={`row-deal-${deal.id}`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900">{deal.company}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-700">{deal.round}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-emerald-400 font-mono font-medium">{deal.amount}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-slate-600">{deal.leadInvestor || '—'}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {deal.sector && (
                          <span className={`text-xs px-2 py-1 rounded ${sectorColors[deal.sector] || 'bg-slate-100 text-slate-600'}`}>
                            {deal.sector}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 text-sm">{deal.dealDate || '—'}</span>
                      </td>
                      <td className="px-6 py-4">
                        {deal.articleLink ? (
                          <a
                            href={deal.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-500 transition-colors"
                            data-testid={`link-article-${deal.id}`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-white border border-slate-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Want Complete Deal Data?</h3>
          <p className="text-slate-600 mb-4">
            BizTech Pro subscribers get access to the full funding database with advanced export and analysis tools.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-500"
            onClick={() => window.location.href = '/subscribe'}
            data-testid="button-get-pro"
          >
            Get Pro Access
          </Button>
        </div>
      </div>
    </div>
  );
}
