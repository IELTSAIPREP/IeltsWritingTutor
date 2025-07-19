import { Button } from "@/components/ui/button";
import { Download, PenTool } from "lucide-react";
import { exportText } from "@/lib/export";

export default function Header() {
  const handleExport = () => {
    const content = localStorage.getItem("ielts-essay-content") || "";
    if (content.trim()) {
      exportText(content, "ielts-essay.txt");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white rounded-lg p-2">
              <PenTool className="text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">IELTS Writing Practice</h1>
              <p className="text-sm text-gray-500">Improve your writing skills</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
