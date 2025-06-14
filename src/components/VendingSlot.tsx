import React, { useState } from 'react';
import { ArrowDown, Package } from 'lucide-react';
import { WasteType } from '../types';

interface VendingSlotProps {
  selectedWaste: WasteType | null;
  onInsertWaste: (quantity: number) => void;
  isProcessing: boolean;
}

export const VendingSlot: React.FC<VendingSlotProps> = ({
  selectedWaste,
  onInsertWaste,
  isProcessing
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isInserting, setIsInserting] = useState(false);

  const handleInsert = () => {
    if (!selectedWaste || isProcessing) return;
    
    setIsInserting(true);
    setTimeout(() => {
      onInsertWaste(quantity);
      setIsInserting(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Ranura de Inserción</h3>
        <p className="text-gray-300">
          {selectedWaste ? `Insertando: ${selectedWaste.name}` : 'Selecciona un tipo de residuo'}
        </p>
      </div>

      <div className="relative mb-6">
        <div className={`w-full h-32 border-4 border-dashed rounded-2xl flex items-center justify-center transition-all duration-500 ${
          selectedWaste ? 'border-emerald-400 bg-emerald-400/10' : 'border-gray-600 bg-gray-700/30'
        } ${isInserting ? 'animate-pulse' : ''}`}>
          
          {isInserting ? (
            <div className="flex flex-col items-center">
              <Package size={32} className="animate-bounce text-emerald-400 mb-2" />
              <span className="text-sm">Procesando...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ArrowDown size={32} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Insertar aquí</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Cantidad</label>
          <input
            type="number"
            min="1"
            max="50"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            disabled={!selectedWaste || isProcessing}
          />
        </div>

        <button
          onClick={handleInsert}
          disabled={!selectedWaste || isProcessing || isInserting}
          className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
            selectedWaste && !isProcessing && !isInserting
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isInserting ? 'Procesando...' : `Insertar ${quantity} unidad${quantity > 1 ? 'es' : ''}`}
        </button>

        {selectedWaste && (
          <div className="text-center text-sm text-gray-300">
            Ganarás {selectedWaste.pointsPerUnit * quantity} puntos
          </div>
        )}
      </div>
    </div>
  );
};