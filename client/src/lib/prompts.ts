export interface WritingPrompt {
  id: string;
  category: string;
  title: string;
  content: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeLimit: number; // in minutes
}

export const defaultPrompts: WritingPrompt[] = [
  {
    id: "1",
    category: "Technology & Society",
    title: "Social Media Impact",
    content: "Some people think that modern technology is making people less socially active, while others believe it helps people to be more connected. Discuss both views and give your own opinion. Write at least 250 words.",
    difficulty: "intermediate",
    timeLimit: 40,
  },
  {
    id: "2",
    category: "Environment",
    title: "Climate Change Solutions",
    content: "Some people believe that climate change is the most urgent issue facing humanity today, while others argue that economic development should be prioritized. Discuss both views and give your opinion.",
    difficulty: "advanced",
    timeLimit: 40,
  },
  {
    id: "3",
    category: "Education",
    title: "Online vs Traditional Learning",
    content: "Online learning has become increasingly popular. Compare the advantages and disadvantages of online learning with traditional classroom education. Which do you think is more effective and why?",
    difficulty: "beginner",
    timeLimit: 40,
  },
  {
    id: "4",
    category: "Work & Career",
    title: "Work-Life Balance",
    content: "In many countries, people are working longer hours and have less time for personal activities. What are the causes of this problem? What solutions can you suggest?",
    difficulty: "intermediate",
    timeLimit: 40,
  },
  {
    id: "5",
    category: "Health & Lifestyle",
    title: "Public Health Measures",
    content: "Some people believe that governments should impose strict regulations on unhealthy foods to improve public health, while others think individuals should have the freedom to choose what they eat. Discuss both views and give your opinion.",
    difficulty: "advanced",
    timeLimit: 40,
  },
];
