import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import BackToHome from './components/BackToHome';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --background-light: #f2e9d9;
    --background-dark: #121212;
    --text-light: #1a1a1a;
    --text-dark: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    background-color: var(--background-light);
    color: var(--text-light);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  [data-theme='dark'] body {
    background-color: var(--background-dark);
    color: var(--text-dark);
  }

  #root {
    min-height: 100vh;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    background-color: inherit;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        <Navbar />
        <BackToHome />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <MusicPlayer />
        <Analytics />
      </ThemeProvider>
    </Router>
  );
};

export default App;
