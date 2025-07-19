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
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Button 
              onClick={() => validateMutation.mutate()}
              disabled={validateMutation.isPending || !content.trim()}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              {validateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Validating Essay...
                </>
              ) : (
                <>
                  <Award className="mr-2 h-5 w-5" />
                  Submit & Get AI Score
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Get detailed feedback and IELTS band score from AI examiner
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validationResult && (
        <div className="space-y-4">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="text-blue-600 mr-3 h-6 w-6" />
                IELTS Band Score: {validationResult.score}/9
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Progress value={(validationResult.score / 9) * 100} className="h-3" />
                </div>
                <Badge className={`${getScoreColor(validationResult.score)} text-white`}>
                  {getScoreLabel(validationResult.score)}
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{validationResult.taskResponse}</div>
                  <div className="text-xs text-gray-600">Task Response</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{validationResult.coherenceCohesion}</div>
                  <div className="text-xs text-gray-600">Coherence & Cohesion</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{validationResult.lexicalResource}</div>
                  <div className="text-xs text-gray-600">Lexical Resource</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{validationResult.grammaticalRange}</div>
                  <div className="text-xs text-gray-600">Grammar</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="text-blue-600 mr-3 h-5 w-5" />
                Detailed Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{validationResult.feedback}</p>
            </CardContent>
          </Card>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {validationResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="text-green-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {validationResult.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <XCircle className="text-orange-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}