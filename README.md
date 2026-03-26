# Hand Weld

A real-time hand tracking application that allows you to draw in the air using hand gestures. Built with Next.js, React, and MediaPipe for advanced hand detection and tracking.

## Features

- **Real-time Hand Tracking**: Uses MediaPipe's advanced hand detection to track hand movements with high accuracy
- **Air Drawing**: Draw in 3D space using your index finger with visual trail effects
- **Gesture Recognition**: Detects different hand gestures for drawing controls
- **Full Screen Canvas**: Maximizes screen real estate for an immersive drawing experience
- **Responsive Design**: Works on both desktop and mobile devices with orientation support
- **Visual Feedback**: Cyan-colored hand skeleton with glowing effects and highlighted index finger

## Tech Stack

- **Frontend**: Next.js 16.2.1, React 19.2.4, TypeScript
- **Styling**: Tailwind CSS 4
- **Hand Tracking**: MediaPipe Hands & Camera Utils
- **Canvas Rendering**: HTML5 Canvas with 2D context

## Getting Started

### Prerequisites

- Node.js 18+ 
- Modern browser with camera access
- WebRTC compatible browser (Chrome, Firefox, Safari)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hand-weld
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Allow camera access when prompted

## Usage

1. **Camera Setup**: The app will automatically request camera permissions
2. **Hand Detection**: Show your hand to the camera - the system will detect and track it
3. **Drawing**: Use your index finger to draw in the air - the trail will appear on screen
4. **Visual Feedback**: 
   - Cyan lines show hand skeleton
   - Yellow dot highlights your index finger
   - Glowing effects enhance the visual experience

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── HandTracker.tsx   # Main hand tracking component
│   ├── Canvas.tsx        # Canvas rendering component
│   └── UIControls.tsx    # User interface controls
├── hooks/
│   └── useHandTracking.ts # Hand tracking logic
└── lib/
    ├── draw.ts           # Drawing utilities
    └── gesture/          # Gesture recognition logic
```

## Key Components

### useHandTracking Hook
- Initializes MediaPipe hands detection
- Manages camera setup and video processing
- Handles real-time hand landmark tracking
- Provides canvas drawing functionality

### Hand Visualization
- 21-point hand skeleton tracking
- Real-time rendering with shadow effects
- Index finger highlighting for drawing focus
- Mirrored display for natural interaction

### Drawing System
- Trail-based drawing following index finger
- Gesture-based drawing state management
- Smooth trail rendering with visual effects

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Configuration

- **Next.js Config**: `next.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind Config**: `tailwind.config.js`
- **ESLint Config**: `eslint.config.mjs`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary.

## Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted
- Check if other applications are using the camera
- Try refreshing the page and granting permissions again

### Hand Detection Issues
- Ensure good lighting conditions
- Keep your hand clearly visible in the camera frame
- Move slowly for better tracking accuracy

### Performance Issues
- Close unnecessary browser tabs
- Ensure your device meets the minimum requirements
- Try reducing the window size for better performance
# hand-weld
