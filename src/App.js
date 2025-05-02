import React, { useState } from 'react';
import './App.css';
import CryptoSignalService from './components/CryptoSignalService';
import CryptoSignalParser from './components/CryptoSignalParser';
import { TrendingUp } from 'lucide-react';

function App() {
  console.log('App.js is rendering');
  const [activeMode, setActiveMode] = useState('service'); // 'service' atau 'parser'
  
  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <TrendingUp className="text-blue-400 mr-2" size={24} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CryptoSignalPro
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveMode('service')}
              className={`px-4 py-2 rounded-md ${activeMode === 'service' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Signal Service
            </button>
            <button
              onClick={() => setActiveMode('parser')}
              className={`px-4 py-2 rounded-md ${activeMode === 'parser' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Signal Parser
            </button>
          </div>
        </div>
      </header>

      <main>
        {activeMode === 'service' ? (
          <CryptoSignalService />
        ) : (
          <CryptoSignalParser />
        )}
      </main>
      
      {/* Footer - Common for both modes */}
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
}

export default App;
