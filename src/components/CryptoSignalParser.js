import React, { useState } from 'react';
import { TrendingUp, Clock, BarChart2, AlertTriangle } from 'lucide-react';

const CryptoSignalParser = () => {
  const [inputText, setInputText] = useState('');
  const [parsedSignals, setParsedSignals] = useState([]);
  const [error, setError] = useState('');

  console.log('CryptoSignalParser component is rendering');

  // Parse the input text into structured data
  const parseSignalText = (text) => {
    setError('');
    console.log('Parsing signal text:', text.substring(0, 50) + '...');
    
    if (!text.trim()) {
      setParsedSignals([]);
      return;
    }
    
    try {
      // Handle different possible formats 
      // First clean up the text and normalize line breaks
      const cleanText = text.trim().replace(/\r\n/g, '\n');
      
      // We'll process the entire text as a single signal if it appears to be one
      let singleSignal = true;
      
      // Check if this contains multiple signals (check for multiple pairs)
      const pairMatches = cleanText.match(/[A-Z0-9]+USDT/g);
      if (pairMatches && pairMatches.length > 1) {
        singleSignal = false;
      }
      
      let signalTexts = [];
      if (singleSignal) {
        // Process as a single signal
        signalTexts = [cleanText];
      } else {
        // Try to split by common markers of a new signal
        // Look for patterns like new pair names at the beginning of a line
        const splitByPair = cleanText.split(/\n(?=[A-Z0-9]+USDT)/);
        if (splitByPair.length > 1) {
          signalTexts = splitByPair;
        } else {
          // Fall back to splitting by blank lines
          signalTexts = cleanText.split(/\n\s*\n/).filter(t => t.trim());
        }
      }
      
      const parsedResults = signalTexts.map((signalText, index) => {
        // Extract pair - more aggressively look for USDT pairs
        let pair = `Unknown${index}`;
        const pairMatch = signalText.match(/([A-Z0-9]+USDT)/);
        if (pairMatch) {
          pair = pairMatch[1];
        }
        
        // Extract volume rank - handling more formats
        let volumeRank = "N/A";
        let totalPairs = "N/A";
        const volumeRankMatch = signalText.match(/Ranked:\s*(\d+)(?:st|nd|rd|th)?\/(\d+)/);
        if (volumeRankMatch) {
          volumeRank = volumeRankMatch[1];
          totalPairs = volumeRankMatch[2];
        } else {
          // Try alternative format
          const altVolumeMatch = signalText.match(/Rank(?:ed)?:?\s*(\d+)(?:st|nd|rd|th)?(?:\/|\s+of\s+)(\d+)/i);
          if (altVolumeMatch) {
            volumeRank = altVolumeMatch[1];
            totalPairs = altVolumeMatch[2];
          }
        }
        
        // Extract risk level - more flexible matching
        let riskLevel = "Unknown";
        const riskLevelMatch = signalText.match(/Risk\s+Level:?\s*(\w+)/i);
        if (riskLevelMatch) {
          riskLevel = riskLevelMatch[1];
        } else if (signalText.match(/Risk:?\s*High/i)) {
          riskLevel = "High";
        } else if (signalText.match(/Risk:?\s*Medium/i)) {
          riskLevel = "Medium";
        } else if (signalText.match(/Risk:?\s*Low/i)) {
          riskLevel = "Low";
        }
        
        // Extract risk reason
        let riskReason = "";
        const riskReasonMatch = signalText.match(/Risk\s+Level:?\s*\w+\s*-\s*([^(]+)/i);
        if (riskReasonMatch) {
          riskReason = riskReasonMatch[1].trim();
        } else {
          // Try alternative format
          const altReasonMatch = signalText.match(/Risk:?\s*\w+\s*-\s*([^(]+)/i);
          if (altReasonMatch) {
            riskReason = altReasonMatch[1].trim();
          }
        }
        
        // Extract entry price - more flexible matching
        let entryPrice = "N/A";
        const entryMatch = signalText.match(/Entry:?\s*([\d.]+)/i);
        if (entryMatch) {
          entryPrice = entryMatch[1];
        }
        
        // Extract targets - more flexible matching
        const targetMatches = [
          ...signalText.matchAll(/Target\s*(\d+):?\s*([\d.]+)/gi),
          ...signalText.matchAll(/T(\d+):?\s*([\d.]+)/gi)  // Handle T1, T2 format
        ];
        
        const targets = targetMatches.map(match => {
          const targetPrice = match[2];
          let percentChange = "N/A";
          
          // Calculate percentage change if entry price is available
          if (entryPrice !== "N/A" && !isNaN(parseFloat(entryPrice)) && !isNaN(parseFloat(targetPrice))) {
            const entryValue = parseFloat(entryPrice);
            const targetValue = parseFloat(targetPrice);
            percentChange = (((targetValue - entryValue) / entryValue) * 100).toFixed(2);
          }
          
          return {
            number: match[1],
            price: targetPrice,
            percentChange: percentChange
          };
        });
        
        // Extract stop losses - more flexible matching
        const stopLossMatches = [
          ...signalText.matchAll(/Stop\s*loss\s*(\d+):?\s*([\d.]+)/gi),
          ...signalText.matchAll(/SL(\d+):?\s*([\d.]+)/gi)  // Handle SL1, SL2 format
        ];
        
        const stopLosses = stopLossMatches.map(match => {
          const slPrice = match[2];
          let percentChange = "N/A";
          
          // Calculate percentage change if entry price is available
          if (entryPrice !== "N/A" && !isNaN(parseFloat(entryPrice)) && !isNaN(parseFloat(slPrice))) {
            const entryValue = parseFloat(entryPrice);
            const slValue = parseFloat(slPrice);
            percentChange = (((slValue - entryValue) / entryValue) * 100).toFixed(2);
          }
          
          return {
            number: match[1],
            price: slPrice,
            percentChange: percentChange
          };
        });
        
        // Determine prediction based on entry price and targets
        let prediction = "Neutral";
        if (targets.length > 0 && entryPrice !== "N/A") {
          const entryNum = parseFloat(entryPrice);
          const targetNum = parseFloat(targets[0].price);
          
          if (!isNaN(entryNum) && !isNaN(targetNum)) {
            prediction = targetNum > entryNum ? "Bullish" : (targetNum < entryNum ? "Bearish" : "Neutral");
          }
        }
        
        return {
          id: Date.now() + index,
          pair,
          date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          volumeRank,
          totalPairs,
          riskLevel,
          riskReason,
          entryPrice,
          targets,
          stopLosses,
          prediction,
          rawText: signalText
        };
      });
      
      setParsedSignals(parsedResults);
      console.log('Parsed signals:', parsedResults.length);
    } catch (err) {
      console.error("Parsing error:", err);
      setError("Error parsing signal data. Please check the format and try again.");
      setParsedSignals([]);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    parseSignalText(inputText);
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
    // Auto-parse the sample text
    parseSignalText(sampleText);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Crypto Signal Auto Parser
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
                <div
                  key={signal.id}
                  className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors duration-200 mb-4"
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
                  
                  <div className="text-gray-400 text-sm mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" /> {signal.date}
                    </div>
                    <div className="flex items-center">
                      <BarChart2 size={14} className="mr-1" /> 
                      {signal.volumeRank !== "N/A" ? `Rank: ${signal.volumeRank}/${signal.totalPairs}` : "Rank: Unknown"}
                    </div>
                  </div>
                  
                  <div className="mb-2 flex items-center justify-end">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        signal.prediction === 'Bullish'
                          ? 'bg-green-900 text-green-300'
                          : signal.prediction === 'Bearish'
                          ? 'bg-red-900 text-red-300'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {signal.prediction}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-3 text-sm border-b border-gray-700 pb-3">
                    {signal.riskReason || "Tidak ada catatan tambahan"}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3 text-sm mb-4">
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="text-gray-400 mb-1 text-sm">Entry Point:</div>
                      <div className="font-bold text-2xl text-white text-center p-3 bg-gray-800 rounded-lg border border-gray-600">
                        {signal.entryPrice !== "N/A" ? `${signal.entryPrice}` : "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400 mb-1 text-xs">Targets:</div>
                      <div className="space-y-1">
                        {signal.targets.length > 0 ? (
                          signal.targets.map((target) => (
                            <div key={target.number} className="font-medium text-green-400 flex items-start">
                              <span className="text-xs bg-green-900 text-green-300 rounded px-1 mr-2">{target.number}</span> ${target.price}
                            </div>
                          ))
                        ) : (
                          <div className="font-medium text-gray-400">No targets specified</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 mb-1 text-xs">Stop Losses:</div>
                      <div className="space-y-1">
                        {signal.stopLosses.length > 0 ? (
                          signal.stopLosses.map((sl) => (
                            <div key={sl.number} className="font-medium text-red-400 flex items-start">
                              <span className="text-xs bg-red-900 text-red-300 rounded px-1 mr-2">{sl.number}</span> ${sl.price}
                            </div>
                          ))
                        ) : (
                          <div className="font-medium text-gray-400">No stop losses specified</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 text-sm mt-4">
                    {/* Price Change Table */}
                    {signal.entryPrice !== "N/A" && (
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-base font-semibold mb-4 text-center">
                          Targets & Stop Losses
                        </h4>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-600">
                                <th className="text-left py-2">Level</th>
                                <th className="text-left py-2">Harga</th>
                                <th className="text-left py-2">% Perubahan dari Entry</th>
                              </tr>
                            </thead>
                            <tbody>
                              {signal.targets.map((target) => (
                                <tr key={`target-${target.number}`} className="border-b border-gray-600">
                                  <td className="py-2 flex items-center">
                                    <span className="text-xs bg-green-900 text-green-300 rounded px-1 mr-2">{target.number}</span> Target
                                  </td>
                                  <td className="py-2 text-green-400">${target.price}</td>
                                  <td className={`py-2 ${parseFloat(target.percentChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {parseFloat(target.percentChange) >= 0 ? '+' : ''}{target.percentChange}%
                                  </td>
                                </tr>
                              ))}
                              
                              {signal.stopLosses.map((sl) => (
                                <tr key={`sl-${sl.number}`} className="border-b border-gray-600">
                                  <td className="py-2 flex items-center">
                                    <span className="text-xs bg-red-900 text-red-300 rounded px-1 mr-2">{sl.number}</span> SL
                                  </td>
                                  <td className="py-2 text-red-400">${sl.price}</td>
                                  <td className={`py-2 ${parseFloat(sl.percentChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {parseFloat(sl.percentChange) >= 0 ? '+' : ''}{sl.percentChange}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoSignalParser;
