import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProjectsContainer = styled.div`
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
  
  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:hover ${ProjectImage} {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  opacity: 0.9;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme === 'light' ? 'var(--background-light)' : 'var(--background-dark)'};
  padding: 2rem;
  border-radius: 1rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  cursor: pointer;
  font-size: 1.5rem;
`;

const ImageGallery = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
`;

const CarouselContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
`;

const CarouselImageContainer = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 200px;
  flex-shrink: 0;
  cursor: pointer;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

interface StyledButtonProps {
  theme: 'light' | 'dark';
}

const CarouselButton = styled.button.attrs<StyledButtonProps>(() => ({
  type: 'button'
}))<StyledButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  color: ${props => props.theme === 'light' ? '#ffffff' : '#000000'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: opacity 0.3s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
`;

const RegularImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const RegularProjectImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

interface Project {
  id: number;
  title: string;
  description: string;
  previewImage: string;
  images: string[];
  fullDescription: string;
  websiteUrl?: string;  // Optional website URL
}

const projects: Project[] = [
  {
    id: 1,
    title: "Croudace Homes (2022-2024)",
    description: "Primary customer-facing website for Croudace Homes, a construction company based in the UK",
    previewImage: "/images/project-images/croudace-preview.jpg",
    images: ["/images/project-images/croudace1.png", "/images/project-images/croudace2.png"],
    fullDescription: "The web application was built using the .NET Framework and MSSQL. I was the lead developer for this application and frequently liased with the marketing department to ensure the website was up to date with new features and content. During my time working on this, I also introduced a master copy of the website and enforced a style guide, as well as version control (TFS).",
    websiteUrl: "https://croudacehomes.co.uk"
  },
  {
    id: 2,
    title: "Croudace Connect (2023-2024)",
    description: "Flagship project for Croudace Homes, modernising the company's core business processes",
    previewImage: "/images/project-images/croudace-connect-logo.png",
    images: ["/images/project-images/croudaceconnect1.png", "/images/project-images/croudaceconnect2.png"],
    fullDescription: "Played a pivotal role in the development of Croudace Connect, the company's flagship project designed to seamlessly integrate every facet of the home construction and purchasing journey with a new all-in-one web application for homebuyers. We worked in a team of 4 with an Agile approach to development, using Azure DevOps for version control and sprint planning. The application was built using the .NET CORE Framework and MSSQL.",
    websiteUrl: "https://croudaceconnect.co.uk"
  },
  {
    id: 3,
    title: "BeBe World (2024-Ongoing)",
    description: "A personal project built with love, including shopping, checkout, user authentication, gallery, and email sending functionality",
    previewImage: "/images/project-images/bebelogo.png",
    images: ["/images/project-images/bebe1.png", "/images/project-images/bebe2.png", "/images/project-images/bebe3.png", "/images/project-images/bebe4.png", "/images/project-images/bebe5.png"],
    fullDescription: "Bebe world is a personal project I created for my girlfriend and I, who are doing long distance. It is an ongoing project which I update regularly with new features and content. Built using NextJS, FireBase, and deployed on Vercel.",
    websiteUrl: "https://bebe-anniversary.vercel.app/home"
  },
  // Add more projects here
];

// Add new styled components for the full-size image view
const FullSizeImageModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  cursor: pointer;
`;

const FullSizeImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  color: ${props => props.theme === 'light' ? 'var(--background-light)' : 'var(--background-dark)'};
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? prev : prev + 1
      );
    }
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => prev === 0 ? prev : prev - 1);
  };

  // Reset current image index when selecting a new project
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  return (
    <ProjectsContainer theme={theme}>
      <Title
        theme={theme}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </Title>

      <ProjectGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            theme={theme}
            onClick={() => setSelectedProject(project)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProjectImage 
              src={project.previewImage}
              alt={project.title}
              loading="lazy"
            />
            <ProjectInfo>
              <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
              <ProjectDescription theme={theme}>{project.description}</ProjectDescription>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              theme={theme}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <CloseButton theme={theme} onClick={() => setSelectedProject(null)}>
                <FiX />
              </CloseButton>
              <ProjectTitle theme={theme}>{selectedProject.title}</ProjectTitle>
              <ProjectDescription theme={theme}>
                {selectedProject.fullDescription}
              </ProjectDescription>
              <ImageGallery>
                {selectedProject.images.length <= 2 ? (
                  // Regular grid layout for 2 or fewer images
                  <RegularImageGrid>
                    {selectedProject.images.map((image, index) => (
                      <RegularProjectImage
                        key={index}
                        src={image}
                        alt={`${selectedProject.title} ${index + 1}`}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedImage(image);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    ))}
                  </RegularImageGrid>
                ) : (
                  // Carousel layout for more than 2 images
                  <>
                    <CarouselContainer
                      animate={{ x: `calc(-${currentImageIndex * 100}% - ${currentImageIndex}rem)` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {selectedProject.images.map((image, index) => (
                        <CarouselImageContainer
                          key={index}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            setSelectedImage(image);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CarouselImage
                            src={image}
                            alt={`${selectedProject.title} ${index + 1}`}
                          />
                        </CarouselImageContainer>
                      ))}
                    </CarouselContainer>
                    <CarouselButton
                      className="prev"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      disabled={currentImageIndex === 0}
                      theme={theme}
                    >
                      <FiChevronLeft size={24} />
                    </CarouselButton>
                    <CarouselButton
                      className="next"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      disabled={currentImageIndex === selectedProject.images.length - 1}
                      theme={theme}
                    >
                      <FiChevronRight size={24} />
                    </CarouselButton>
                  </>
                )}
              </ImageGallery>
              {selectedProject.websiteUrl && (
                <ProjectLinks>
                  <ProjectLink 
                    href={selectedProject.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    theme={theme}
                  >
                    Visit Website
                  </ProjectLink>
                </ProjectLinks>
              )}
            </ModalContent>
          </Modal>
        )}

        {selectedImage && (
          <FullSizeImageModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <FullSizeImage
              src={selectedImage}
              alt="Full size project image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </FullSizeImageModal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects; 