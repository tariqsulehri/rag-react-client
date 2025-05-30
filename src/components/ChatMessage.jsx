import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { Person, SmartToy } from '@mui/icons-material';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message, isVoiceEnabled, isSpeaking, speakText, stopSpeaking }) => {
  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // Create a temporary div to extract text from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = message.content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      speakText(textContent);
    }
  };

  return (
    <Box className={styles.messageWrapper}>
      <Box
        className={`${styles.message} ${styles[message.role]}`}
        sx={{
          backgroundColor: message.isError ? '#ffebee' : undefined,
          color: message.isError ? '#c62828' : undefined,
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start'
        }}
      >
        <Avatar
          sx={{
            bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
            width: 32,
            height: 32
          }}
        >
          {message.role === 'user' ? <Person /> : <SmartToy />}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box className={styles.messageHeader}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {message.role === 'user' ? 'You' : 'AI Assistant'}
            </Typography>
            {message.role === 'ai' && (
              <IconButton
                size="small"
                onClick={handleSpeak}
                sx={{
                  opacity: isVoiceEnabled ? 0.7 : 0,
                  transition: 'opacity 0.2s ease',
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                {isSpeaking ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
            )}
          </Box>
          <Box className={styles.messageContent}>
            <div dangerouslySetInnerHTML={{ __html: message.content }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage; 