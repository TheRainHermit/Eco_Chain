import { WasteType } from './types';

export const wasteTypes: WasteType[] = [
  {
    id: 'plastic',
    name: 'Plástico',
    icon: 'Recycle',
    pointsPerUnit: 10,
    color: 'from-blue-400 to-blue-600',
    description: 'Botellas, envases, bolsas'
  },
  {
    id: 'paper',
    name: 'Papel',
    icon: 'FileText',
    pointsPerUnit: 5,
    color: 'from-orange-400 to-orange-600',
    description: 'Periódicos, revistas, cartón'
  },
  {
    id: 'glass',
    name: 'Vidrio',
    icon: 'Wine',
    pointsPerUnit: 15,
    color: 'from-green-400 to-green-600',
    description: 'Botellas, frascos'
  },
  {
    id: 'metal',
    name: 'Metal',
    icon: 'Zap',
    pointsPerUnit: 20,
    color: 'from-gray-400 to-gray-600',
    description: 'Latas, aluminio'
  },
  {
    id: 'electronic',
    name: 'Electrónico',
    icon: 'Smartphone',
    pointsPerUnit: 50,
    color: 'from-purple-400 to-purple-600',
    description: 'Dispositivos, baterías'
  }
];

export const calculateCO2Saved = (wasteProcessed: any): number => {
  const co2Factors = {
    plastic: 2.5, // kg CO2 per kg of plastic
    paper: 1.3,   // kg CO2 per kg of paper
    glass: 0.8,   // kg CO2 per kg of glass
    metal: 4.2,   // kg CO2 per kg of metal
    electronic: 8.5 // kg CO2 per kg of electronic waste
  };

  return Object.entries(wasteProcessed).reduce((total, [type, amount]) => {
    return total + (amount * co2Factors[type as keyof typeof co2Factors]);
  }, 0);
};

export const calculateTreesEquivalent = (co2Saved: number): number => {
  // 1 tree absorbs approximately 22 kg of CO2 per year
  return Math.floor(co2Saved / 22);
};

export const formatEthAmount = (amount: number): string => {
  return amount.toFixed(6);
};

export const getCurrentEthPrice = (): number => {
  // Simulate real-time ETH price (in reality, this would come from an API)
  return 2500 + Math.random() * 200 - 100; // $2400-$2600 range
};