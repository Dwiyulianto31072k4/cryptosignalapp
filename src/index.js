import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add debugging logs
console.log('Index.js is loading');

// Get root element and create react root
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

// Check if rootElement exists
if (!rootElement) {
  console.error('ERROR: Root element not found in document. Make sure public/index.html has a div with id="root"');
  // Try to add root element if not found
  const app = document.createElement('div');
  app.id = 'root';
  document.body.appendChild(app);
  console.log('Created a root element dynamically');
}

// Create React root
const root = ReactDOM.createRoot(rootElement || document.getElementById('root'));
console.log('React root created');

// Render App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('App rendered');
