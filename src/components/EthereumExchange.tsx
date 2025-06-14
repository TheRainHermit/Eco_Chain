import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { getCurrentEthPrice, formatEthAmount } from '../utils';

interface EthereumExchangeProps {
  points: number;
  onExchange: (pointsToExchange: number, ethAmount: number) => void;
}

export const EthereumExchange: React.FC<EthereumExchangeProps> = ({
  points,
  onExchange
}) => {
  const [ethPrice, setEthPrice] = useState(getCurrentEthPrice());
  const [pointsToExchange, setPointsToExchange] = useState(1000);
  const [isExchanging, setIsExchanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEthPrice(getCurrentEthPrice());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const ethAmount = (pointsToExchange / 1000000) * (ethPrice / 1000);
  const canExchange = points >= pointsToExchange && pointsToExchange >= 1000;

  const handleExchange = async () => {
    if (!canExchange) return;
    
    setIsExchanging(true);
    
    // Simulate blockchain transaction delay
    setTimeout(() => {
      onExchange(pointsToExchange, ethAmount);
      setIsExchanging(false);
      setPointsToExchange(1000);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white shadow-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <Zap size={24} className="text-yellow-400" />
        <h3 className="text-xl font-bold">Intercambio por Ethereum</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Precio ETH</span>
          </div>
          <div className="text-2xl font-bold">${ethPrice.toLocaleString()}</div>
          <div className="text-xs text-gray-300 mt-1">Actualizado en tiempo real</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <span className="text-sm font-medium">Tus Puntos</span>
          <div className="text-2xl font-bold">{points.toLocaleString()}</div>
          <div className="text-xs text-gray-300 mt-1">Disponibles para intercambio</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Puntos a intercambiar (mínimo 1,000)
          </label>
          <input
            type="number"
            min="1000"
            step="1000"
            max={points}
            value={pointsToExchange}
            onChange={(e) => setPointsToExchange(parseInt(e.target.value) || 1000)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
            disabled={isExchanging}
          />
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>{pointsToExchange.toLocaleString()} Puntos</span>
            <ArrowRight size={16} />
            <span>{formatEthAmount(ethAmount)} ETH</span>
          </div>
          <div className="text-xs text-gray-300">
            Valor aproximado: ${(ethAmount * ethPrice).toFixed(2)}
          </div>
        </div>

        <button
          onClick={handleExchange}
          disabled={!canExchange || isExchanging}
          className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
            canExchange && !isExchanging
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isExchanging ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Procesando en blockchain...</span>
            </div>
          ) : (
            `Intercambiar por ${formatEthAmount(ethAmount)} ETH`
          )}
        </button>

        {!canExchange && points < 1000 && (
          <p className="text-xs text-yellow-400 text-center">
            Necesitas al menos 1,000 puntos para intercambiar
          </p>
        )}
      </div>
    </div>
  );
};