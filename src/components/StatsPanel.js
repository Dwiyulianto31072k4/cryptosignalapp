import React, { useState, useEffect } from 'react';
import { BarChart2, Award, TrendingUp, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const StatsPanel = () => {
  const [statsData, setStatsData] = useState({
    summary: {
      rataRataWinrate: '0%',
      totalTP: 0,
      totalSL: 0,
      totalSignals: 0,
      overallWinrate: '0%',
      completionRate: '0%'
    },
    dailyData: []
  });
  
  const [timeFrame, setTimeFrame] = useState('week'); // 'week' atau 'month'
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchSheetData();
  }, [timeFrame]);
  
  const fetchSheetData = async () => {
    setLoading(true);
    try {
      // Spreadsheet ID dari URL
      const spreadsheetId = '1g3XL1EllHoWV3jhmi7gT3at6MtCNTJBo8DQ1WyWhMEo';
      
      // Mengakses spreadsheet publik dalam format CSV
      // Ini akan bekerja jika spreadsheet sudah dipublikasikan ke web
      const publicSheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
      
      const response = await axios.get(publicSheetUrl);
      const csvData = response.data;
      
      // Parse CSV data
      const parsedData = parseCSVData(csvData, timeFrame);
      setStatsData(parsedData);
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      // Jika terjadi error, set data kosong
      setStatsData({
        summary: {
          rataRataWinrate: 'N/A',
          totalTP: 0,
          totalSL: 0,
          totalSignals: 0,
          overallWinrate: 'N/A',
          completionRate: 'N/A'
        },
        dailyData: []
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Function untuk parse data CSV
  const parseCSVData = (csvString, timeFrame) => {
    // Split CSV string menjadi baris
    const rows = csvString.split('\n');
    
    // Parse header
    const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));
    
    // Parse rows data
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue;
      
      const values = rows[i].split(',').map(value => value.trim().replace(/"/g, ''));
      const rowData = {};
      
      headers.forEach((header, index) => {
        rowData[header] = values[index];
      });
      
      data.push(rowData);
    }
    
    // Filter data berdasarkan timeFrame
    const filteredData = data.filter(row => {
      // Parse date dari format yang ada di spreadsheet
      const rowDate = new Date(row.Date_display);
      
      if (timeFrame === 'week') {
        // Filter untuk 7 hari terakhir
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return rowDate >= weekAgo;
      } else {
        // Filter untuk 30 hari terakhir
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        return rowDate >= monthAgo;
      }
    });
    
    // Hitung summary dari data yang difilter
    let totalSignals = 0;
    let totalTP = 0;
    let totalSL = 0;
    let totalWinrate = 0;
    
    filteredData.forEach(row => {
      totalSignals += parseInt(row.Total_Signal || 0);
      totalTP += parseInt(row.TP || 0);
      totalSL += parseInt(row.SL || 0);
      totalWinrate += parseFloat(row.Winrate_pct?.replace('%', '') || 0);
    });
    
    const avgWinrate = filteredData.length > 0 ? totalWinrate / filteredData.length : 0;
    const overallWinrate = totalSignals > 0 ? (totalTP / totalSignals) * 100 : 0;
    const completionRate = totalSignals > 0 ? ((totalTP + totalSL) / totalSignals) * 100 : 0;
    
    // Format data untuk tampilan di UI
    const dailyData = filteredData.map(row => ({
      day: row.day,
      date: row.Date_display,
      totalSignal: parseInt(row.Total_Signal || 0),
      tp: parseInt(row.TP || 0),
      sl: parseInt(row.SL || 0),
      winrate: row.Winrate_pct || '0%'
    }));
    
    // Ambil 7 hari terakhir saja untuk tabel
    const recentDailyData = dailyData.slice(0, 7);
    
    return {
      summary: {
        rataRataWinrate: `${avgWinrate.toFixed(1)}%`,
        totalTP,
        totalSL,
        totalSignals,
        overallWinrate: `${overallWinrate.toFixed(1)}%`,
        completionRate: `${completionRate.toFixed(1)}%`
      },
      dailyData: recentDailyData
    };
  };
  
  return (
    <div>
      {/* Menampilkan indikator loading */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-400">Loading data...</span>
        </div>
      )}
      
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
