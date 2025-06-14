import React from 'react';
import { WasteType } from '../types';
import { wasteTypes } from '../utils';
import * as Icons from 'lucide-react';

interface WasteTypeSelectorProps {
  onSelectWaste: (wasteType: WasteType) => void;
  selectedWaste: WasteType | null;
}

export const WasteTypeSelector: React.FC<WasteTypeSelectorProps> = ({
  onSelectWaste,
  selectedWaste
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {wasteTypes.map((waste) => {
        const IconComponent = Icons[waste.icon as keyof typeof Icons] as React.ComponentType<any>;
        const isSelected = selectedWaste?.id === waste.id;
        
        return (
          <button
            key={waste.id}
            onClick={() => onSelectWaste(waste)}
            className={`relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              isSelected 
                ? 'ring-4 ring-emerald-400 shadow-2xl scale-105' 
                : 'hover:shadow-xl'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${waste.color} rounded-2xl opacity-90`} />
            <div className="relative text-white text-center">
              <IconComponent size={32} className="mx-auto mb-2" />
              <h3 className="font-bold text-sm">{waste.name}</h3>
              <p className="text-xs opacity-90 mt-1">{waste.pointsPerUnit} pts/unidad</p>
              <p className="text-xs opacity-75 mt-1">{waste.description}</p>
            </div>
            
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                <Icons.Check size={14} className="text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};