import React, { useState, useEffect } from 'react';
import { BarChart2, Award, TrendingUp, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

const StatsPanel = () => {
  const [statsData, setStatsData] = useState({
    summary: {
      rataRataWinrate: '84.0%',
      totalTP: 541,
      totalSL: 92,
      totalSignals: 710,
      overallWinrate: '85.5%',
      completionRate: '89.2%'
    },
    dailyData: [
      { day: 24, date: '04/24-04/25', totalSignal: 153, tp: 131, sl: 8, winrate: '94.24%' },
      { day: 25, date: '04/25-04/26', totalSignal: 152, tp: 118, sl: 20, winrate: '85.51%' },
      { day: 26, date: '04/26-04/27', totalSignal: 75, tp: 51, sl: 21, winrate: '70.83%' },
      { day: 27, date: '04/27-04/28', totalSignal: 76, tp: 55, sl: 17, winrate: '76.39%' },
      { day: 28, date: '04/28-04/29', totalSignal: 76, tp: 56, sl: 12, winrate: '82.35%' },
      { day: 29, date: '04/29-04/30', totalSignal: 64, tp: 51, sl: 11, winrate: '82.26%' },
      { day: 30, date: '04/30-05/01', totalSignal: 114, tp: 79, sl: 3, winrate: '96.34%' }
    ]
  });
  
  const [timeFrame, setTimeFrame] = useState('week'); // 'week' atau 'month'
  const [loading, setLoading] = useState(false);
  
  // Di implementasi sebenarnya, Anda akan memanggil API untuk mengambil data dari Google Sheets
  // Karena ini adalah UI mockup, kita menggunakan data statis
  
  return (
    <div>
      {/* Tabs untuk memilih jangka waktu */}
      <div className="flex mb-4 bg-gray-800 rounded-lg p-2">
        <button
          onClick={() => setTimeFrame('week')}
          className={`px-4 py-2 rounded-md mr-2 ${timeFrame === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          <Calendar size={16} className="inline mr-1" />
          Seminggu Terakhir
        </button>
        <button
          onClick={() => setTimeFrame('month')}
          className={`px-4 py-2 rounded-md ${timeFrame === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          <Calendar size={16} className="inline mr-1" />
          Sebulan Terakhir
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Ringkasan Statistik</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 text-sm">Rata-rata Winrate</h3>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Award className="text-green-400" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              {statsData.summary.rataRataWinrate}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 text-sm">Total TP</h3>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CheckCircle className="text-blue-400" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {statsData.summary.totalTP}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 text-sm">Total SL</h3>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="text-red-400" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {statsData.summary.totalSL}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 text-sm">Total Signals</h3>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BarChart2 className="text-purple-400" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {statsData.summary.totalSignals}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 text-sm">Overall Winrate</h3>
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <TrendingUp className="text-yellow-400" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {statsData.summary.overallWinrate}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50 shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 text-sm">Completion Rate</h3>
              <div className="p-2 bg-teal-500/10 rounded-lg">
                <DollarSign className="text-teal-400" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              {statsData.summary.completionRate}
            </p>
          </div>
        </div>
      </div>
      
      {/* Data Harian */}
      <div>
        <h2 className="text-xl font-bold mb-4">Data 7 Hari Terakhir</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-xl border border-gray-700/50 shadow-md">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-gray-400">Hari</th>
                <th className="px-4 py-3 text-left text-gray-400">Tanggal</th>
                <th className="px-4 py-3 text-left text-gray-400">Total Signal</th>
                <th className="px-4 py-3 text-left text-gray-400">TP</th>
                <th className="px-4 py-3 text-left text-gray-400">SL</th>
                <th className="px-4 py-3 text-left text-gray-400">Winrate</th>
              </tr>
            </thead>
            <tbody>
              {statsData.dailyData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'}>
                  <td className="px-4 py-3">{row.day}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.totalSignal}</td>
                  <td className="px-4 py-3 text-blue-400">{row.tp}</td>
                  <td className="px-4 py-3 text-red-400">{row.sl}</td>
                  <td className="px-4 py-3">
                    <span className={parseFloat(row.winrate) > 80 ? 'text-green-400' : 
                                  parseFloat(row.winrate) > 70 ? 'text-yellow-400' : 'text-red-400'}>
                      {row.winrate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
