import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 10% 60px;
  background-color: inherit;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const Header = styled(motion.h1)`
  font-size: 4rem;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
`;

const SectionContent = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  color: ${props => props.theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)'};
  opacity: 0.9;
`;

const About: React.FC = () => {
  const { theme } = useTheme();

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
    <AboutContainer theme={theme}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeaderSection>
          <ProfileImage 
            variants={itemVariants}
            theme={theme}
          >
            <img 
              src="/images/about-profile.jpg"
              alt="Alan Dong"
              loading="lazy"
            />
          </ProfileImage>
          <Header variants={itemVariants} theme={theme}>
            About Me
          </Header>
        </HeaderSection>

        <Section variants={itemVariants}>
          <SectionTitle theme={theme}>Software Development</SectionTitle>
          <SectionContent theme={theme}>
            My journey in software development began with a fascination for problem-solving and love for technology since I was a child. From creating makeshift portable game consoles as an eight year old, to building modern websites serving tens of thousands of users, my original creative approach to problem solving has not changed.
            <br />
            <br />
            This led me to pursue a formal Bachelors of Science in Computer Science  from 2019 to 2022, where I achieved First Class honors. One month after graduating, I started my first full-time industry job as a Full Stack Developer for a mid-sized construction company called Croudace Homes in the UK. During my time at Croudace, I was the lead developer for the main customer facing website, as well as the corporate site, in-house CRM, and CMS systems. I was also part of the flagship project of the company, called Croudace Connect. I gained invaluable experience here, and am very grateful to the senior developers who helped solidify my knowledge on best practises.
            <br />
            <br />
            After two years working as an industry software developer, I decided to pursue a MS in Project Management to further improve on soft skills needed in the business world, such as presenting, managing projects, and leadership. In my free time however, I spend many hours on personal projects and new mobile and web app ideas.
            Overall, I have solid experience in full-stack development, stemming from both work experience and personal projects, with an expertise in modern web technologies and a passion for delivering excellent user experiences.
          </SectionContent>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle theme={theme}>Music Production</SectionTitle>
          <SectionContent theme={theme}>
            From the age of 6, I would play around with my family's old keyboard and learn how to play songs by ear. My love for music has only grown since then, and in 2018, a friend introduced me to FL Studio. I taught myself how to use the software and started making music under the name "Uptempo". Since then, I have sold hundreds of beats to independent artists around the world. I have also collaborated with artists and producers, and ammassed over 5 million streams. I still make music frequently to this day, and plan to develop my own web platform to sell my beats passively and have control over my own distribution. My music can be found on <a href="https://www.youtube.com/@UptempoBeats" target='_blank'>Youtube</a>, <a href="https://soundcloud.com/uptempobeat/sets/prod-uptempobeats-1" target='_blank'>Soundcloud</a>, and beats on <a href="https://traktrain.com/uptempo" target='_blank'>Traktrain</a>.
          </SectionContent>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle theme={theme}>Other Interests</SectionTitle>
          <SectionContent theme={theme}>
            Beyond coding and music, I'm passionate about fitness and maintaining a healthy lifestyle. I go to the gym 5-6 times a week, and play racquet sports such as tennis and squash occasionally. I also enjoy solving rubik's cubes, and have an average 3x3 solve time of 50 seconds.
          </SectionContent>
        </Section>
      </motion.div>
    </AboutContainer>
  );
};

export default About; 