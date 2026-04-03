
import React, { useState } from 'react';
import { ClipboardList, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SurveyPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    role: '',
    topTopics: [] as string[],
    events: '',
    feedback: '',
  });

  const TOPIC_OPTIONS = [
    'AI Regulation & Policy',
    'Venture Funding Trends',
    'Quantum Computing',
    'Space & Aerospace',
    'Biotech & Life Sciences',
    'Clean Energy',
    'Workforce Development',
    'Defense Tech & Contracts',
  ];

  const handleTopicToggle = (topic: string) => {
    setForm(prev => ({
      ...prev,
      topTopics: prev.topTopics.includes(topic)
        ? prev.topTopics.filter(t => t !== topic)
        : [...prev.topTopics, topic]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          primaryRole: form.role,
          featuresValued: form.topTopics.join(', '),
          jobsBoardInterest: form.events,
          additionalFeedback: form.feedback,
          notifyEmail: form.email,
        }),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitted(true);
      toast({
        title: "Survey submitted!",
        description: "Thank you for your feedback. It helps shape our content priorities.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-12 relative z-10 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center py-20">
            <CheckCircle className="mx-auto text-emerald-400 mb-6" size={64} />
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">
              Thank You!
            </h1>
            <p className="text-slate-600 mb-8">
              Your feedback is invaluable. We'll use it to prioritize the content and features that matter most to Colorado's tech community.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-500"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ClipboardList className="text-blue-600" size={28} />
            <h1 className="text-4xl font-display font-bold text-slate-900">
              Community Survey
            </h1>
          </div>
          <p className="text-xl text-slate-600">
            Help us shape Colorado BizTech. Your input drives our content priorities.
          </p>
        </div>

        {/* Survey Form */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Label htmlFor="email" className="text-slate-900 font-medium mb-3 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                required
                data-testid="input-survey-email"
              />
            </div>

            {/* Role */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Label className="text-slate-900 font-medium mb-3 block">
                What best describes you?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {['Founder/Startup', 'Investor/VC', 'Corporate Executive', 'Researcher/Academic', 'Legal/Professional Services', 'Government/Policy', 'Employee', 'Other'].map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      form.role === role
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    data-testid={`button-role-${role.toLowerCase().replace(/[^a-z]/g, '-')}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Topics */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Label className="text-slate-900 font-medium mb-1 block">
                Which topics interest you most?
              </Label>
              <p className="text-slate-500 text-sm mb-4">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {TOPIC_OPTIONS.map(topic => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleTopicToggle(topic)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      form.topTopics.includes(topic)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    data-testid={`button-topic-${topic.toLowerCase().replace(/[^a-z]/g, '-')}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Interest */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Label className="text-slate-900 font-medium mb-3 block">
                Would you attend in-person events?
              </Label>
              <div className="flex gap-3">
                {['Yes, definitely', 'Maybe', 'Prefer virtual', 'Not interested'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setForm({ ...form, events: option })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 ${
                      form.events === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    data-testid={`button-events-${option.toLowerCase().replace(/[^a-z]/g, '-')}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Open Feedback */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Label htmlFor="feedback" className="text-slate-900 font-medium mb-3 block">
                What else should Colorado BizTech cover?
              </Label>
              <textarea
                id="feedback"
                placeholder="Share your ideas..."
                value={form.feedback}
                onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                className="w-full h-24 rounded-md bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                data-testid="textarea-feedback"
              />
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg"
              disabled={submitting || !form.email || !form.role}
              data-testid="button-submit-survey"
            >
              {submitting ? 'Submitting...' : (
                <>
                  <Send className="mr-2" size={18} />
                  Submit Survey
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
