import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  recentPoints: number;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({ points, recentPoints }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Coins size={24} />
            <h2 className="text-lg font-semibold">Tus EcoPoints</h2>
          </div>
          <div className="text-3xl font-bold">{points.toLocaleString()}</div>
        </div>
        
        {recentPoints > 0 && (
          <div className="flex items-center space-x-1 bg-white/20 px-3 py-2 rounded-lg">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">+{recentPoints}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm opacity-90">
        1,000 puntos = 0.001 ETH aproximadamente
      </div>
    </div>
  );
};