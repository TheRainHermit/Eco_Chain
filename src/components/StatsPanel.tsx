import React from 'react';
import { TreePine, Leaf, Recycle, Award } from 'lucide-react';
import { UserStats } from '../types';

interface StatsPanelProps {
  stats: UserStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const totalWaste = Object.values(stats.wasteProcessed).reduce((sum, amount) => sum + amount, 0);

  const statItems = [
    {
      icon: TreePine,
      label: 'Árboles Equivalentes',
      value: stats.treesEquivalent,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      icon: Leaf,
      label: 'CO₂ Ahorrado (kg)',
      value: Math.round(stats.co2Saved),
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10'
    },
    {
      icon: Recycle,
      label: 'Residuos Procesados',
      value: totalWaste,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      icon: Award,
      label: 'ETH Total Ganado',
      value: stats.totalEthEarned.toFixed(4),
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white shadow-2xl">
      <h3 className="text-xl font-bold mb-6 text-center">Tu Impacto Ambiental</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className={`${item.bgColor} rounded-xl p-4 text-center`}>
              <IconComponent size={24} className={`${item.color} mx-auto mb-2`} />
              <div className="text-lg font-bold">{item.value}</div>
              <div className="text-xs text-gray-300">{item.label}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-300">Desglose por Tipo de Residuo</h4>
        {Object.entries(stats.wasteProcessed).map(([type, amount]) => (
          <div key={type} className="flex justify-between items-center text-sm">
            <span className="capitalize text-gray-300">{type}:</span>
            <span className="font-medium">{amount} unidades</span>
          </div>
        ))}
      </div>
    </div>
  );
};