# Tkxel AI Assistant with Voice Support

A modern React-based chat interface with AI integration and voice capabilities.

## Features

- 🤖 AI-powered chat interface
- 🎤 Voice synthesis for AI responses
- 🌐 Multiple language voice support
- 💬 Clean and modern UI
- 📱 Responsive design
- 🎨 Material-UI components
- 🔄 Real-time chat updates

## Tech Stack

- React
- Material-UI
- Web Speech API
- Vite
- CSS Modules

## Project Structure

```
src/
├── components/
│   ├── ChatHeader.jsx       # Header with logo and voice controls
│   ├── ChatInput.jsx        # Message input component
│   ├── ChatInterface.jsx    # Main chat container
│   ├── ChatMessage.jsx      # Individual message component
│   └── ChatSidebar.jsx      # Sidebar component
├── hooks/
│   └── useVoice.jsx         # Voice synthesis hook
├── services/
│   └── api.js              # API integration
└── App.jsx                 # Root component
```

## Components

### ChatHeader
- Logo display
- Voice selection dropdown
- Voice toggle button
- Responsive layout

```jsx
<AppBar position="static" sx={{ backgroundColor: 'white' }}>
  <Toolbar>
    <Box>
      <img src="/logo.png" alt="Logo" />
      <Typography>Tkxel AI Assistant</Typography>
    </Box>
    <Box>
      <FormControl>
        <Select value={selectedVoice}>
          {availableVoices.map(voice => (
            <MenuItem key={voice.name} value={voice.name}>
              {voice.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton>
        {isVoiceEnabled ? <Mic /> : <MicOff />}
      </IconButton>
    </Box>
  </Toolbar>
</AppBar>
```

### ChatMessage
- User/AI message display
- Voice playback controls
- HTML content support
- Avatar icons

```jsx
<Box className={styles.messageWrapper}>
  <Avatar>
    {message.role === 'user' ? <Person /> : <SmartToy />}
  </Avatar>
  <Box>
    <Typography>{message.role === 'user' ? 'You' : 'AI Assistant'}</Typography>
    <div dangerouslySetInnerHTML={{ __html: message.content }} />
    {message.role === 'ai' && (
      <IconButton onClick={handleSpeak}>
        {isSpeaking ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
    )}
  </Box>
</Box>
```

### useVoice Hook
- Voice synthesis management
- Voice selection
- Speech control

```jsx
const useVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  // Voice initialization
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      const hindiVoice = voices.find(voice => 
        voice.name.includes('Google') && 
        voice.lang.includes('hi-IN')
      );
      setSelectedVoice(hindiVoice?.name || voices[0]?.name);
    };
    // ... voice setup
  }, []);

  return {
    isSpeaking,
    speakText,
    stopSpeaking,
    availableVoices,
    selectedVoice,
    setSelectedVoice
  };
};
```

## API Integration

```javascript
const API_BASE_URL = 'http://localhost:3500';

export const askQuestion = async (question) => {
  const response = await fetch(`${API_BASE_URL}/rag/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return response.json();
};
```

## Styling

- CSS Modules for component-specific styles
- Material-UI theming
- Responsive design
- Custom animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

Create a `.env` file:
```
VITE_API_URL=http://localhost:3500
```

## Voice Support

The application uses the Web Speech API for voice synthesis:
- Default voice: Google Hindi (hi-IN)
- Fallback to system default voice
- Voice selection through UI
- Voice toggle functionality

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
