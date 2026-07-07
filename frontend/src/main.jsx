import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import './index.css';
import App from './App';
import { Toaster } from './components/ui/sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {/* reducedMotion="user" makes every Framer animation respect the
          OS-level prefers-reduced-motion setting */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  </React.StrictMode>
);
