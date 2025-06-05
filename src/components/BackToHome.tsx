import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const BackButton = styled(motion(Link))`
  position: fixed;
  top: 1rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  z-index: 1001;
  backdrop-filter: blur(5px);

  svg {
    font-size: 1.2rem;
  }
`;

const BackToHome: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  if (location.pathname === '/home') return null;

  return (
    <BackButton
      to="/home"
      theme={theme}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiArrowLeft /> Back to Home
    </BackButton>
  );
};

export default BackToHome; 