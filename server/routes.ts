import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEssaySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all essays
  app.get("/api/essays", async (req, res) => {
    try {
      const essays = await storage.getEssays();
      res.json(essays);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch essays" });
    }
  });

  // Get a specific essay
  app.get("/api/essays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid essay ID" });
      }

      const essay = await storage.getEssay(id);
      if (!essay) {
        return res.status(404).json({ message: "Essay not found" });
      }

      res.json(essay);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch essay" });
    }
  });

  // Create a new essay
  app.post("/api/essays", async (req, res) => {
    try {
      const validatedData = insertEssaySchema.parse(req.body);
      const essay = await storage.createEssay(validatedData);
      res.status(201).json(essay);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid essay data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create essay" });
    }
  });

  // Update an essay
  app.patch("/api/essays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid essay ID" });
      }

      const updates = insertEssaySchema.partial().parse(req.body);
      const essay = await storage.updateEssay(id, updates);
      
      if (!essay) {
        return res.status(404).json({ message: "Essay not found" });
      }

      res.json(essay);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid essay data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update essay" });
    }
  });

  // Delete an essay
  app.delete("/api/essays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid essay ID" });
      }

      const deleted = await storage.deleteEssay(id);
      if (!deleted) {
        return res.status(404).json({ message: "Essay not found" });
      }

      res.json({ message: "Essay deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete essay" });
    }
  });

  // Get all prompts
  app.get("/api/prompts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const prompts = category 
        ? await storage.getPromptsByCategory(category)
        : await storage.getPrompts();
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompts" });
    }
  });

  // Get a specific prompt
  app.get("/api/prompts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid prompt ID" });
      }

      const prompt = await storage.getPrompt(id);
      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found" });
      }

      res.json(prompt);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompt" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
