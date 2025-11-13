// API utility functions for the training platform

export interface User {
  id: string;
  username: string;
  email?: string | null;
  totalXp: number;
  completionPercentage: number;
  onboardingCompleted: boolean;
  experienceLevel?: string | null;
  learningStyle?: string | null;
  role?: string | null;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  xpReward: number;
  prerequisites?: string[];
  content: any;
  quizQuestions: any;
  order: number;
}

export interface UserModuleProgress {
  id: string;
  userId: string;
  moduleId: string;
  status: string;
  progress: number;
  quizScore?: number | null;
  quizAttempts: number;
  timeSpent: number;
}

export interface Simulation {
  id: string;
  title: string;
  difficulty: string;
  scenario: string;
  customerPersona: any;
  expectedOutcomes: any;
  keywords: any;
}

export interface SimulationResult {
  id: string;
  userId: string;
  simulationId: string;
  conversationLog: any;
  score: number;
  sentimentScore: number;
  responseTime: number;
  handleTime: number;
  feedback: any;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  criteria: any;
  unlocked?: boolean;
  unlockedAt?: Date;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  keywords: string[];
  viewCount: number;
}

// Temporary in-memory user storage (replace with real auth later)
let currentUser: User | null = null;

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser;
  
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  
  return null;
}

export function setCurrentUser(user: User | null) {
  currentUser = user;
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
}

// Seed database on app init (idempotent - backend checks if already seeded)
export async function initializeApp() {
  // Removed - seeding now happens automatically on server start
  // This prevents duplicate seeding on every page load
}

// Auth API
export async function register(username: string, password: string, email: string) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  const data = await response.json();
  return data.user;
}

export async function login(username: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  const data = await response.json();
  setCurrentUser(data.user);
  return data.user;
}

// Onboarding API
export async function completeOnboarding(userId: string, experienceLevel: string, learningStyle: string, role: string) {
  const response = await fetch('/api/onboarding/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, experienceLevel, learningStyle, role })
  });
  
  const data = await response.json();
  return data;
}

// Training modules API
export async function getModules(): Promise<TrainingModule[]> {
  const response = await fetch('/api/modules');
  const data = await response.json();
  return data.modules;
}

export async function getModule(moduleId: string): Promise<TrainingModule> {
  const response = await fetch(`/api/modules/${moduleId}`);
  const data = await response.json();
  return data.module;
}

export async function getUserProgress(userId: string): Promise<UserModuleProgress[]> {
  const response = await fetch(`/api/users/${userId}/progress`);
  const data = await response.json();
  return data.progress;
}

export async function updateProgress(userId: string, moduleId: string, status: string, progress: number, quizScore?: number) {
  const response = await fetch(`/api/users/${userId}/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ moduleId, status, progress, quizScore })
  });
  
  const data = await response.json();
  return data;
}

// Simulations API
export async function getSimulations(difficulty?: string): Promise<Simulation[]> {
  const url = difficulty ? `/api/simulations?difficulty=${difficulty}` : '/api/simulations';
  const response = await fetch(url);
  const data = await response.json();
  return data.simulations;
}

export async function analyzeSimulationResponse(simulationId: string, userMessage: string, conversationHistory: any[]) {
  const response = await fetch('/api/simulations/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ simulationId, userMessage, conversationHistory })
  });
  
  const data = await response.json();
  return data;
}

export async function completeSimulation(userId: string, simulationId: string, conversationLog: any[], sentimentScore: number, avgResponseTime: number, handleTime: number) {
  const response = await fetch('/api/simulations/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, simulationId, conversationLog, sentimentScore, avgResponseTime, handleTime })
  });
  
  const data = await response.json();
  return data;
}

// Analytics API
export async function getUserAnalytics(userId: string) {
  const response = await fetch(`/api/users/${userId}/analytics`);
  const data = await response.json();
  return data;
}

export async function getLeaderboard() {
  const response = await fetch('/api/leaderboard');
  const data = await response.json();
  return data.leaderboard;
}

// Achievements API
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  const response = await fetch(`/api/users/${userId}/achievements`);
  const data = await response.json();
  return data.achievements;
}

// Knowledge base API
export async function searchKnowledge(query: string): Promise<KnowledgeArticle[]> {
  const response = await fetch(`/api/knowledge/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.articles;
}

export async function getArticle(articleId: string): Promise<KnowledgeArticle> {
  const response = await fetch(`/api/knowledge/${articleId}`);
  const data = await response.json();
  return data.article;
}

export async function getUser(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data.user;
}
