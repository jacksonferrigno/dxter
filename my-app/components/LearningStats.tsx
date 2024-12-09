import React from 'react';
import { Users, Target, Activity } from 'lucide-react';
/**
 * stats interface data 
 */
interface StatsData {
  overview: {
    totalInteractions: number;
    avgConfidence: number;
  };
  // array of most frequent blood components asked 
  topComponents: Array<{
    _id: string;
    queries: number;
  }>;
}
// prop for learnstats component
interface LearningStatsProps {
  stats: StatsData;
}
/**
 * displays ai learning stats and metrics 
 * 
 */
export const LearningStats: React.FC<LearningStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Users className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-400">Total Interactions</p>
              <p className="text-2xl font-semibold text-white">
                {stats.overview.totalInteractions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-sm text-gray-400">Average Confidence</p>
              <p className="text-2xl font-semibold text-white">
                {(stats.overview.avgConfidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};