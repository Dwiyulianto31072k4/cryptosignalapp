import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import SignalCard from './SignalCard';
import StatsPanel from './StatsPanel'; // Import komponen StatsPanel
import { premiumSignals, freeSignals } from '../data/sampleSignals';

const CryptoSignalService = () => {
  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState('premium');
  
  return (
    <div className="bg-gray-900 text-white">
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Ganti Stats Cards dengan StatsPanel */}
        <StatsPanel />
        
        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-6">
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
            <SignalCard key={signal.id} signal={signal} isPremium={activeTab === 'premium'} />
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
      </main>
    </div>
  );
};

export default CryptoSignalService;
