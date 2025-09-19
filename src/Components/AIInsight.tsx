import React from "react";
import { AIInsight } from "./types";
import { Sparkles } from "lucide-react";

interface Props {
  insights: AIInsight[];
}

const AIInsights: React.FC<Props> = ({ insights }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold">AI Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <h4 className="font-medium mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-400">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
