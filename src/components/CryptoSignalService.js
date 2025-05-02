import React, { useState } from 'react';
import { Clock, BarChart2, Award, Bell, Search, Users, Star, Zap, DollarSign } from 'lucide-react';
import SignalCard from './SignalCard';
import { premiumSignals, freeSignals } from '../data/sampleSignals';

const CryptoSignalService = () => {
  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState('premium');
  
  return (
    <div className="bg-gray-900 text-white">
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Hero Stats */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Total Signals</h3>
                <BarChart2 className="text-blue-400" size={20} />
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
