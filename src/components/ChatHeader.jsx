import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';

const ChatHeader = ({
  isVoiceEnabled,
  setIsVoiceEnabled,
  availableVoices,
  selectedVoice,
  setSelectedVoice
}) => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              marginRight: '8px',
              mixBlendMode: 'multiply'
            }} 
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333' }}>
            AI Chat Assistant
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Voice</InputLabel>
            <Select
              value={selectedVoice}
              label="Voice"
              onChange={(e) => setSelectedVoice(e.target.value)}
              disabled={!isVoiceEnabled}
            >
              {availableVoices.map((voice) => (
                <MenuItem key={voice.name} value={voice.name}>
                  {voice.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            color={isVoiceEnabled ? 'primary' : 'default'}
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            sx={{
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            {isVoiceEnabled ? <Mic /> : <MicOff />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader; 