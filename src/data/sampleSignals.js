// Sample data untuk signal premium
export const premiumSignals = [
  {
    id: 1,
    pair: 'BTCUSDT',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'Low',
    riskReason: 'Strong volume and upward momentum',
    entryPrice: '69200',
    targets: [
      { number: '1', price: '70500', percentChange: '1.88' },
      { number: '2', price: '72800', percentChange: '5.20' },
      { number: '3', price: '75200', percentChange: '8.67' }
    ],
    stopLosses: [
      { number: '1', price: '68400', percentChange: '-1.16' },
      { number: '2', price: '67100', percentChange: '-3.03' }
    ],
    prediction: 'Bullish',
    volumeRank: '1',
    totalPairs: '443',
    status: 'active',
    successRate: '92%',
    analyst: 'Alex Thompson'
  },
  {
    id: 2,
    pair: 'ETHUSDT',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'Medium',
    riskReason: 'Consolidation phase after recent gains',
    entryPrice: '3550',
    targets: [
      { number: '1', price: '3650', percentChange: '2.82' },
      { number: '2', price: '3800', percentChange: '7.04' },
      { number: '3', price: '4100', percentChange: '15.49' }
    ],
    stopLosses: [
      { number: '1', price: '3450', percentChange: '-2.82' },
      { number: '2', price: '3350', percentChange: '-5.63' }
    ],
    prediction: 'Bullish',
    volumeRank: '2',
    totalPairs: '443',
    status: 'active',
    successRate: '88%',
    analyst: 'Maria Chen'
  },
  {
    id: 3,
    pair: 'SOLUSDT',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'High',
    riskReason: 'Approaching resistance level with recent volatility',
    entryPrice: '149.80',
    targets: [
      { number: '1', price: '155.40', percentChange: '3.74' },
      { number: '2', price: '165.30', percentChange: '10.35' }
    ],
    stopLosses: [
      { number: '1', price: '143.20', percentChange: '-4.41' }
    ],
    prediction: 'Bullish',
    volumeRank: '4',
    totalPairs: '443',
    status: 'completed',
    result: 'Target 1 Hit',
    successRate: '76%',
    analyst: 'David Williams'
  }
];

// Sample data untuk signal free
export const freeSignals = [
  {
    id: 1,
    pair: 'ADAUSDT',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'Medium',
    riskReason: 'Sideways consolidation, awaiting breakout',
    entryPrice: '0.4520',
    targets: [
      { number: '1', price: '0.4650', percentChange: '2.88' }
    ],
    stopLosses: [
      { number: '1', price: '0.4380', percentChange: '-3.10' }
    ],
    prediction: 'Bullish',
    volumeRank: '8',
    totalPairs: '443',
    status: 'active'
  },
  {
    id: 2,
    pair: 'DOTUSDT',
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'High',
    riskReason: 'Recent breakdown from support, looking for bounce',
    entryPrice: '6.85',
    targets: [
      { number: '1', price: '7.25', percentChange: '5.84' }
    ],
    stopLosses: [
      { number: '1', price: '6.55', percentChange: '-4.38' }
    ],
    prediction: 'Bullish',
    volumeRank: '12',
    totalPairs: '443',
    status: 'completed',
    result: 'Stop Loss Hit'
  }
];

// Data untuk histori signal
export const signalHistory = [
  {
    id: 1,
    pair: 'BNBUSDT',
    date: new Date(Date.now() - 604800000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'Low',
    riskReason: 'Strong support level and good volume',
    entryPrice: '572.35',
    targets: [
      { number: '1', price: '595.60', percentChange: '4.06' },
      { number: '2', price: '615.20', percentChange: '7.49' }
    ],
    stopLosses: [
      { number: '1', price: '552.00', percentChange: '-3.56' }
    ],
    prediction: 'Bullish',
    volumeRank: '3',
    totalPairs: '443',
    status: 'completed',
    result: 'Target 2 Hit',
    successRate: '85%',
    analyst: 'Sarah Johnson'
  },
  {
    id: 2,
    pair: 'AVAXUSDT',
    date: new Date(Date.now() - 1209600000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    riskLevel: 'Medium',
    riskReason: 'Testing previous resistance now as support',
    entryPrice: '32.85',
    targets: [
      { number: '1', price: '35.40', percentChange: '7.76' }
    ],
    stopLosses: [
      { number: '1', price: '30.50', percentChange: '-7.15' }
    ],
    prediction: 'Bullish',
    volumeRank: '9',
    totalPairs: '443',
    status: 'completed',
    result: 'Stop Loss Hit',
    successRate: '68%',
    analyst: 'Chris Kim'
  }
];
