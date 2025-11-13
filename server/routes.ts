import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";
import { z } from "zod";

// Intelligent simulation engine - simulates AI responses without external API
class SimulationEngine {
  analyzeResponse(userMessage: string, simulation: any, conversationHistory: any[]): any {
    const keywords = simulation.keywords as any;
    const lowerMessage = userMessage.toLowerCase();
    
    // Sentiment analysis based on keywords
    let sentimentScore = 50; // neutral start
    
    // Check for positive keywords
    const positiveMatches = keywords.positive.filter((kw: string) => lowerMessage.includes(kw.toLowerCase()));
    sentimentScore += positiveMatches.length * 8;
    
    // Check for empathy keywords
    const empathyMatches = keywords.empathy.filter((kw: string) => lowerMessage.includes(kw.toLowerCase()));
    sentimentScore += empathyMatches.length * 12;
    
    // Check for negative keywords
    const negativeMatches = keywords.negative.filter((kw: string) => lowerMessage.includes(kw.toLowerCase()));
    sentimentScore -= negativeMatches.length * 10;
    
    // Cap sentiment score
    sentimentScore = Math.max(0, Math.min(100, sentimentScore));
    
    // Response time calculation (based on message length and complexity)
    const responseTime = Math.max(5, Math.min(45, userMessage.length / 10 + Math.random() * 10));
    
    // Generate contextual feedback
    const feedback = this.generateFeedback(userMessage, simulation, sentimentScore);
    
    // Generate AI customer response
    const aiResponse = this.generateCustomerResponse(userMessage, simulation, conversationHistory, sentimentScore);
    
    return {
      sentimentScore: Math.round(sentimentScore),
      responseTime: Math.round(responseTime),
      feedback,
      aiResponse
    };
  }
  
  private generateFeedback(message: string, simulation: any, sentimentScore: number): string[] {
    const feedback: string[] = [];
    const lowerMessage = message.toLowerCase();
    const expectedOutcomes = simulation.expectedOutcomes as any;
    
    // Check for good phrases
    const goodPhrasesUsed = expectedOutcomes.good_phrases.filter((phrase: string) => 
      lowerMessage.includes(phrase.toLowerCase())
    );
    
    if (goodPhrasesUsed.length > 0) {
      feedback.push(`Great use of empathetic language: "${goodPhrasesUsed[0]}"`);
    }
    
    // Check for phrases to avoid
    const badPhrasesUsed = expectedOutcomes.avoid_phrases.filter((phrase: string) => 
      lowerMessage.includes(phrase.toLowerCase())
    );
    
    if (badPhrasesUsed.length > 0) {
      feedback.push(`Avoid phrases like: "${badPhrasesUsed[0]}"`);
    }
    
    // Sentiment-based feedback
    if (sentimentScore < 50) {
      feedback.push("Try to show more empathy and understanding");
    } else if (sentimentScore > 80) {
      feedback.push("Excellent empathy and customer-focused language!");
    }
    
    // Message length feedback
    if (message.length < 20) {
      feedback.push("Provide more detailed responses to show thorough understanding");
    }
    
    if (feedback.length === 0) {
      feedback.push("Good response - continue showing empathy and clarity");
    }
    
    return feedback;
  }
  
