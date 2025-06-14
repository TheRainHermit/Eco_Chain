import React, { useState, useEffect } from 'react';
import { Recycle, Sparkles } from 'lucide-react';
import { WasteTypeSelector } from './components/WasteTypeSelector';
import { VendingSlot } from './components/VendingSlot';
import { PointsDisplay } from './components/PointsDisplay';
import { EthereumExchange } from './components/EthereumExchange';
import { RecomendationsIA } from './components/RecomendationsIA';
import { StatsPanel } from './components/StatsPanel';
import { TransactionHistory } from './components/TransactionHistory';
import { ChatContainer } from './components/ChatContainer';
import { WasteType, Transaction, EthereumExchange as EthExchange, UserStats } from './types';
import { calculateCO2Saved, calculateTreesEquivalent } from './utils';
import EcoChainDashboard from './components/EcoChainDashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedWaste, setSelectedWaste] = useState<WasteType | null>(null);
  const [points, setPoints] = useState(0);
  const [recomendations, setRecomendations] = useState("")
  const [recentPoints, setRecentPoints] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [exchanges, setExchanges] = useState<EthExchange[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalPoints: 0,
    totalEthEarned: 0,
    wasteProcessed: {
      plastic: 0,
      paper: 0,
      glass: 0,
      metal: 0,
      electronic: 0
    },
    co2Saved: 0,
    treesEquivalent: 0
  });
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);


  const handleInsertWaste = (quantity: number) => {
    if (!selectedWaste) return;

    setIsProcessing(true);
    const pointsEarned = selectedWaste.pointsPerUnit * quantity;
    
    setTimeout(() => {
      // Update points
      setPoints(prev => prev + pointsEarned);
      setRecentPoints(pointsEarned);
      
      // Create transaction
      const transaction: Transaction = {
        id: Date.now().toString(),
        wasteType: selectedWaste,
        quantity,
        pointsEarned,
        timestamp: new Date()
      };
      
      setTransactions(prev => [transaction, ...prev]);
      
      // Update stats
      setStats(prev => {
        const newWasteProcessed = {
          ...prev.wasteProcessed,
          [selectedWaste.id]: prev.wasteProcessed[selectedWaste.id as keyof typeof prev.wasteProcessed] + quantity
        };
        
        const newCO2Saved = calculateCO2Saved(newWasteProcessed);
        const newTreesEquivalent = calculateTreesEquivalent(newCO2Saved);
        
        return {
          ...prev,
          totalPoints: prev.totalPoints + pointsEarned,
          wasteProcessed: newWasteProcessed,
          co2Saved: newCO2Saved,
          treesEquivalent: newTreesEquivalent
        };
      });
      
      setIsProcessing(false);
      
      // Clear recent points after 3 seconds
      setTimeout(() => setRecentPoints(0), 3000);
    }, 1000);
  };

  const handleEthereumExchange = (pointsToExchange: number, ethAmount: number) => {
    if (points < pointsToExchange) return;

    // Update points
    setPoints(prev => prev - pointsToExchange);
    
    // Create exchange transaction
    const exchange: EthExchange = {
      id: Date.now().toString(),
      pointsUsed: pointsToExchange,
      ethAmount,
      ethPrice: 2500, // This would be the actual ETH price
      timestamp: new Date()
    };
    
    setExchanges(prev => [exchange, ...prev]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalEthEarned: prev.totalEthEarned + ethAmount
    }));

    setRecomendations("");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Recycle size={48} className="text-emerald-400" />
                <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                EcoChain
              </h1>
            </div>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Recicla hoy, gana mañana, y disfruta siempre.
            </p>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Vending Machine */}
            <div className="lg:col-span-2 space-y-8">
              <PointsDisplay points={points} recentPoints={recentPoints} />
              <WasteTypeSelector 
                onSelectWaste={setSelectedWaste}
                selectedWaste={selectedWaste}
              />
              <VendingSlot
                selectedWaste={selectedWaste}
                onInsertWaste={handleInsertWaste}
                isProcessing={isProcessing}
              />
              {/* Recomendations from IA */}
              <RecomendationsIA />
            </div>

            {/* Right Column - Stats and Exchange */}
            <div className="space-y-8">
              <StatsPanel stats={stats} />
              <EthereumExchange
                points={points}
                onExchange={handleEthereumExchange}
              />
            </div>

            {/* Chat Container */}
            <ChatContainer isOpen={isChatOpen} onClose={toggleChat} />
          </div>

          {/* Transaction History */}
          <TransactionHistory
            transactions={transactions}
            exchanges={exchanges}
          />
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!showDashboard ? (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded shadow text-lg"
          onClick={() => setShowDashboard(true)}
        >
          Ver Dashboard EcoChain
        </button>
      ) : (
        <div className="w-full max-w-5xl">
          <EcoChainDashboard />
          <div className="flex justify-center mt-4">
            <button
              className="text-red-600 underline"
              onClick={() => setShowDashboard(false)}
            >
              Cerrar Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
      </div>

    </>
  );
}

export default App;