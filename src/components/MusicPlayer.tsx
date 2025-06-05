import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMusic, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PlayerContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${props => props.theme === 'light' ? 'rgba(255, 253, 250, 0.9)' : 'rgba(20, 20, 20, 0.9)'};
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${props => props.theme === 'light' 
    ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
    : '0 4px 6px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 250px;
  z-index: 100;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CollapsedPlayer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${props => props.theme === 'light' ? 'rgba(255, 253, 250, 0.9)' : 'rgba(20, 20, 20, 0.9)'};
  padding: 1rem;
  border-radius: 50%;
  box-shadow: ${props => props.theme === 'light' 
    ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
    : '0 4px 6px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'light' ? '#ffffff' : '#000000'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  pointer-events: none;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TrackInfo = styled.div`
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const TrackSelect = styled.select`
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;

  option {
    background: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
    color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VolumeControl = styled.input`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  border-radius: 2px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
    cursor: pointer;
    border: none;
  }
`;

const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const PlayerTitle = styled.span`
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  font-size: 0.9rem;
  opacity: 0.8;
`;

const CollapsedLabel = styled(motion.div)`
  position: absolute;
  right: calc(100% + 1rem);
  top: 20%;
  transform: translateY(-50%);
  background: ${props => props.theme === 'light' ? 'rgba(255, 253, 250, 0.9)' : 'rgba(20, 20, 20, 0.9)'};
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.theme === 'light' 
    ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
    : '0 4px 6px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'};
`;

interface Track {
  title: string;
  file: string;
}

const tracks: Track[] = [
  { title: 'bliss', file: '/music/2024-82 (uptempo).mp3' },
  { title: 'creation', file: '/music/2024-62 (nostalgic).mp3' },
  { title: 'In my head', file: '/music/2024-29 (pluggnb) 142bpm.mp3' },
  { title: 'sometimes', file: '/music/2025-2 (uptempo)-FINAL.mp3' },
];

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { theme } = useTheme();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Play prevented:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = tracks.findIndex(track => track.title === event.target.value);
    if (newIndex !== -1) {
      setCurrentTrackIndex(newIndex);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.load();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.file}
        onEnded={() => setIsPlaying(false)}
      />
      <AnimatePresence>
        {isExpanded ? (
          <PlayerContainer
            theme={theme}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <PlayerHeader>
              <PlayerTitle theme={theme}>Produced by Alan</PlayerTitle>
              <Button theme={theme} onClick={() => setIsExpanded(false)}>
                <FiX size={20} />
              </Button>
            </PlayerHeader>
            <TrackSelect theme={theme} value={currentTrack.title} onChange={handleTrackChange}>
              {tracks.map(track => (
                <option key={track.title} value={track.title}>
                  {track.title}
                </option>
              ))}
            </TrackSelect>
            <Controls>
              <Button theme={theme} onClick={togglePlay}>
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </Button>
              <VolumeContainer>
                <Button theme={theme} onClick={() => setVolume(volume === 0 ? 0.5 : 0)}>
                  {volume === 0 ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                </Button>
                <VolumeControl
                  theme={theme}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </VolumeContainer>
            </Controls>
            <TrackInfo theme={theme}>
              Now Playing: {currentTrack.title}
            </TrackInfo>
          </PlayerContainer>
        ) : (
          <CollapsedPlayer
            theme={theme}
            onClick={() => setIsExpanded(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CollapsedLabel
              theme={theme}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isPlaying ? `Playing: ${currentTrack.title}` : 'Produced by me'}
            </CollapsedLabel>
            <PulseRing
              theme={theme}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Button theme={theme} onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              togglePlay();
            }}>
              {isPlaying ? <FiPause size={24} /> : <FiMusic size={24} />}
            </Button>
            {showTooltip && (
              <Tooltip
                theme={theme}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Tooltip>
            )}
          </CollapsedPlayer>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer; 