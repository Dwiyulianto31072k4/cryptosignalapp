import React, { useState } from 'react';
import { BarChart2, AlertTriangle } from 'lucide-react';
import SignalCard from './SignalCard';
import { parseSignalText } from '../utils/signalParser';

const CryptoSignalParser = () => {
  const [inputText, setInputText] = useState('');
  const [parsedSignals, setParsedSignals] = useState([]);
  const [error, setError] = useState('');

  console.log('CryptoSignalParser component is rendering');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    try {
      if (!inputText.trim()) {
        setParsedSignals([]);
        setError("Please enter signal text to parse");
        return;
      }

      // Gunakan fungsi parsing dari utils
      const signals = parseSignalText(inputText);
      setParsedSignals(signals);
      setError('');
      console.log('Parsed signals:', signals.length);
    } catch (err) {
      console.error("Parsing error:", err);
      setError("Error parsing signal data. Please check the format and try again.");
      setParsedSignals([]);
    }
  };

  const clearForm = () => {
    setInputText('');
    setParsedSignals([]);
    setError('');
  };
  
  // Helper function to display sample text
  const useSampleText = () => {
    const sampleText = `HMSTRUSDT Volume(24H) Ranked: 314th/443
Risk Level: High - The volume rank outside the top 150. (成交量排名在150名外)
Entry: 0.00263
Target 1: 0.00265
Target 2: 0.00267
Target 3: 0.00273
Target 4: 0.00284
Stop loss 1: 0.00257
Stop loss 2: 0.00246`;
    setInputText(sampleText);
    
    // Gunakan fungsi parseSignalText untuk konsistensi
    const signals = parseSignalText(sampleText);
    setParsedSignals(signals);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Crypto Signal Parser
        </h1>
        <p className="text-gray-400">Paste your signal text below to convert it to visual cards</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Input Signal Text</h2>
          <div>
            <textarea
              className="w-full h-64 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
              placeholder="Paste your signal text here... Example:
BTCUSDT Volume(24H) Ranked: 1st/443
Risk Level: Low - Strong volume and momentum.
Entry: 70200
Target 1: 71500
Target 2: 72800
Target 3: 74200
Target 4: 76000
Stop loss 1: 69100
Stop loss 2: 68200"
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
                onClick={handleSubmit}
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
              <button
                type="button"
                onClick={useSampleText}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md"
              >
                Load Sample
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Generated Signal Cards</h2>
          
          {parsedSignals.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center text-gray-400">
              <BarChart2 size={48} className="mx-auto mb-3 opacity-50" />
              <p>No signals generated yet. Paste your signal text and click "Generate Cards".</p>
            </div>
          ) : (
            <div className="space-y-4">
              {parsedSignals.map(signal => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          )}
        </div>
      </div>

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

export default CryptoSignalParser;
