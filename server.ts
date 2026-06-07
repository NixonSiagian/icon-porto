import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const GITHUB_USERNAME = 'nixonsiagian';

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Proxy for GitHub Stats
  app.get('/api/github-stats', async (req, res) => {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ais-portfolio-app'
      };
      
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        console.log('GitHub Token: Detected');
      } else {
        console.warn('GitHub Token: Missing');
      }
      
      const [userRes, reposRes, eventsRes, contributionsRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
        axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers }),
        axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, { headers }),
        axios.get(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`).catch(err => {
          console.error('Contributions API Error:', err.message);
          return { data: { total: 0, contributions: [] } };
        })
      ]);

      const languages: Record<string, number> = {};
      const repos = (reposRes.data || []).map((repo: any) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
        return {
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          url: repo.html_url,
          updatedAt: repo.updated_at
        };
      });

      // Simple activity metric: count events in last 30 days
      const thirtyDaysAgos = new Date();
      thirtyDaysAgos.setDate(thirtyDaysAgos.getDate() - 30);
      const recentEvents = (eventsRes.data || []).filter((e: any) => new Date(e.created_at) > thirtyDaysAgos);

      // Transform flat contributions array into nested weeks for the UI
      const allDays = contributionsRes.data.contributions || [];
      const weeks: any[] = [];
      for (let i = 0; i < allDays.length; i += 7) {
        weeks.push({ days: allDays.slice(i, i + 7) });
      }

      const totalContributions = contributionsRes.data.total 
        ? Object.values(contributionsRes.data.total).reduce((a: any, b: any) => a + b, 0)
        : 0;

      const stats = {
        debug: {
          tokenLoaded: !!process.env.GITHUB_TOKEN,
          apiConnected: true,
          repoCount: repos.length,
          contributionCount: allDays.length,
          lastUpdated: new Date().toISOString()
        },
        user: {
          login: userRes.data.login,
          avatarUrl: userRes.data.avatar_url,
          bio: userRes.data.bio,
          publicRepos: userRes.data.public_repos,
          followers: userRes.data.followers,
          following: userRes.data.following,
          createdAt: userRes.data.created_at
        },
        repos: repos.slice(0, 20),
        languages,
        contributions: {
          total: totalContributions,
          weeks: weeks.slice(-24) 
        },
        activity: {
          recentEvents: recentEvents.length,
          lastUpdated: repos[0]?.updatedAt
        }
      };

      res.json(stats);
    } catch (error: any) {
      console.error('GitHub API Fatal Error:', error.response?.data || error.message);
      res.status(500).json({ 
        error: 'Failed to fetch GitHub data',
        details: error.response?.data || error.message,
        debug: {
          tokenLoaded: !!process.env.GITHUB_TOKEN,
          apiConnected: false
        }
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
