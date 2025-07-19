import Timer from "@/components/timer";
import WritingStats from "@/components/writing-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, CheckCircle, MessageCircle, X } from "lucide-react";
import type { Prompt } from "@shared/schema";

interface SidebarProps {
  prompts: Prompt[];
  selectedPrompt: Prompt | null;
  onSelectPrompt: (prompt: Prompt) => void;
  onCloseMobileSidebar: () => void;
}

export default function Sidebar({ prompts, selectedPrompt, onSelectPrompt, onCloseMobileSidebar }: SidebarProps) {
  const tips = [
    "Write at least 250 words for Task 2",
    "Include clear introduction and conclusion",
    "Use topic sentences for each paragraph", 
    "Support ideas with examples",
    "Check grammar and spelling"
  ];

  return (
    <div className="space-y-6">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-end">
        <Button variant="ghost" size="sm" onClick={onCloseMobileSidebar}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Timer */}
      <Timer />

      {/* Writing Stats */}
      <WritingStats />

      {/* IELTS Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Lightbulb className="text-blue-600 mr-3 h-5 w-5" />
            IELTS Writing Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0 h-4 w-4" />
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MessageCircle className="text-blue-600 mr-3 h-5 w-5" />
            Practice Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onSelectPrompt(prompt)}
                className={`w-full text-left p-3 rounded-lg border transition-colors text-sm ${
                  selectedPrompt?.id === prompt.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="font-medium text-gray-900">{prompt.category}</div>
                <div className="text-gray-600 mt-1 line-clamp-2">{prompt.title}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
