import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { eq, and, desc, sql } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  TrainingModule,
  InsertTrainingModule,
  UserModuleProgress,
  InsertUserModuleProgress,
  Simulation,
  InsertSimulation,
  SimulationResult,
  InsertSimulationResult,
  Achievement,
  InsertAchievement,
  UserAchievement,
  InsertUserAchievement,
  PerformanceMetric,
  InsertPerformanceMetric,
  KnowledgeArticle,
  InsertKnowledgeArticle,
} from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  updateUserProgress(userId: string, completionPercentage: number, totalXp: number): Promise<void>;

  // Training module operations
  getAllModules(): Promise<TrainingModule[]>;
  getModule(id: string): Promise<TrainingModule | undefined>;
  createModule(module: InsertTrainingModule): Promise<TrainingModule>;

  // User module progress operations
  getUserModuleProgress(userId: string, moduleId: string): Promise<UserModuleProgress | undefined>;
  getUserAllProgress(userId: string): Promise<UserModuleProgress[]>;
  createOrUpdateProgress(progress: InsertUserModuleProgress): Promise<UserModuleProgress>;

  // Simulation operations
  getAllSimulations(): Promise<Simulation[]>;
  getSimulation(id: string): Promise<Simulation | undefined>;
  getSimulationsByDifficulty(difficulty: string): Promise<Simulation[]>;
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;

  // Simulation result operations
  createSimulationResult(result: InsertSimulationResult): Promise<SimulationResult>;
  getUserSimulationResults(userId: string): Promise<SimulationResult[]>;
  getRecentSimulationResults(userId: string, limit: number): Promise<SimulationResult[]>;

  // Achievement operations
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement | null>;
  checkAndUnlockAchievements(userId: string): Promise<UserAchievement[]>;

  // Performance metrics operations
  createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric>;
  getUserMetrics(userId: string, days: number): Promise<PerformanceMetric[]>;
  getLeaderboard(limit: number): Promise<Array<{ user: User; totalXp: number; rank: number }>>;

  // Knowledge base operations
  getAllArticles(): Promise<KnowledgeArticle[]>;
  searchArticles(query: string): Promise<KnowledgeArticle[]>;
  getArticle(id: string): Promise<KnowledgeArticle | undefined>;
  incrementArticleViews(id: string): Promise<void>;
  
  // Seed operations
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  createKnowledgeArticle(article: InsertKnowledgeArticle): Promise<KnowledgeArticle>;
}

