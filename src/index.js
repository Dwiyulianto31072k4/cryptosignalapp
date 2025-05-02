import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Index.js is loading');

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

const root = ReactDOM.createRoot(rootElement);
console.log('React root created');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('App rendered');
