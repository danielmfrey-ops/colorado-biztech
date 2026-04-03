
import { getUncachableGitHubClient } from './github-client';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function getProjectFiles() {
  // Get all files excluding node_modules and other common ignores
  const files = await glob('**/*', { 
    nodir: true, 
    ignore: ['node_modules/**', 'dist/**', '.replit/**', '.upm/**', 'replit.nix'] 
  });
  return files;
}

export async function backupToGitHub(repoName: string) {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // 1. Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    const owner = user.login;

    // 2. Try to find or create repo
    let repo;
    try {
      const { data } = await octokit.repos.get({ owner, repo: repoName });
      repo = data;
    } catch (e) {
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: true,
        auto_init: true
      });
      repo = data;
    }

    const files = await getProjectFiles();
    
    // For a real backup, we'd use the git data API to create a tree
    // For this simple script, we'll just create/update individual files
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'base64');
      const message = `Backup: ${filePath}`;
      
      try {
        // Check if file exists to get its SHA
        let sha;
        try {
          const { data } = await octokit.repos.getContent({
            owner,
            repo: repoName,
            path: filePath
          });
          if (!Array.isArray(data)) {
            sha = data.sha;
          }
        } catch (e) {}

        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo: repoName,
          path: filePath,
          message,
          content,
          sha
        });
      } catch (err) {
        console.error(`Failed to backup ${filePath}:`, err);
      }
    }

    return { success: true, repoUrl: repo.html_url };
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}
