import React from 'react';
import { Clock, Coins, Zap } from 'lucide-react';
import { Transaction, EthereumExchange } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  exchanges: EthereumExchange[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  exchanges
}) => {
  const allTransactions = [
    ...transactions.map(t => ({ ...t, type: 'waste' as const })),
    ...exchanges.map(e => ({ ...e, type: 'exchange' as const }))
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <Clock size={24} className="text-gray-600" />
        <h3 className="text-xl font-bold text-gray-800">Historial Reciente</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {allTransactions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No hay transacciones aún</p>
            <p className="text-sm">¡Comienza insertando residuos!</p>
          </div>
        ) : (
          allTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'waste' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                {transaction.type === 'waste' ? (
                  <Coins size={20} className="text-green-600" />
                ) : (
                  <Zap size={20} className="text-purple-600" />
                )}
              </div>
              
              <div className="flex-1">
                {transaction.type === 'waste' ? (
                  <div>
                    <p className="font-medium text-gray-800">
                      {(transaction as Transaction).wasteType.name} x{(transaction as Transaction).quantity}
                    </p>
                    <p className="text-sm text-green-600">
                      +{(transaction as Transaction).pointsEarned} puntos
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-gray-800">
                      Intercambio por ETH
                    </p>
                    <p className="text-sm text-purple-600">
                      -{(transaction as EthereumExchange).pointsUsed} puntos → {(transaction as EthereumExchange).ethAmount.toFixed(6)} ETH
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                {transaction.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};