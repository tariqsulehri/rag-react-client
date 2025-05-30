import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import { Send, Mic, MicOff } from '@mui/icons-material';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSendMessage, isVoiceEnabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
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
            <IconButton
              color={isRecording ? 'error' : 'primary'}
              onClick={toggleRecording}
              sx={{
                height: 40,
                width: 40,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {isRecording ? <MicOff /> : <Mic />}
            </IconButton>
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