import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import CSS files
import './css/bootstrap.min.css';
import './css/ares.css';

// Import images
import './img/bg_ares.jpg';
import './img/bg_circle_0.png';
import './img/vegaforce-logo.png';

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