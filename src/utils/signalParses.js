/**
 * Fungsi untuk memparse teks signal crypto 
 * dan mengubahnya menjadi objek terstruktur
 */
export const parseSignalText = (text) => {
  if (!text.trim()) {
    return [];
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
      
      // Tambahkan status sebagai property baru untuk signal
      // Semua signal yang diparse akan memiliki status 'active'
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
        status: 'active', // Signal baru selalu active
        rawText: signalText
      };
    });
    
    return parsedResults;
  } catch (err) {
    console.error("Parsing error:", err);
    throw new Error("Error parsing signal data. Please check the format and try again.");
  }
};
