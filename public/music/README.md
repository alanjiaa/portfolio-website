# Music Directory

This directory is where you should place your MP3 files for the music player.

## Instructions

1. Add your MP3 files to this directory
2. Update the `tracks` array in `src/components/MusicPlayer.tsx` with your track information:

```typescript
const tracks: Track[] = [
  { title: 'Your Track Title 1', file: '/music/your-track-1.mp3' },
  { title: 'Your Track Title 2', file: '/music/your-track-2.mp3' },
  { title: 'Your Track Title 3', file: '/music/your-track-3.mp3' },
];
```

## Supported Formats

- MP3 files are recommended for best browser compatibility
- Make sure your files are properly encoded and have reasonable file sizes
- Recommended bitrate: 128-320 kbps

## Note

Remember to respect copyright laws and only use music that you have the rights to use on your website. 