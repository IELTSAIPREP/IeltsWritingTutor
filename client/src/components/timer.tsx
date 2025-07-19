import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, Square } from "lucide-react";
import { useTimer } from "@/hooks/use-timer";

export default function Timer() {
  const { minutes, seconds, isRunning, start, pause, reset } = useTimer(20 * 60); // 20 minutes default

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Clock className="text-blue-600 mr-3 h-5 w-5" />
          Practice Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-4">
            {formatTime(minutes * 60 + seconds)}
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={start}
              disabled={isRunning}
              variant={isRunning ? "secondary" : "default"}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-sm font-medium py-2"
            >
              <Play className="mr-1 h-4 w-4" />
              Start
            </Button>
            <Button 
              onClick={pause}
              disabled={!isRunning}
              variant={!isRunning ? "secondary" : "default"}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-sm font-medium py-2"
            >
              <Pause className="mr-1 h-4 w-4" />
              Pause
            </Button>
            <Button 
              onClick={reset}
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 text-sm font-medium py-2"
            >
              <Square className="mr-1 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
