import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Paper, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';
import useVoice from '../hooks/useVoice.jsx';
import { askQuestion } from '../services/api';
import styles from './ChatInterface.module.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true); // Enable voice by default
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    isSpeaking,
    speakText,
    stopSpeaking,
    availableVoices,
    selectedVoice,
    setSelectedVoice
  } = useVoice();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const newMessage = {
      role: 'user',
      content: content
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await askQuestion(content);
      
      const aiResponse = {
        role: 'ai',
        content: response.answerHtml,
        sources: response.sources,
        context: response.context
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage = {
        role: 'ai',
        content: `Sorry, I encountered an error while processing your request: ${error.message}. Please try again.`,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={styles.chatInterface}>
      <ChatHeader
        isVoiceEnabled={isVoiceEnabled}
        setIsVoiceEnabled={setIsVoiceEnabled}
        availableVoices={availableVoices}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
      />
      <Container maxWidth="lg" className={styles.mainContainer}>
        <Box className={styles.contentWrapper}>
          {!isMobile && (
            <div
              style={{
                transform: 'translateX(0)',
                opacity: 1,
                transition: 'all 0.5s ease'
              }}
            >
              <ChatSidebar />
            </div>
          )}
          <Paper 
            elevation={3}
            className={styles.chatContainer}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              height: 'calc(100vh - 140px)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box className={styles.messagesContainer}>
              <AnimatePresence>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      opacity: 1,
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ChatMessage
                      message={message}
                      isVoiceEnabled={isVoiceEnabled}
                      isSpeaking={isSpeaking}
                      speakText={speakText}
                      stopSpeaking={stopSpeaking}
                      availableVoices={availableVoices}
                    />
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <CircularProgress size={24} />
                  </div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </Box>
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isVoiceEnabled={isVoiceEnabled} 
            />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ChatInterface; 