# AI Chat Assistant with Voice Features and PostgreSQL Integration

A React-based chat interface with optional voice input/output capabilities and PostgreSQL database integration.

## Features

- Text-based chat interface
- Optional voice input and output
- Multiple voice selection
- Real-time speech recognition
- Text-to-speech synthesis
- Responsive design
- Markdown support for messages
- PostgreSQL database integration

## Voice Features

### Voice Input
- Click the microphone button to start voice input
- Speak your message
- Click again to stop recording
- The transcribed text will appear in the input field

### Voice Output
- Toggle voice features using the speaker button in the header
- Select different voices from the dropdown menu
- Click the speaker icon on any AI message to hear it spoken
- Automatic speech for AI responses when voice is enabled

### Voice Selection
- Choose from available system voices
- Supports multiple languages
- Automatically detects and selects Urdu voice if available
- Voice selection persists across sessions

## Database Integration

- PostgreSQL database connection
- Secure data storage
- Efficient query handling
- Real-time data synchronization

## Browser Support

Voice features require a modern browser that supports the Web Speech API:
- Chrome (recommended)
- Edge
- Safari
- Firefox (limited support)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure PostgreSQL connection in `.env` file
4. Start the development server:
```bash
npm start
```

## Usage

### Basic Chat
1. Type your message in the input field
2. Press Enter or click Send
3. View the AI response

### Voice Input
1. Enable voice features using the speaker button in the header
2. Click the microphone button
3. Speak your message
4. Click the microphone again to stop
5. Review and edit the transcribed text if needed
6. Click Send

### Voice Output
1. Enable voice features
2. Select your preferred voice from the dropdown
3. Click the speaker icon on any AI message to hear it
4. Toggle voice features off to disable automatic speech

## Technical Details

### Voice Recognition
- Uses the Web Speech API's SpeechRecognition interface
- Supports real-time transcription
- Configurable language settings
- Error handling for unsupported browsers

### Speech Synthesis
- Uses the Web Speech API's SpeechSynthesis interface
- Supports multiple voices and languages
- Configurable speech parameters (rate, pitch, volume)
- Automatic cleanup of ongoing speech

### Database Integration
- PostgreSQL connection pooling
- Prepared statements for security
- Connection error handling
- Automatic reconnection

### State Management
- Voice features can be toggled on/off
- Voice selection persists across sessions
- Automatic cleanup of resources when disabled

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
