import React from 'react';
import './App.css';
import CryptoSignalParser from './components/CryptoSignalParser';

function App() {
  console.log('App.js is rendering');
  return (
    <div className="App">
      <CryptoSignalParser />
    </div>
  );
}

export default App;
