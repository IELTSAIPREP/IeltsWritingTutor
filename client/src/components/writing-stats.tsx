import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";
import { useTextStats } from "@/hooks/use-text-stats";

export default function WritingStats() {
  const { wordCount, charCount, paragraphCount } = useTextStats();
  
  const targetWords = 300;
  const progressPercentage = Math.min((wordCount / targetWords) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <BarChart3 className="text-blue-600 mr-3 h-5 w-5" />
          Writing Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Words:</span>
            <span className="font-semibold text-blue-600 text-lg">{wordCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Characters:</span>
            <span className="font-semibold">{charCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Paragraphs:</span>
            <span className="font-semibold">{paragraphCount}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Target Range:</span>
              <span className="text-sm font-medium text-gray-900">250-300 words</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
