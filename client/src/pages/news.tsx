
import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, TrendingUp, Search, BarChart3, Target, Building2, Layers, DollarSign, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/lib/api';
import { NEWS_ARTICLES } from '@/lib/data';

export default function NewsPage() {
  const { toast } = useToast();
  const [subscribing, setSubscribing] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      await subscribeToNewsletter(email);
      toast({
        title: "Success!",
        description: "You're now subscribed to the weekly newsletter!",
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

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="text-blue-600" size={28} />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
              News & Analysis
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl">
            Deep dives, market analysis, and key findings from the BizTech 100 Colorado Rankings.
          </p>
        </div>

        {/* Breaking News / Featured Article */}
        {NEWS_ARTICLES.filter(a => a.featured).map(article => (
          <div key={article.id} className="mb-10 bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-8 text-white shadow-xl" data-testid="featured-article">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-yellow-400" size={20} />
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Breaking News</span>
              <span className="text-red-200 text-sm ml-2">{article.date}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{article.title}</h2>
            <p className="text-red-100 text-lg leading-relaxed mb-6 max-w-3xl">
              {article.excerpt}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={article.pdfUrl} 
                download
                className="inline-flex items-center justify-center gap-2 bg-white text-red-900 font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
                data-testid="button-download-article"
              >
                <FileText size={18} />
                Read Full Article (PDF)
              </a>
              <div className="flex items-center gap-3 text-red-200 text-sm">
                <span>By {article.author}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            
            {/* Key Findings Section */}
            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                <BarChart3 className="text-blue-600" size={24} />
                Key Findings from the 2026 BizTech 100
              </h2>
              
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Scale</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The top 100 tech companies employ approximately <strong>~34,750 high-tech workers</strong> in Colorado, underscoring the tech sector's significant scale. The Top 10 alone account for ~16,300 of these tech jobs (47% of the total), led by Lockheed Martin's ~3,500 engineers statewide.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Growth</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Colorado's tech leaders are growing <strong>~20% annually on average</strong> – far above the ~7–9% national tech industry growth rate. Seven companies qualify as Hypergrowth (≥40% CAGR): <strong>Boom Supersonic</strong>, Quantum Metric, Project Canary, Palantir Technologies, Pax8, Pie Insurance, and AMP Robotics. This outsized growth highlights Colorado's momentum in areas like aerospace manufacturing, cloud software, AI, cleantech, biotech, and robotics.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Headquarters vs. Hubs</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      <strong>61 of the 100 companies are headquartered in Colorado</strong>, reflecting a homegrown ecosystem, not merely satellite offices. The remaining 39 firms operate major engineering hubs (e.g. Amazon, Google, Microsoft, Oracle, Raytheon) – confirming Colorado's ability to attract and retain mission-critical technical operations.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <Layers className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Sector Diversity</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The 2026 list spans <strong>13 technology sectors</strong>, led by Software & SaaS (24 companies), Aerospace & Defense (7), Cloud Infrastructure (6), Cybersecurity (5), Fintech (5), Healthtech (5), and Edtech (5). Emerging sectors like Cleantech, AI, Quantum Computing, and Robotics are also represented, indicating a well-rounded ecosystem.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                    <DollarSign className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Capital & Valuation</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Colorado's top tech companies contribute an estimated <strong>$500–700 billion in combined value</strong> based on their Colorado operations. This includes several unicorns and giants – notably <strong>Palantir Technologies (Denver HQ, ~$430B market cap)</strong>, as well as high-valued private firms like Guild Education (~$4.4B valuation), Quantum Metric (~$1B+), Boom Supersonic ($3–5B est.), and Quantinuum (~$10B). The substantial capital presence underscores the state's growing tech significance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2026 Outlook Section */}
            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                <TrendingUp className="text-blue-600" size={24} />
                2026 Outlook: Trends, Challenges & Opportunities
              </h2>
              
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-3">Growth Drivers</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Looking ahead, <strong>AI is poised to drive another 15–20% annual growth</strong> in Colorado's tech sector. Companies like Crusoe Energy and CoreWeave are scaling massive data centers along the Front Range to support AI workloads. <strong>Aerospace manufacturing is surging</strong>: Boom Supersonic and Sierra Space are transitioning from design to production, which will create waves of new high-tech jobs in Colorado's aerospace corridor. We also anticipate continued consolidation in challenged segments like telecommunications and fintech, potentially reshaping competitive dynamics.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 mb-3">Challenges</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    There are challenges on the horizon: <strong>talent competition remains fierce</strong> (especially with remote work allowing coastal firms to draw Colorado's engineers), and 2025 saw major layoffs at companies like Amazon, Microsoft, Oracle, Raytheon, and Dish that tempered growth. <strong>Local venture capital also remains limited</strong> compared to coastal tech hubs. However, Colorado's advantages – a high quality of life that attracts talent, a strong pipeline of graduates from CU Boulder, CSU, Mines, and DU, plus deep federal lab relationships – position the state well for sustained growth.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 mb-3">Looking Forward</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The BizTech 100 will be updated quarterly, with the next refresh coming in <strong>Q2 2026</strong>. We expect to see continued momentum in AI infrastructure, space commercialization, and quantum computing – sectors where Colorado has genuine competitive advantages.
                  </p>
                </div>
              </div>
            </section>

            {/* Recent Articles */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Articles</h2>
              
              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
                {NEWS_ARTICLES.filter(a => !a.featured).map(article => (
                  <a 
                    key={article.id}
                    href={article.pdfUrl || '#'}
                    download={article.pdfUrl ? true : undefined}
                    className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer block"
                    data-testid={`article-item-${article.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          article.category === 'Energy' ? 'bg-amber-100 text-amber-700' :
                          article.category === 'Quantum' ? 'bg-indigo-100 text-indigo-700' :
                          article.category === 'Space' ? 'bg-blue-100 text-blue-700' :
                          article.category === 'Biotech' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>{article.category}</span>
                        <span className="text-xs text-slate-500">{article.date}</span>
                      </div>
                      <h4 className="font-medium text-slate-900">{article.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{article.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span>By {article.author}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                        {article.pdfUrl && <span className="text-blue-600 font-medium">PDF Available</span>}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 mt-1" />
                  </a>
                ))}
              </div>
            </section>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Sector Coverage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Software & SaaS</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">23 companies</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Aerospace & Defense</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">7 companies</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Cloud Infrastructure</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">6 companies</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Cybersecurity</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">4 companies</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Fintech & Payments</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">5 companies</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Get the Full Report</h3>
              <p className="text-slate-600 text-sm mb-4">
                Access complete rankings, company profiles, and sector analysis.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = '/subscribe'}
                data-testid="button-get-report"
              >
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