  private generateCustomerResponse(message: string, simulation: any, history: any[], sentiment: number): string {
    const persona = simulation.customerPersona as any;
    const difficulty = simulation.difficulty;
    
    // Response templates based on difficulty and sentiment
    const responses: Record<string, string[]> = {
      beginner_positive: [
        "Thank you so much for your help! That makes sense now.",
        "Oh perfect, I'll try that right away. Thanks!",
        "Great, I appreciate your patience in explaining this."
      ],
      beginner_neutral: [
        "Okay, can you walk me through the next step?",
        "I see. What should I do after that?",
        "Got it. Is there anything else I need to know?"
      ],
      intermediate_positive: [
        "I appreciate you looking into this. What can we do to resolve it?",
        "Thank you for checking. Can you explain what happened?",
        "Okay, that helps. What are my options?"
      ],
      intermediate_neutral: [
        "I understand, but this is still frustrating. Can you help me fix it?",
        "Alright, but how does this prevent it from happening again?",
        "I see. Can I get some kind of compensation for this?"
      ],
      advanced_positive: [
        "Understood. What's your ETA on the fix?",
        "Alright, but I need regular updates. Can you commit to that?",
        "Fine. I'll need this documented and a prevention plan."
      ],
      advanced_neutral: [
        "This is affecting my business. What's your priority level on this?",
        "I need specifics, not general updates. Can you provide that?",
        "I've heard this before. What makes this time different?"
      ]
    };
    
    // Determine response category
    const sentimentCategory = sentiment > 70 ? 'positive' : 'neutral';
    const responseKey = `${difficulty}_${sentimentCategory}`;
    const responseOptions = responses[responseKey] || responses.beginner_neutral;
    
    // Return a random response from the appropriate category
    return responseOptions[Math.floor(Math.random() * responseOptions.length)];
  }
  
  calculateFinalScore(conversationLog: any[], sentimentScore: number, handleTime: number): number {
    // Score based on multiple factors
    let score = 60; // base score
    
    // Sentiment score contribution (40%)
    score += (sentimentScore - 50) * 0.4;
    
    // Response length quality (20%)
    const avgResponseLength = conversationLog
      .filter((msg: any) => msg.sender === 'user')
      .reduce((sum: number, msg: any) => sum + msg.text.length, 0) / 
      Math.max(1, conversationLog.filter((msg: any) => msg.sender === 'user').length);
    
    if (avgResponseLength > 50 && avgResponseLength < 200) {
      score += 20;
    } else if (avgResponseLength >= 30) {
      score += 10;
    }
    
    // Handle time contribution (20%)
    if (handleTime < 180) { // less than 3 minutes
      score += 20;
    } else if (handleTime < 300) { // less than 5 minutes
      score += 10;
    }
    
    // Number of exchanges (20%)
    const exchanges = Math.floor(conversationLog.length / 2);
    if (exchanges >= 3 && exchanges <= 6) {
      score += 20;
    } else if (exchanges >= 2) {
      score += 10;
    }
    
    return Math.round(Math.max(0, Math.min(100, score)));
  }
}

const simulationEngine = new SimulationEngine();

