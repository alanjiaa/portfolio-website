import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const ContactContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 120px 10% 60px;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 120px 5% 60px;
    align-items: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 3rem;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  text-align: left;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }
`;

const ContactLinks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  font-size: 1.2rem;
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  width: 100%;
  transition: transform 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: translateX(10px);
  }

  svg {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
`;

const Contact: React.FC = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ContactContainer theme={theme}>
      <Title
        theme={theme}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </Title>

      <ContactLinks
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ContactLink
          href="mailto:ad7691@nyu.edu"
          theme={theme}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiMail /> Email
        </ContactLink>

        <ContactLink
          href="https://github.com/alanjiaa"
          target="_blank"
          rel="noopener noreferrer"
          theme={theme}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiGithub /> GitHub
        </ContactLink>

        <ContactLink
          href="https://www.linkedin.com/in/alan-dong-9b935614b"
          target="_blank"
          rel="noopener noreferrer"
          theme={theme}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiLinkedin /> LinkedIn
        </ContactLink>
      </ContactLinks>
    </ContactContainer>
  );
};

export default Contact; 