export async function subscribeToNewsletter(email: string) {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to subscribe');
  }

  return response.json();
}

export async function submitContactInquiry(data: {
  name: string;
  email: string;
  company?: string;
  interest: string;
  comments?: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit inquiry');
  }

  return response.json();
}

export async function registerForReport(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  website?: string;
  role: string;
  interest: string;
  tier?: string;
  newsletter?: boolean;
}) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.details || 'Failed to register');
  }

  return response.json();
}

export async function trackDownload(registrationId: number, reportType: 'executive_summary' | 'full_report') {
  const response = await fetch('/api/track-download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ registrationId, reportType }),
  });

  if (!response.ok) {
    console.error('Failed to track download');
  }

  return response.json();
}
