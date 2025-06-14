export interface WasteType {
  id: string;
  name: string;
  icon: string;
  pointsPerUnit: number;
  color: string;
  description: string;
}

export interface Transaction {
  id: string;
  wasteType: WasteType;
  quantity: number;
  pointsEarned: number;
  timestamp: Date;
}

export interface EthereumExchange {
  id: string;
  pointsUsed: number;
  ethAmount: number;
  ethPrice: number;
  timestamp: Date;
}

export interface UserStats {
  totalPoints: number;
  totalEthEarned: number;
  wasteProcessed: {
    plastic: number;
    paper: number;
    glass: number;
    metal: number;
    electronic: number;
  };
  co2Saved: number;
  treesEquivalent: number;
}