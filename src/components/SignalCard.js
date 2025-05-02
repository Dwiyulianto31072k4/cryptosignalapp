import React from 'react';
import { Clock, BarChart2 } from 'lucide-react';

// Komponen SignalCard yang dapat digunakan di layanan dan parser
const SignalCard = ({ signal, isPremium = false }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors duration-200">
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
            
            {signal.status && (
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
            )}
          </div>
          
          {isPremium && signal.successRate && (
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
            {signal.targets && signal.targets.length > 0 ? (
              signal.targets.map((target) => (
                <div key={target.number} className="font-medium text-green-400 flex items-start">
                  <span className="text-xs bg-green-900 text-green-300 rounded px-1 mr-2">{target.number}</span> 
                  ${target.price} <span className="text-green-300 ml-2">(+{target.percentChange}%)</span>
                </div>
              ))
            ) : (
              <div className="font-medium text-gray-400">No targets specified</div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1 text-sm">Stop Losses:</div>
          <div className="space-y-1">
            {signal.stopLosses && signal.stopLosses.length > 0 ? (
              signal.stopLosses.map((sl) => (
                <div key={sl.number} className="font-medium text-red-400 flex items-start">
                  <span className="text-xs bg-red-900 text-red-300 rounded px-1 mr-2">{sl.number}</span> 
                  ${sl.price} <span className="text-red-300 ml-2">({sl.percentChange}%)</span>
                </div>
              ))
            ) : (
              <div className="font-medium text-gray-400">No stop losses specified</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-700">
        <p className="text-gray-300 text-sm">
          {signal.riskReason || "No additional notes"}
        </p>
      </div>
    </div>
  );
};

export default SignalCard;
