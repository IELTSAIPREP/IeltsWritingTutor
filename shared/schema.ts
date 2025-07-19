import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const essays = pgTable("essays", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  wordCount: integer("word_count").notNull().default(0),
  timeSpent: integer("time_spent").notNull().default(0), // in seconds
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  timeLimit: integer("time_limit").notNull().default(40), // in minutes
});

export const insertEssaySchema = createInsertSchema(essays).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPromptSchema = createInsertSchema(prompts).omit({
  id: true,
});

// Essay validation result schema
export const essayValidationSchema = z.object({
  score: z.number().min(0).max(9), // IELTS score 0-9
  taskResponse: z.number().min(0).max(9),
  coherenceCohesion: z.number().min(0).max(9),
  lexicalResource: z.number().min(0).max(9),
  grammaticalRange: z.number().min(0).max(9),
  feedback: z.string(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  wordCount: z.number(),
});

export type Essay = typeof essays.$inferSelect;
export type InsertEssay = z.infer<typeof insertEssaySchema>;
export type Prompt = typeof prompts.$inferSelect;
export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type EssayValidation = z.infer<typeof essayValidationSchema>;
