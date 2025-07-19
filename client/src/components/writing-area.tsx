import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Save, FileText, Clock, AlignLeft, Download, CheckSquare } from "lucide-react";
import { useAutoSave } from "@/hooks/use-auto-save";
import { useToast } from "@/hooks/use-toast";
import { exportText } from "@/lib/export";
import type { Prompt } from "@shared/schema";

interface WritingAreaProps {
  selectedPrompt: Prompt | null;
  onToggleMobileSidebar: () => void;
}

export default function WritingArea({ selectedPrompt }: WritingAreaProps) {
  const [content, setContent] = useState(() => {
    return localStorage.getItem("ielts-essay-content") || "";
  });
  
  const { toast } = useToast();
  const { lastSaved } = useAutoSave(content, "ielts-essay-content");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleClear = () => {
    setContent("");
    localStorage.removeItem("ielts-essay-content");
    toast({
      title: "Essay Cleared",
      description: "Your essay has been cleared successfully.",
    });
  };

  const handleSave = () => {
    localStorage.setItem("ielts-essay-content", content);
    toast({
      title: "Essay Saved",
      description: "Your essay has been saved successfully.",
    });
  };

  const handleExport = () => {
    if (content.trim()) {
      exportText(content, "ielts-essay.txt");
      toast({
        title: "Essay Exported",
        description: "Your essay has been exported successfully.",
      });
    } else {
      toast({
        title: "No Content",
        description: "Please write something before exporting.",
        variant: "destructive",
      });
    }
  };

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const wordCount = getWordCount(content);
  const getFeedbackStatus = (count: number) => {
    if (count >= 250) return { label: "Good", color: "bg-green-500" };
    if (count >= 200) return { label: "Close", color: "bg-yellow-500" };
    return { label: "Need More", color: "bg-red-500" };
  };

  const wordFeedback = getFeedbackStatus(wordCount);

  return (
    <Card>
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Writing Practice Area</h2>
            <p className="text-gray-600 mt-1">Start writing your IELTS essay below</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-sm text-gray-500">
              <Save className="mr-2 h-4 w-4 text-green-500" />
              <span>{lastSaved ? `Saved ${lastSaved}` : "Auto-saving..."}</span>
            </div>
            <Button variant="outline" onClick={handleClear}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Current Prompt */}
      {selectedPrompt && (
        <div className="border-b border-gray-200 p-6 bg-blue-50">
          <div className="flex items-start space-x-3">
            <FileText className="text-blue-600 mt-1 h-5 w-5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current Writing Prompt:</h4>
              <p className="text-gray-700 leading-relaxed">{selectedPrompt.content}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                <span>
                  <Clock className="mr-1 h-4 w-4 inline" />
                  Suggested time: {selectedPrompt.timeLimit} minutes
                </span>
                <span>
                  <AlignLeft className="mr-1 h-4 w-4 inline" />
                  Task 2 Essay
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Writing Area */}
      <CardContent className="p-6">
        <Textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Start writing your essay here. Remember to plan your essay structure before you begin writing..."
          className="min-h-96 resize-none text-base leading-relaxed"
        />

        {/* Writing Tools */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Words: {wordCount}</span>
            <span>Characters: {content.length}</span>
          </div>
        </div>
      </CardContent>

      {/* Feedback Section */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <CheckSquare className="text-blue-600 mr-2 h-5 w-5" />
          Quick Feedback
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Word Count</span>
              <span className={`text-xs px-2 py-1 text-white rounded-full ${wordFeedback.color}`}>
                {wordFeedback.label}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              {wordCount >= 250 
                ? "Your essay meets the minimum word requirement." 
                : `You need ${250 - wordCount} more words to meet the minimum requirement.`}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Structure</span>
              <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full">
                Review
              </span>
            </div>
            <p className="text-xs text-gray-600">Consider adding clearer paragraph transitions.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-gray-600">Keep writing to improve your essay.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
