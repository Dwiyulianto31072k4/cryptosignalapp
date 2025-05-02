import { useState } from 'react';
import { TrendingUp, Clock, BarChart2, AlertTriangle, Award, Bell, Search, Users, Star, Zap, DollarSign, BarChart } from 'lucide-react';

// Komponen utama aplikasi
const CryptoSignalService = () => {
  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState('premium');
  
  // State untuk mode parsing (mode alternatif)
  const [isParsingMode, setIsParsingMode] = useState(false);
  
  // Data dummy untuk signal premium
  const premiumSignals = [
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
  
  // Data dummy untuk signal free
  const freeSignals = [
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
  
  // Komponen untuk parsing signal (fitur alternatif)
  const [inputText, setInputText] = useState('');
  const [parsedSignals, setParsedSignals] = useState([]);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  const parseSignalText = (text) => {
    // Ini adalah function parsing yang sama dengan yang Anda miliki
    // Saya menyingkatnya di sini, tapi dalam implementasi sebenarnya gunakan kode parsing Anda yang ada
    if (!text.trim()) {
      setParsedSignals([]);
      return;
    }
    
    // Contoh parsing sederhana (gunakan logika parsing Anda yang asli)
    const cleanText = text.trim();
    
    try {
      // Parsing logic will go here
      // Hasil dummy untuk demo
      const dummyResult = {
        id: Date.now(),
        pair: 'BTCUSDT',
        date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        volumeRank: '1',
        totalPairs: '443',
        riskLevel: 'Low',
        riskReason: 'Strong volume and momentum',
        entryPrice: '69200',
        targets: [
          { number: '1', price: '70500', percentChange: '1.88' },
          { number: '2', price: '72800', percentChange: '5.20' }
        ],
        stopLosses: [
          { number: '1', price: '68400', percentChange: '-1.16' }
        ],
        prediction: 'Bullish',
        rawText: cleanText
      };
      
      setParsedSignals([dummyResult]);
    } catch (err) {
      console.error("Parsing error:", err);
      setError("Error parsing signal data. Please check the format and try again.");
      setParsedSignals([]);
    }
  };
  
  const handleSubmitParsing = () => {
    parseSignalText(inputText);
  };
  
  const clearForm = () => {
    setInputText('');
    setParsedSignals([]);
    setError('');
  };
  
  // Render komponen utama
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header & Navigation */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <TrendingUp className="text-blue-400 mr-2" size={28} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CryptoSignalPro
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsParsingMode(false)}
              className={`px-4 py-2 rounded-md ${!isParsingMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Signal Service
            </button>
            <button
              onClick={() => setIsParsingMode(true)}
              className={`px-4 py-2 rounded-md ${isParsingMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Signal Parser
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <button className="bg-transparent hover:bg-gray-700 px-3 py-2 rounded-md text-sm flex items-center">
              <Bell size={16} className="mr-1" />
              Alerts
            </button>
            <button className="bg-transparent hover:bg-gray-700 px-3 py-2 rounded-md text-sm flex items-center">
              <Users size={16} className="mr-1" />
              Community
            </button>
            <button className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md text-sm">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {isParsingMode ? (
          // Signal Parser Mode
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Signal Parser Tool</h2>
              <p className="text-gray-400">Paste any crypto signal text to convert it to a visual card format</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Input Signal Text</h3>
                <textarea
                  className="w-full h-64 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  placeholder="Paste your signal text here..."
                  value={inputText}
                  onChange={handleInputChange}
                ></textarea>
                
                {error && (
                  <div className="bg-red-900 text-red-200 p-3 rounded-md mt-3 flex items-start">
                    <AlertTriangle size={18} className="mr-2 flex-shrink-0 mt-1" />
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleSubmitParsing}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Generate Cards
                  </button>
                  <button
                    type="button"
                    onClick={clearForm}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Generated Signal Card</h3>
                
                {parsedSignals.length === 0 ? (
                  <div className="bg-gray-700 rounded-lg p-8 border border-gray-600 text-center text-gray-400">
                    <BarChart2 size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No signal generated yet. Paste your signal text and click "Generate Cards".</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {parsedSignals.map(signal => (
                      <div
                        key={signal.id}
                        className="bg-gray-700 rounded-lg p-5 border border-gray-600 hover:border-blue-500 transition-colors duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{signal.pair}</h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              signal.riskLevel.toLowerCase() === 'low'
                                ? 'bg-green-900 text-green-300'
                                : signal.riskLevel.toLowerCase() === 'high'
                                ? 'bg-red-900 text-red-300'
                                : 'bg-yellow-800 text-yellow-300'
                            }`}
                          >
                            Risk: {signal.riskLevel}
                          </span>
                        </div>
                        
                        {/* Rest of the signal card UI - same as your original implementation */}
                        {/* This would include entry price, targets, etc. */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Signal Service Mode
          <div>
            {/* Hero Stats */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-400 text-sm">Total Signals</h3>
                    <BarChart className="text-blue-400" size={20} />
                  </div>
                  <p className="text-2xl font-bold mt-2">387</p>
                  <p className="text-green-400 text-sm mt-1">↑ 12% from last month</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-400 text-sm">Success Rate</h3>
                    <Award className="text-yellow-400" size={20} />
                  </div>
                  <p className="text-2xl font-bold mt-2">82.5%</p>
                  <p className="text-green-400 text-sm mt-1">↑ 3.2% from last month</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-400 text-sm">Active Signals</h3>
                    <Zap className="text-purple-400" size={20} />
                  </div>
                  <p className="text-2xl font-bold mt-2">14</p>
                  <p className="text-sm mt-1 text-gray-400">Updated 12 min ago</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-400 text-sm">Average Profit</h3>
                    <DollarSign className="text-green-400" size={20} />
                  </div>
                  <p className="text-2xl font-bold mt-2">8.7%</p>
                  <p className="text-green-400 text-sm mt-1">↑ 1.3% from last month</p>
                </div>
              </div>
            </div>
            
            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex space-x-2 mb-4 md:mb-0">
                <button
                  onClick={() => setActiveTab('premium')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'premium' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <Star size={16} className="inline mr-1" />
                  Premium Signals
                </button>
                <button
                  onClick={() => setActiveTab('free')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'free' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Free Signals
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  History
                </button>
              </div>
              
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search signals..."
                  className="bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            {/* Signal Cards */}
            <div className="space-y-4">
              {(activeTab === 'premium' ? premiumSignals : freeSignals).map(signal => (
                <div
                  key={signal.id}
                  className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="flex items-start mb-3 md:mb-0">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold mr-2">{signal.pair}</h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              signal.riskLevel.toLowerCase() === 'low'
                                ? 'bg-green-900 text-green-300'
                                : signal.riskLevel.toLowerCase() === 'high'
                                ? 'bg-red-900 text-red-300'
                                : 'bg-yellow-800 text-yellow-300'
                            }`}
                          >
                            Risk: {signal.riskLevel}
                          </span>
                        </div>
                        
                        <div className="text-gray-400 text-sm mt-1 flex items-center">
                          <Clock size={14} className="mr-1" /> {signal.date}
                          <span className="mx-2">•</span>
                          <BarChart2 size={14} className="mr-1" /> 
                          {signal.volumeRank !== "N/A" ? `Rank: ${signal.volumeRank}/${signal.totalPairs}` : "Rank: Unknown"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium mr-2 ${
                            signal.prediction === 'Bullish'
                              ? 'bg-green-900 text-green-300'
                              : signal.prediction === 'Bearish'
                              ? 'bg-red-900 text-red-300'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {signal.prediction}
                        </span>
                        
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            signal.status === 'active'
                              ? 'bg-blue-900 text-blue-300'
                              : signal.status === 'completed' && signal.result?.includes('Target')
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                          }`}
                        >
                          {signal.status === 'active' ? 'Active' : signal.result}
                        </span>
                      </div>
                      
                      {activeTab === 'premium' && (
                        <div className="text-sm text-gray-400">
                          <span className="text-yellow-400">{signal.successRate}</span> success rate • By {signal.analyst}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="text-gray-400 mb-1 text-sm">Entry Point:</div>
                      <div className="font-bold text-2xl text-white text-center p-3 bg-gray-800 rounded-lg border border-gray-600">
                        ${signal.entryPrice}
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="text-gray-400 mb-1 text-sm">Targets:</div>
                      <div className="space-y-1">
                        {signal.targets.map((target) => (
                          <div key={target.number} className="font-medium text-green-400 flex items-start">
                            <span className="text-xs bg-green-900 text-green-300 rounded px-1 mr-2">{target.number}</span> 
                            ${target.price} <span className="text-green-300 ml-2">(+{target.percentChange}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="text-gray-400 mb-1 text-sm">Stop Losses:</div>
                      <div className="space-y-1">
                        {signal.stopLosses.map((sl) => (
                          <div key={sl.number} className="font-medium text-red-400 flex items-start">
                            <span className="text-xs bg-red-900 text-red-300 rounded px-1 mr-2">{sl.number}</span> 
                            ${sl.price} <span className="text-red-300 ml-2">({sl.percentChange}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-700">
                    <p className="text-gray-300 text-sm">
                      {signal.riskReason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">Previous</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">1</button>
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">2</button>
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">3</button>
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">Next</button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CryptoSignalPro. All rights reserved. Trading signals are for informational purposes only.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Past performance does not guarantee future results. Always do your own research.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CryptoSignalService;
