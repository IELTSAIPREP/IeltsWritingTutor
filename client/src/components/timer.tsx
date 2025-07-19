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
      <CardContent className="p-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-4">
            {formatTime(minutes * 60 + seconds)}
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            <Button 
              onClick={start}
              disabled={isRunning}
              size="sm"
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-xs font-medium"
            >
              <Play className="mr-1 h-3 w-3" />
              Start
            </Button>
            <Button 
              onClick={pause}
              disabled={!isRunning}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-xs font-medium"
            >
              <Pause className="mr-1 h-3 w-3" />
              Pause
            </Button>
            <Button 
              onClick={reset}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 text-xs font-medium"
            >
              <Square className="mr-1 h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
