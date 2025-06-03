import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Paper, Tooltip } from '@mui/material';
import { Send, Mic, MicOff } from '@mui/icons-material';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSendMessage, isVoiceEnabled }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
        setError(null);
      };

      recognitionRef.current.onresult = (event) => {
        console.log('Voice recognition result:', event);
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };
    } else {
      setError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleVoiceInput = () => {
    try {
      if (!recognitionRef.current) {
        setError('Speech recognition not initialized');
        return;
      }

      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error('Error toggling voice input:', err);
      setError(err.message);
    }
  };

  return (
    <Paper 
      elevation={2}
      className={styles.inputContainer}
      sx={{
        p: 2,
        borderRadius: 0,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.paper'
              }
            }}
          />
          {isVoiceEnabled && (
            <Tooltip title={error || (isListening ? "Stop listening" : "Start voice input")}>
              <IconButton
                color={isListening ? 'error' : error ? 'error' : 'primary'}
                onClick={toggleVoiceInput}
                sx={{
                  height: 40,
                  width: 40,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                {isListening ? <Mic /> : <MicOff />}
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            color="primary"
            type="submit"
            disabled={!message.trim()}
            sx={{
              height: 40,
              width: 40,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </form>
    </Paper>
  );
};

export default ChatInput; 