import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - extended for training platform
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  experienceLevel: text("experience_level"), // none, some, experienced, expert
  learningStyle: text("learning_style"), // visual, auditory, kinesthetic
  role: text("role"), // support, technical, sales, manager
  totalXp: integer("total_xp").default(0).notNull(),
  completionPercentage: integer("completion_percentage").default(0).notNull(),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Training modules
export const trainingModules = pgTable("training_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  duration: text("duration").notNull(),
  xpReward: integer("xp_reward").notNull(),
  prerequisites: text("prerequisites").array(), // IDs of prerequisite modules
  content: jsonb("content").notNull(), // Structured content for the module
  quizQuestions: jsonb("quiz_questions").notNull(), // Array of quiz questions
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User progress on modules
export const userModuleProgress = pgTable("user_module_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  moduleId: varchar("module_id").notNull().references(() => trainingModules.id),
  status: text("status").notNull(), // not_started, in_progress, completed
  progress: integer("progress").default(0).notNull(), // 0-100
  quizScore: integer("quiz_score"), // Last quiz score
  quizAttempts: integer("quiz_attempts").default(0).notNull(),
  timeSpent: integer("time_spent").default(0).notNull(), // in minutes
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Simulation scenarios
export const simulations = pgTable("simulations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  scenario: text("scenario").notNull(),
  customerPersona: jsonb("customer_persona").notNull(), // AI customer personality traits
  expectedOutcomes: jsonb("expected_outcomes").notNull(), // What good responses look like
  keywords: jsonb("keywords").notNull(), // Keywords for sentiment analysis
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Simulation results
export const simulationResults = pgTable("simulation_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  simulationId: varchar("simulation_id").notNull().references(() => simulations.id),
  conversationLog: jsonb("conversation_log").notNull(), // Array of messages
  score: integer("score").notNull(), // 0-100
  sentimentScore: integer("sentiment_score").notNull(), // 0-100
  responseTime: integer("response_time").notNull(), // average in seconds
  handleTime: integer("handle_time").notNull(), // total duration in seconds
  feedback: jsonb("feedback").notNull(), // Detailed feedback and recommendations
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// Achievements/Badges
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  criteria: jsonb("criteria").notNull(), // Conditions to unlock
  xpReward: integer("xp_reward").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User achievements
export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  achievementId: varchar("achievement_id").notNull().references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

// Performance metrics (for analytics)
export const performanceMetrics = pgTable("performance_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  accuracy: integer("accuracy").notNull(), // 0-100
  avgHandleTime: integer("avg_handle_time").notNull(), // in seconds
  learningVelocity: integer("learning_velocity").notNull(), // 0-100
  dailyXp: integer("daily_xp").notNull(),
  simulationsCompleted: integer("simulations_completed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Knowledge base articles
export const knowledgeArticles = pgTable("knowledge_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  keywords: text("keywords").array().notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  helpful: boolean("helpful"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas and types
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertTrainingModuleSchema = createInsertSchema(trainingModules).omit({
  id: true,
  createdAt: true,
});

export const insertUserModuleProgressSchema = createInsertSchema(userModuleProgress).omit({
  id: true,
  updatedAt: true,
});

export const insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  createdAt: true,
});

export const insertSimulationResultSchema = createInsertSchema(simulationResults).omit({
  id: true,
  completedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export const insertPerformanceMetricSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertKnowledgeArticleSchema = createInsertSchema(knowledgeArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type TrainingModule = typeof trainingModules.$inferSelect;
export type InsertTrainingModule = z.infer<typeof insertTrainingModuleSchema>;

export type UserModuleProgress = typeof userModuleProgress.$inferSelect;
export type InsertUserModuleProgress = z.infer<typeof insertUserModuleProgressSchema>;

export type Simulation = typeof simulations.$inferSelect;
export type InsertSimulation = z.infer<typeof insertSimulationSchema>;

export type SimulationResult = typeof simulationResults.$inferSelect;
export type InsertSimulationResult = z.infer<typeof insertSimulationResultSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type InsertPerformanceMetric = z.infer<typeof insertPerformanceMetricSchema>;

export type KnowledgeArticle = typeof knowledgeArticles.$inferSelect;
export type InsertKnowledgeArticle = z.infer<typeof insertKnowledgeArticleSchema>;