// Database storage implementation
export class DbStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const results = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return results[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const results = await db.insert(schema.users).values(insertUser).returning();
    return results[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const results = await db.update(schema.users).set(updates).where(eq(schema.users.id, id)).returning();
    return results[0];
  }

  async updateUserProgress(userId: string, completionPercentage: number, totalXp: number): Promise<void> {
    await db.update(schema.users).set({ completionPercentage, totalXp }).where(eq(schema.users.id, userId));
  }

  // Training module operations
  async getAllModules(): Promise<TrainingModule[]> {
    return await db.select().from(schema.trainingModules).orderBy(schema.trainingModules.order);
  }

  async getModule(id: string): Promise<TrainingModule | undefined> {
    const results = await db.select().from(schema.trainingModules).where(eq(schema.trainingModules.id, id));
    return results[0];
  }

  async createModule(module: InsertTrainingModule): Promise<TrainingModule> {
    const results = await db.insert(schema.trainingModules).values(module).returning();
    return results[0];
  }

  // User module progress operations
  async getUserModuleProgress(userId: string, moduleId: string): Promise<UserModuleProgress | undefined> {
    const results = await db.select().from(schema.userModuleProgress).where(
      and(
        eq(schema.userModuleProgress.userId, userId),
        eq(schema.userModuleProgress.moduleId, moduleId)
      )
    );
    return results[0];
  }

  async getUserAllProgress(userId: string): Promise<UserModuleProgress[]> {
    return await db.select().from(schema.userModuleProgress).where(eq(schema.userModuleProgress.userId, userId));
  }

  async createOrUpdateProgress(progress: InsertUserModuleProgress): Promise<UserModuleProgress> {
    const existing = await this.getUserModuleProgress(progress.userId, progress.moduleId);
    
    if (existing) {
      const results = await db.update(schema.userModuleProgress)
        .set({ ...progress, updatedAt: new Date() })
        .where(
          and(
            eq(schema.userModuleProgress.userId, progress.userId),
            eq(schema.userModuleProgress.moduleId, progress.moduleId)
          )
        )
        .returning();
      return results[0];
    } else {
      const results = await db.insert(schema.userModuleProgress).values(progress).returning();
      return results[0];
    }
  }

  // Simulation operations
  async getAllSimulations(): Promise<Simulation[]> {
    return await db.select().from(schema.simulations);
  }

  async getSimulation(id: string): Promise<Simulation | undefined> {
    const results = await db.select().from(schema.simulations).where(eq(schema.simulations.id, id));
    return results[0];
  }

  async getSimulationsByDifficulty(difficulty: string): Promise<Simulation[]> {
    return await db.select().from(schema.simulations).where(eq(schema.simulations.difficulty, difficulty));
  }

  async createSimulation(simulation: InsertSimulation): Promise<Simulation> {
    const results = await db.insert(schema.simulations).values(simulation).returning();
    return results[0];
  }

  // Simulation result operations
  async createSimulationResult(result: InsertSimulationResult): Promise<SimulationResult> {
    const results = await db.insert(schema.simulationResults).values(result).returning();
    return results[0];
  }

  async getUserSimulationResults(userId: string): Promise<SimulationResult[]> {
    return await db.select().from(schema.simulationResults)
      .where(eq(schema.simulationResults.userId, userId))
      .orderBy(desc(schema.simulationResults.completedAt));
  }

  async getRecentSimulationResults(userId: string, limit: number): Promise<SimulationResult[]> {
    return await db.select().from(schema.simulationResults)
      .where(eq(schema.simulationResults.userId, userId))
      .orderBy(desc(schema.simulationResults.completedAt))
      .limit(limit);
  }

  // Achievement operations
  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(schema.achievements);
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return await db.select().from(schema.userAchievements)
      .where(eq(schema.userAchievements.userId, userId));
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement | null> {
    // Check if already unlocked (idempotent)
    const existing = await db.select().from(schema.userAchievements).where(
      and(
        eq(schema.userAchievements.userId, userId),
        eq(schema.userAchievements.achievementId, achievementId)
      )
    );

    if (existing.length > 0) {
      return null; // Already unlocked, return null to indicate no new unlock
    }

    const results = await db.insert(schema.userAchievements).values({ userId, achievementId }).returning();
    
    // Award XP for the achievement
    const achievement = await this.getAllAchievements().then(achs => achs.find(a => a.id === achievementId));
    if (achievement) {
      const user = await this.getUser(userId);
      if (user) {
        await this.updateUser(userId, { totalXp: user.totalXp + achievement.xpReward });
      }
    }
    
    return results[0];
  }

  async checkAndUnlockAchievements(userId: string): Promise<UserAchievement[]> {
    const newAchievements: UserAchievement[] = [];
    const user = await this.getUser(userId);
    const userAchievements = await this.getUserAchievements(userId);
    const allAchievements = await this.getAllAchievements();
    const simulationResults = await this.getUserSimulationResults(userId);
    const moduleProgress = await this.getUserAllProgress(userId);

    for (const achievement of allAchievements) {
      // Skip if already unlocked
      if (userAchievements.some(ua => ua.achievementId === achievement.id)) {
        continue;
      }

      const criteria = achievement.criteria as any;
      let unlock = false;

      // Check various criteria
      if (criteria.type === 'perfect_score' && simulationResults.some(r => r.score === 100)) {
        unlock = true;
      } else if (criteria.type === 'streak' && criteria.days) {
        // Check for consecutive days (simplified logic)
        unlock = true; // For demo purposes
      } else if (criteria.type === 'modules_completed' && criteria.count) {
        const completed = moduleProgress.filter(p => p.status === 'completed').length;
        unlock = completed >= criteria.count;
      } else if (criteria.type === 'total_xp' && criteria.amount) {
        unlock = (user?.totalXp || 0) >= criteria.amount;
      }

      if (unlock) {
        const newAchievement = await this.unlockAchievement(userId, achievement.id);
        if (newAchievement) {
          newAchievements.push(newAchievement);
        }
      }
    }

    return newAchievements;
  }

  // Performance metrics operations
  async createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric> {
    const results = await db.insert(schema.performanceMetrics).values(metric).returning();
    return results[0];
  }

  async getUserMetrics(userId: string, days: number): Promise<PerformanceMetric[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return await db.select().from(schema.performanceMetrics)
      .where(
        and(
          eq(schema.performanceMetrics.userId, userId),
          sql`${schema.performanceMetrics.date} >= ${cutoffDate}`
        )
      )
      .orderBy(schema.performanceMetrics.date);
  }

  async getLeaderboard(limit: number): Promise<Array<{ user: User; totalXp: number; rank: number }>> {
    const topUsers = await db.select().from(schema.users)
      .orderBy(desc(schema.users.totalXp))
      .limit(limit);

    return topUsers.map((user, index) => ({
      user,
      totalXp: user.totalXp,
      rank: index + 1
    }));
  }

  // Knowledge base operations
  async getAllArticles(): Promise<KnowledgeArticle[]> {
    return await db.select().from(schema.knowledgeArticles);
  }

  async searchArticles(query: string): Promise<KnowledgeArticle[]> {
    const lowerQuery = query.toLowerCase();
    const articles = await this.getAllArticles();
    
    return articles
      .filter(article => 
        article.title.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery) ||
        article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => {
        // Simple relevance scoring: title matches score higher
        const aScore = a.title.toLowerCase().includes(lowerQuery) ? 2 : 1;
        const bScore = b.title.toLowerCase().includes(lowerQuery) ? 2 : 1;
        return bScore - aScore;
      });
  }

  async getArticle(id: string): Promise<KnowledgeArticle | undefined> {
    const results = await db.select().from(schema.knowledgeArticles).where(eq(schema.knowledgeArticles.id, id));
    return results[0];
  }

  async incrementArticleViews(id: string): Promise<void> {
    await db.update(schema.knowledgeArticles)
      .set({ viewCount: sql`${schema.knowledgeArticles.viewCount} + 1` })
      .where(eq(schema.knowledgeArticles.id, id));
  }
  
  // Seed operations
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const results = await db.insert(schema.achievements).values(achievement).returning();
    return results[0];
  }

  async createKnowledgeArticle(article: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const results = await db.insert(schema.knowledgeArticles).values(article).returning();
    return results[0];
  }
}

export const storage = new DbStorage();
