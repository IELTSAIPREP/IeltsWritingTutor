import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Award, TrendingUp, BookOpen, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { EssayValidation } from "@shared/schema";

interface EssayValidationProps {
  content: string;
  prompt: string;
}

export default function EssayValidationComponent({ content, prompt }: EssayValidationProps) {
  const [validationResult, setValidationResult] = useState<EssayValidation | null>(null);
  const { toast } = useToast();

  const validateMutation = useMutation({
    mutationFn: async () => {
      if (!content.trim()) {
        throw new Error("Please write your essay before submitting for validation");
      }
      if (content.trim().split(/\s+/).length < 250) {
        throw new Error("Your essay should be at least 250 words for IELTS Task 2");
      }
      return apiRequest<EssayValidation>("/api/validate-essay", {
        method: "POST",
        body: JSON.stringify({ content, prompt }),
      });
    },
    onSuccess: (result) => {
      setValidationResult(result);
      toast({
        title: "Essay Validated!",
        description: `Your essay scored ${result.score}/9. Check the detailed feedback below.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Validation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-green-500";
    if (score >= 5.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8.5) return "Excellent";
    if (score >= 7) return "Good";
    if (score >= 5.5) return "Competent";
    if (score >= 4) return "Limited";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Submit Button */}
      <div className="text-center py-4">
        <Button 
          onClick={() => validateMutation.mutate()}
          disabled={validateMutation.isPending || !content.trim()}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 shadow-lg"
        >
          {validateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Your Essay...
            </>
          ) : (
            <>
              <Award className="mr-2 h-5 w-5" />
              Submit & Get AI Score
            </>
          )}
        </Button>
        <p className="text-sm text-gray-600 mt-3">
          Get detailed IELTS feedback and band score from AI examiner
        </p>
      </div>

      {/* Validation Results */}
      {validationResult && (
        <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          {/* Overall Score Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Award className="text-blue-600 mr-3 h-8 w-8" />
              <h3 className="text-2xl font-bold text-gray-900">Your IELTS Score</h3>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-blue-600">{validationResult.score}/9</div>
              <Badge className={`${getScoreColor(validationResult.score)} text-white px-3 py-1 text-sm`}>
                {getScoreLabel(validationResult.score)}
              </Badge>
            </div>
            <div className="max-w-md mx-auto">
              <Progress value={(validationResult.score / 9) * 100} className="h-3" />
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Detailed Breakdown</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">{validationResult.taskResponse}</div>
                <div className="text-sm text-gray-700 font-medium">Task Response</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">{validationResult.coherenceCohesion}</div>
                <div className="text-sm text-gray-700 font-medium">Coherence & Cohesion</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">{validationResult.lexicalResource}</div>
                <div className="text-sm text-gray-700 font-medium">Lexical Resource</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-1">{validationResult.grammaticalRange}</div>
                <div className="text-sm text-gray-700 font-medium">Grammar</div>
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <BookOpen className="text-blue-600 mr-3 h-6 w-6" />
              <h4 className="text-xl font-semibold text-gray-900">Examiner's Feedback</h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">{validationResult.feedback}</p>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-600 mr-3 h-6 w-6" />
                <h4 className="text-lg font-semibold text-green-800">What You Did Well</h4>
              </div>
              <ul className="space-y-3">
                {validationResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-500 mt-1 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-orange-600 mr-3 h-6 w-6" />
                <h4 className="text-lg font-semibold text-orange-800">Areas to Improve</h4>
              </div>
              <ul className="space-y-3">
                {validationResult.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <XCircle className="text-orange-500 mt-1 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}