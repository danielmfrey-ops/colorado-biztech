
import React from 'react';
import { RESEARCH_HUBS } from '@/lib/data';

export default function ResearchPage() {
  return (
    <div className="pt-24 pb-12 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Research & Innovation</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The Front Range ecosystem is unique because of its density of research universities and federal laboratories.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {RESEARCH_HUBS.map(hub => (
            <div key={hub.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-display font-bold text-white">{hub.name}</h3>
                  <span className="text-slate-500 text-sm">{hub.location}</span>
                </div>
                <div className="md:w-2/3">
                  <p className="text-slate-400 mb-4">{hub.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {hub.focus.map(f => (
                      <span key={f} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
