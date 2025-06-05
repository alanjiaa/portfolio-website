# Portfolio Website

A modern, aesthetic portfolio website built with React, featuring:
- Responsive design with mobile-friendly navigation
- Dark/Light theme toggle
- Beautiful 3D animated background
- Integrated music player for custom tracks
- Smooth animations and transitions

## Technologies Used

- React with TypeScript
- Three.js for 3D graphics
- Framer Motion for animations
- Styled Components for styling
- Vite for build tooling

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Add your music files:
- Place your MP3 files in the `public/music` directory
- Update the tracks list in `src/components/MusicPlayer.tsx`

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Customization

### Themes
- Light theme colors can be adjusted in `src/App.tsx` under `GlobalStyle`
- Dark theme colors can be modified in the same location

### Content
- Update your name and titles in `src/components/Home.tsx`
- Modify the 3D background by adjusting parameters in the `Background` component

### Music Player
- Add your own music tracks to the `public/music` directory
- Update the `tracks` array in `src/components/MusicPlayer.tsx`

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── Home.tsx
│   │   ├── Navbar.tsx
│   │   └── MusicPlayer.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   └── App.tsx
├── public/
│   └── music/
└── package.json
```

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Created by Alan Dong
