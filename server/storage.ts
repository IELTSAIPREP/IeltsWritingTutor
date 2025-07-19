import { essays, prompts, type Essay, type InsertEssay, type Prompt, type InsertPrompt } from "@shared/schema";

export interface IStorage {
  // Essay operations
  getEssay(id: number): Promise<Essay | undefined>;
  getEssays(): Promise<Essay[]>;
  createEssay(essay: InsertEssay): Promise<Essay>;
  updateEssay(id: number, essay: Partial<InsertEssay>): Promise<Essay | undefined>;
  deleteEssay(id: number): Promise<boolean>;

  // Prompt operations
  getPrompt(id: number): Promise<Prompt | undefined>;
  getPrompts(): Promise<Prompt[]>;
  getPromptsByCategory(category: string): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
}

export class MemStorage implements IStorage {
  private essays: Map<number, Essay>;
  private prompts: Map<number, Prompt>;
  private currentEssayId: number;
  private currentPromptId: number;

  constructor() {
    this.essays = new Map();
    this.prompts = new Map();
    this.currentEssayId = 1;
    this.currentPromptId = 1;
    this.initializePrompts();
  }

  private initializePrompts() {
    const defaultPrompts: InsertPrompt[] = [
      {
        category: "Technology & Society",
        title: "Social Media Impact",
        content: "Some people think that modern technology is making people less socially active, while others believe it helps people to be more connected. Discuss both views and give your own opinion. Write at least 250 words.",
        difficulty: "intermediate",
        timeLimit: 40,
      },
      {
        category: "Environment",
        title: "Climate Change Solutions",
        content: "Some people believe that climate change is the most urgent issue facing humanity today, while others argue that economic development should be prioritized. Discuss both views and give your opinion.",
        difficulty: "advanced",
        timeLimit: 40,
      },
      {
        category: "Education",
        title: "Online vs Traditional Learning",
        content: "Online learning has become increasingly popular. Compare the advantages and disadvantages of online learning with traditional classroom education. Which do you think is more effective and why?",
        difficulty: "beginner",
        timeLimit: 40,
      },
      {
        category: "Work & Career",
        title: "Work-Life Balance",
        content: "In many countries, people are working longer hours and have less time for personal activities. What are the causes of this problem? What solutions can you suggest?",
        difficulty: "intermediate",
        timeLimit: 40,
      },
      {
        category: "Health & Lifestyle",
        title: "Public Health Measures",
        content: "Some people believe that governments should impose strict regulations on unhealthy foods to improve public health, while others think individuals should have the freedom to choose what they eat. Discuss both views and give your opinion.",
        difficulty: "advanced",
        timeLimit: 40,
      },
    ];

    defaultPrompts.forEach(prompt => {
      this.createPrompt(prompt);
    });
  }

  // Essay operations
  async getEssay(id: number): Promise<Essay | undefined> {
    return this.essays.get(id);
  }

  async getEssays(): Promise<Essay[]> {
    return Array.from(this.essays.values());
  }

  async createEssay(insertEssay: InsertEssay): Promise<Essay> {
    const id = this.currentEssayId++;
    const now = new Date();
    const essay: Essay = {
      ...insertEssay,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.essays.set(id, essay);
    return essay;
  }

  async updateEssay(id: number, updates: Partial<InsertEssay>): Promise<Essay | undefined> {
    const essay = this.essays.get(id);
    if (!essay) return undefined;

    const updatedEssay: Essay = {
      ...essay,
      ...updates,
      updatedAt: new Date(),
    };
    this.essays.set(id, updatedEssay);
    return updatedEssay;
  }

  async deleteEssay(id: number): Promise<boolean> {
    return this.essays.delete(id);
  }

  // Prompt operations
  async getPrompt(id: number): Promise<Prompt | undefined> {
    return this.prompts.get(id);
  }

  async getPrompts(): Promise<Prompt[]> {
    return Array.from(this.prompts.values());
  }

  async getPromptsByCategory(category: string): Promise<Prompt[]> {
    return Array.from(this.prompts.values()).filter(prompt => prompt.category === category);
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const id = this.currentPromptId++;
    const prompt: Prompt = {
      ...insertPrompt,
      id,
    };
    this.prompts.set(id, prompt);
    return prompt;
  }
}

export const storage = new MemStorage();
