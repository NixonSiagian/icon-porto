/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface SkillNode {
  name: string;
  level: number;
  details: string;
  projects?: string[];
}

export interface SkillBranch {
  category: string;
  skills: SkillNode[];
}

export interface GitHubStats {
  user: {
    login: string;
    avatarUrl: string;
    bio: string;
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
  };
  repos: Array<{
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
    updatedAt: string;
  }>;
  languages: Record<string, number>;
  contributions: {
    total: number;
    weeks: Array<{
      days: Array<{
        count: number;
        level: number;
        date: string;
      }>;
    }>;
  };
  activity: {
    recentEvents: number;
    lastUpdated: string;
  };
  debug?: {
    hasToken: boolean;
    tokenPreview: string;
    responseTime: string;
    nodeEnv: string;
    apiEndpoint: string;
    tokenLoaded: boolean;
    apiConnected: boolean;
    repoCount: number;
    lastUpdated: string;
  };
}
