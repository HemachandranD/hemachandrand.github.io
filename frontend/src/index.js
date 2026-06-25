import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Toaster } from './components/ui/sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <HashRouter>
        <App />
        <Toaster position="top-right" />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
