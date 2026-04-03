import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SurveyResponse {
  id: number;
  email: string;
  primaryRole: string;
  featuresValued: string;
  jobsBoardInterest: string;
  additionalFeedback: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { toast } = useToast();
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await fetch('/api/survey/responses');
      if (!response.ok) throw new Error('Failed to fetch surveys');
      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to load surveys',
        description: 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (surveys.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No data to export',
        description: 'No survey responses available',
      });
      return;
    }

    const headers = ['Email', 'Role', 'Topics Interested', 'Events Interest', 'Feedback', 'Submitted'];
    const rows = surveys.map(s => [
      s.email,
      s.primaryRole,
      s.featuresValued || 'Not specified',
      s.jobsBoardInterest || 'Not specified',
      (s.additionalFeedback || 'No feedback').replace(/"/g, '""'),
      new Date(s.createdAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biztech-survey-responses-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast({
      title: 'Exported successfully',
      description: `${surveys.length} survey responses exported to CSV`,
    });
  };

  if (loading) {
    return (
      <div className="pt-24 pb-12 relative z-10 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading survey data...</p>
          </div>
        </div>
      </div>
    );
  }

  const roleStats = surveys.reduce((acc, s) => {
    acc[s.primaryRole] = (acc[s.primaryRole] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topicStats = surveys.reduce((acc, s) => {
    if (s.featuresValued) {
      s.featuresValued.split(', ').forEach(topic => {
        acc[topic] = (acc[topic] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedTopics = Object.entries(topicStats).sort((a, b) => b[1] - a[1]);

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-blue-600" size={32} />
            <h1 className="text-4xl font-display font-bold text-slate-900">
              Survey Dashboard
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl">
            Community feedback analytics for Colorado BizTech
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Responses</p>
                <p className="text-4xl font-bold text-slate-900 mt-2">{surveys.length}</p>
              </div>
              <MessageSquare className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Unique Roles</p>
                <p className="text-4xl font-bold text-slate-900 mt-2">{Object.keys(roleStats).length}</p>
              </div>
              <Users className="text-emerald-600" size={32} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Top Topic</p>
                <p className="text-lg font-bold text-slate-900 mt-2 truncate">
                  {sortedTopics[0]?.[0] || 'N/A'}
                </p>
                <p className="text-sm text-slate-500">
                  {sortedTopics[0]?.[1] || 0} mentions
                </p>
              </div>
              <TrendingUp className="text-amber-600" size={32} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <Button
              onClick={exportToCSV}
              className="w-full bg-blue-600 hover:bg-blue-700"
              data-testid="button-export-csv"
            >
              <Download className="mr-2 w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Role Distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Respondent Roles</h2>
          <div className="space-y-4">
            {Object.entries(roleStats)
              .sort((a, b) => b[1] - a[1])
              .map(([role, count]) => {
                const percentage = Math.round((count / surveys.length) * 100);
                return (
                  <div key={role}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-700">{role}</span>
                      <span className="text-sm text-slate-500">{count} responses ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Topic Interest */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Topics of Interest</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sortedTopics.map(([topic, count]) => (
              <div key={topic} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-700">{topic}</span>
                <span className="text-lg font-bold text-blue-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Responses */}
        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Responses</h2>
          <div className="space-y-4">
            {surveys.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No survey responses yet</p>
            ) : (
              surveys.slice(0, 10).map((survey) => (
                <div
                  key={survey.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === survey.id ? null : survey.id)
                  }
                  data-testid={`card-survey-${survey.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{survey.email}</p>
                      <p className="text-sm text-slate-500">
                        {survey.primaryRole} • {new Date(survey.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {survey.featuresValued ? survey.featuresValued.split(', ').length : 0} topics
                      </span>
                    </div>
                  </div>

                  {expandedId === survey.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                      {survey.featuresValued && (
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">TOPICS INTERESTED</p>
                          <p className="text-sm text-slate-700 mt-1">{survey.featuresValued}</p>
                        </div>
                      )}
                      {survey.jobsBoardInterest && (
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">EVENTS INTEREST</p>
                          <p className="text-sm text-slate-700 mt-1">{survey.jobsBoardInterest}</p>
                        </div>
                      )}
                      {survey.additionalFeedback && (
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">FEEDBACK</p>
                          <p className="text-sm text-slate-700 mt-1">{survey.additionalFeedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
