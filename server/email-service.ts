// Gmail integration - uses Replit's Google Mail connector
// See: https://developers.google.com/gmail

import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    console.warn('X_REPLIT_TOKEN not found for repl/depl - Gmail notifications disabled');
    return null;
  }

  try {
    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

    if (!connectionSettings || !accessToken) {
      console.warn('Gmail not connected - notifications disabled');
      return null;
    }
    return accessToken;
  } catch (error) {
    console.warn('Failed to get Gmail access token:', error);
    return null;
  }
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error('Gmail not configured');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function sendSurveyNotification(
  recipientEmail: string,
  submitterEmail: string,
  submitterRole: string,
  topics: string,
  feedback: string
): Promise<boolean> {
  try {
    const gmail = await getUncachableGmailClient();
    
    const emailMessage = `
New Survey Submission

Submitter Email: ${submitterEmail}
Role: ${submitterRole}
Interested Topics: ${topics || 'Not specified'}

Feedback:
${feedback || 'No feedback provided'}

---
This survey helps shape Colorado BizTech's content priorities.
`;

    const message = Buffer.from(
      `To: ${recipientEmail}\r\n` +
      'Subject: New BizTech Survey Submission\r\n' +
      'Content-Type: text/plain; charset="UTF-8"\r\n' +
      '\r\n' +
      emailMessage
    ).toString('base64');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: message,
      },
    });

    console.log(`Survey notification sent to ${recipientEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send survey notification:', error);
    return false;
  }
}
