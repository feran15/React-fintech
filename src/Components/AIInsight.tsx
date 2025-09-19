import React from "react";
import type { AIInsight } from "./types";
import { Sparkles } from "lucide-react";

interface Props {
  insights: AIInsight[];
}

const AIInsights: React.FC<Props> = ({ insights }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold text-base md:text-lg">AI Insights</h3>
      </div>

      {/* Insights List */}
      <div className="space-y-4 overflow-y-auto max-h-80 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {insights.length > 0 ? (
          insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <h4 className="font-medium text-sm md:text-base mb-1">
                {insight.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No insights available</p>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
