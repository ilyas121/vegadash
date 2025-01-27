import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import only the CSS files that exist
import '../dist/css/bootstrap.min.css';
import '../dist/css/ares.css';

const container = document.getElementById('root');
const root = createRoot(container);

const render = () => {
  root.render(<App />);
};

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('Hot reloading App...');
    render();
  });
}