import OpenAI from "openai";
import { essayValidationSchema, type EssayValidation } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function validateEssay(essayContent: string, prompt: string): Promise<EssayValidation> {
  try {
    const systemPrompt = `You are an expert IELTS examiner. Analyze the following essay and provide a detailed evaluation based on the four IELTS Writing Task 2 criteria:

1. Task Response (0-9): How well the essay addresses the task
2. Coherence and Cohesion (0-9): Organization and linking of ideas
3. Lexical Resource (0-9): Vocabulary range and accuracy
4. Grammatical Range and Accuracy (0-9): Grammar variety and correctness

Provide scores for each criterion and an overall band score (average of the four). Also provide specific feedback, strengths, and areas for improvement.

Essay Prompt: "${prompt}"

Respond in JSON format with this structure:
{
  "score": number (overall band score 0-9),
  "taskResponse": number (0-9),
  "coherenceCohesion": number (0-9), 
  "lexicalResource": number (0-9),
  "grammaticalRange": number (0-9),
  "feedback": "detailed feedback about the essay",
  "strengths": ["strength 1", "strength 2", ...],
  "improvements": ["improvement 1", "improvement 2", ...],
  "wordCount": number
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: essayContent,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate the response matches our schema
    return essayValidationSchema.parse(result);
  } catch (error) {
    console.error("OpenAI validation error:", error);
    throw new Error("Failed to validate essay with AI");
  }
}