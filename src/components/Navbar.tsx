import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: transparent;
  z-index: 1001;
  backdrop-filter: blur(5px);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'light' ? 'var(--background-light)' : 'var(--background-dark)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 1000;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  font-size: 1.5rem;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const ThemeToggle = styled(IconButton)`
  margin-left: 2rem;
`;

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/home';

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <NavContainer theme={theme}>
        <NavLinks>
          {!isHome && <StyledLink to="/home" theme={theme}>Home</StyledLink>}
          <StyledLink to="/about" theme={theme}>About</StyledLink>
          <StyledLink to="/projects" theme={theme}>Projects</StyledLink>
          <StyledLink to="/contact" theme={theme}>Contact</StyledLink>
        </NavLinks>
        <ThemeToggle onClick={toggleTheme} theme={theme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </ThemeToggle>
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} theme={theme}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            theme={theme}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {!isHome && (
              <StyledLink to="/home" theme={theme} onClick={() => setIsMenuOpen(false)}>
                Home
              </StyledLink>
            )}
            <StyledLink to="/about" theme={theme} onClick={() => setIsMenuOpen(false)}>
              About
            </StyledLink>
            <StyledLink to="/projects" theme={theme} onClick={() => setIsMenuOpen(false)}>
              Projects
            </StyledLink>
            <StyledLink to="/contact" theme={theme} onClick={() => setIsMenuOpen(false)}>
              Contact
            </StyledLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 