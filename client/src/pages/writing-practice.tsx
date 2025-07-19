import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import WritingArea from "@/components/writing-area";
import { useQuery } from "@tanstack/react-query";
import type { Prompt } from "@shared/schema";

export default function WritingPractice() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { data: prompts = [] } = useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
  });

  // Set default prompt if none selected
  if (!selectedPrompt && prompts.length > 0) {
    setSelectedPrompt(prompts[0]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${isMobileSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <Sidebar 
              prompts={prompts}
              selectedPrompt={selectedPrompt}
              onSelectPrompt={setSelectedPrompt}
              onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
            />
          </div>

          {/* Main Writing Area */}
          <div className="lg:col-span-3">
            <WritingArea 
              selectedPrompt={selectedPrompt}
              onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
        >
          <i className="fas fa-tools text-lg"></i>
        </button>
      </div>
    </div>
  );
}
