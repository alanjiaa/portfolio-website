import { Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import { RoomModel } from './RoomModel';
import * as THREE from 'three';

const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 120px 10% 60px;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 120px 5% 60px;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ModelContainer = styled.div`
  flex: 1;
  height: 500px;
  width: 150%;
  position: relative;
  margin-left: -25%;
  
  @media (max-width: 1024px) {
    width: 120%;
    height: 500px;
    margin-left: -10%;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  > div, canvas {
    background: none !important;
    outline: none !important;
  }
`;

const Name = styled(motion.h1)`
  font-size: 5rem;
  margin: 0;
  font-weight: 700;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  margin: 0.5rem 0;
  opacity: 0.8;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LoadingText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: inherit;
`;

function LoadingScreen() {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={1}
      color="#000000"
      anchorX="center"
      anchorY="middle"
    >
      Loading...
    </Text>
  );
}

const Home = () => {
  const { theme } = useTheme();
  const cameraPosition = new THREE.Vector3(55, 1, 60);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <HomeContainer>
      <ContentContainer
        theme={theme}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Name variants={itemVariants}>
          Alan Dong
        </Name>
        <Title variants={itemVariants}>
          Software Engineer
        </Title>
        <Title variants={itemVariants}>
          Full Stack Web Developer
        </Title>
        <Title variants={itemVariants}>
          Musician
        </Title>
      </ContentContainer>
      
      <ModelContainer>
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={45}
            near={1}
            far={2000}
          />
          <ambientLight intensity={1} />
          <hemisphereLight
            intensity={1}
            groundColor="#b9b9b9"
            position={[0, 50, 0]}
          />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <directionalLight position={[-5, 8, -10]} intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          
          <Suspense fallback={<LoadingScreen />}>
            <RoomModel />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            target={[0, 0, 0]}
            maxDistance={100}
            minDistance={20}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </ModelContainer>
    </HomeContainer>
  );
};

export default Home; 