// Personalization engine - creates custom training paths
function generatePersonalizedPath(experienceLevel: string, learningStyle: string, role: string) {
  // Define module progression based on experience
  const pathsByExperience: Record<string, string[]> = {
    none: ['1', '2', '3', '4', '5', '6'], // All modules in order
    some: ['2', '3', '4', '5', '6'], // Skip intro
    experienced: ['3', '4', '5', '6'], // Skip basics
    expert: ['4', '5', '6'] // Advanced only
  };
  
  const recommendedModules = pathsByExperience[experienceLevel] || pathsByExperience.none;
  
  // Learning style affects content format preference
  const contentPreference = {
    visual: 'video',
    auditory: 'audio',
    kinesthetic: 'interactive'
  }[learningStyle] || 'text';
  
  // Role affects module prioritization
  const rolePriorities: Record<string, number[]> = {
    support: [1, 2, 3], // Prioritize communication and complaint handling
    technical: [2, 5], // Prioritize troubleshooting
    sales: [1, 3], // Prioritize communication and persuasion
    manager: [4, 6] // Prioritize conflict resolution and crisis management
  };
  
  return {
    recommendedModules,
    contentPreference,
    estimatedDays: Math.max(14, 30 - (4 - pathsByExperience[experienceLevel].length) * 3)
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed database on server start (only runs once due to idempotent check in seedDatabase)
  seedDatabase().catch(console.error);
  
  app.post("/api/seed", async (req: Request, res: Response) => {
    try {
      await seedDatabase();
      res.json({ message: "Database seeding attempted (idempotent)" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // User registration and profile
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, password, email } = req.body;
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser({ username, password, email });
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({ user: { id: user.id, username: user.username, totalXp: user.totalXp, completionPercentage: user.completionPercentage } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Onboarding
  app.post("/api/onboarding/complete", async (req: Request, res: Response) => {
    try {
      const { userId, experienceLevel, learningStyle, role } = req.body;
      
      // Generate personalized path
      const personalizedPath = generatePersonalizedPath(experienceLevel, learningStyle, role);
      
      // Update user profile
      await storage.updateUser(userId, {
        experienceLevel,
        learningStyle,
        role,
        onboardingCompleted: true
      });
      
      res.json({ 
        success: true,
        personalizedPath
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user profile
  app.get("/api/users/:userId", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Training modules
  app.get("/api/modules", async (req: Request, res: Response) => {
    try {
      const modules = await storage.getAllModules();
      res.json({ modules });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/api/modules/:moduleId", async (req: Request, res: Response) => {
    try {
      const module = await storage.getModule(req.params.moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      res.json({ module });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // User module progress
  app.get("/api/users/:userId/progress", async (req: Request, res: Response) => {
    try {
      const progress = await storage.getUserAllProgress(req.params.userId);
      res.json({ progress });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post("/api/users/:userId/progress", async (req: Request, res: Response) => {
    try {
      const { moduleId, status, progress, quizScore } = req.body;
      
      const moduleProgress = await storage.createOrUpdateProgress({
        userId: req.params.userId,
        moduleId,
        status,
        progress,
        quizScore,
        quizAttempts: 1,
        timeSpent: 0,
        startedAt: new Date(),
        completedAt: status === 'completed' ? new Date() : undefined
      });
      
      // Update user's overall progress
      const allProgress = await storage.getUserAllProgress(req.params.userId);
      const completedModules = allProgress.filter(p => p.status === 'completed').length;
      const allModules = await storage.getAllModules();
      const completionPercentage = Math.round((completedModules / allModules.length) * 100);
      
      // Calculate total XP earned
      const user = await storage.getUser(req.params.userId);
      let totalXp = user?.totalXp || 0;
      
      if (status === 'completed' && quizScore) {
        const module = await storage.getModule(moduleId);
        if (module && quizScore >= 70) {
          // Award XP based on quiz performance
          const xpEarned = Math.round(module.xpReward * (quizScore / 100));
          totalXp += xpEarned;
        }
      }
      
      await storage.updateUserProgress(req.params.userId, completionPercentage, totalXp);
      
      // Check for new achievements
      const newAchievements = await storage.checkAndUnlockAchievements(req.params.userId);
      
      res.json({ 
        progress: moduleProgress,
        newAchievements
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Simulations
  app.get("/api/simulations", async (req: Request, res: Response) => {
    try {
      const { difficulty } = req.query;
      
      let simulations;
      if (difficulty) {
        simulations = await storage.getSimulationsByDifficulty(difficulty as string);
      } else {
        simulations = await storage.getAllSimulations();
      }
      
      res.json({ simulations });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post("/api/simulations/analyze", async (req: Request, res: Response) => {
    try {
      const { simulationId, userMessage, conversationHistory } = req.body;
      
      const simulation = await storage.getSimulation(simulationId);
      if (!simulation) {
        return res.status(404).json({ error: "Simulation not found" });
      }
      
      const analysis = simulationEngine.analyzeResponse(userMessage, simulation, conversationHistory);
      
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post("/api/simulations/complete", async (req: Request, res: Response) => {
    try {
      const { userId, simulationId, conversationLog, sentimentScore, avgResponseTime, handleTime } = req.body;
      
      const simulation = await storage.getSimulation(simulationId);
      if (!simulation) {
        return res.status(404).json({ error: "Simulation not found" });
      }
      
      // Calculate final score
      const score = simulationEngine.calculateFinalScore(conversationLog, sentimentScore, handleTime);
      
      // Generate detailed feedback
      const feedback = {
        score,
        strengths: score > 80 ? ["Excellent empathy", "Clear communication", "Effective problem-solving"] : 
                   score > 60 ? ["Good communication", "Adequate problem-solving"] :
                   ["Responded to customer"],
        improvements: score < 70 ? ["Show more empathy", "Provide clearer steps", "Be more concise"] :
                      score < 90 ? ["Reduce response time", "Use more positive language"] :
                      ["Keep up the great work!"],
        recommendations: score < 70 ? 
          ["Review the LEAP framework module", "Practice active listening", "Focus on customer-first language"] :
          ["Consider advanced conflict resolution training", "Explore crisis management scenarios"]
      };
      
      // Save result
      const result = await storage.createSimulationResult({
        userId,
        simulationId,
        conversationLog,
        score,
        sentimentScore,
        responseTime: avgResponseTime,
        handleTime,
        feedback
      });
      
      // Update user XP
      const user = await storage.getUser(userId);
      const xpReward = Math.round(score / 2); // Up to 50 XP per simulation
      await storage.updateUser(userId, { totalXp: (user?.totalXp || 0) + xpReward });
      
      // Create performance metric
      await storage.createPerformanceMetric({
        userId,
        date: new Date(),
        accuracy: score,
        avgHandleTime: handleTime,
        learningVelocity: Math.min(100, score + 20), // Simplified calculation
        dailyXp: xpReward,
        simulationsCompleted: 1
      });
      
      // Check for achievements
      await storage.checkAndUnlockAchievements(userId);
      
      res.json({ result, xpReward });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Analytics
  app.get("/api/users/:userId/analytics", async (req: Request, res: Response) => {
    try {
      const metrics = await storage.getUserMetrics(req.params.userId, 7);
      const user = await storage.getUser(req.params.userId);
      const simulationResults = await storage.getRecentSimulationResults(req.params.userId, 10);
      
      // Calculate analytics
      const avgAccuracy = simulationResults.length > 0 
        ? Math.round(simulationResults.reduce((sum, r) => sum + r.score, 0) / simulationResults.length)
        : 0;
      
      const avgHandleTime = simulationResults.length > 0
        ? Math.round(simulationResults.reduce((sum, r) => sum + r.handleTime, 0) / simulationResults.length)
        : 0;
      
      // Predict readiness (simplified AI prediction)
      const completionPercentage = user?.completionPercentage || 0;
      const daysToReady = Math.max(0, Math.round((100 - completionPercentage) / 5));
      
      res.json({
        metrics,
        summary: {
          avgAccuracy,
          avgHandleTime,
          learningVelocity: user?.completionPercentage || 0,
          daysToReady,
          trend: avgAccuracy > 75 ? 'improving' : 'needs_focus'
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/api/leaderboard", async (req: Request, res: Response) => {
    try {
      const leaderboard = await storage.getLeaderboard(10);
      res.json({ leaderboard });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Achievements
  app.get("/api/achievements", async (req: Request, res: Response) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json({ achievements });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/api/users/:userId/achievements", async (req: Request, res: Response) => {
    try {
      const userAchievements = await storage.getUserAchievements(req.params.userId);
      const allAchievements = await storage.getAllAchievements();
      
      const achievementsWithStatus = allAchievements.map(achievement => ({
        ...achievement,
        unlocked: userAchievements.some(ua => ua.achievementId === achievement.id),
        unlockedAt: userAchievements.find(ua => ua.achievementId === achievement.id)?.unlockedAt
      }));
      
      res.json({ achievements: achievementsWithStatus });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Knowledge base
  app.get("/api/knowledge/search", async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        const articles = await storage.getAllArticles();
        return res.json({ articles });
      }
      
      const articles = await storage.searchArticles(q);
      res.json({ articles });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/api/knowledge/:articleId", async (req: Request, res: Response) => {
    try {
      const article = await storage.getArticle(req.params.articleId);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      // Increment view count
      await storage.incrementArticleViews(req.params.articleId);
      
      res.json({ article });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
