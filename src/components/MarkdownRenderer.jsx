import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownRenderer.module.css';

const MarkdownRenderer = ({ content, isVoiceEnabled, isSpeaking, speakText, stopSpeaking }) => {
  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // Create a temporary div to extract text from markdown
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      speakText(textContent);
    }
  };

  return (
    <Box className={styles.markdownContainer}>
      <Box className={styles.markdownHeader}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          Results
        </Typography>
        {isVoiceEnabled && (
          <IconButton
            size="small"
            onClick={handleSpeak}
            color={isSpeaking ? 'primary' : 'default'}
            sx={{
              opacity: 0.7,
              transition: 'all 0.2s ease',
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
      <Box className={styles.markdownContent}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Add custom styling for markdown elements
            p: (props) => <Typography variant="body1" {...props} />,
            h1: (props) => <Typography variant="h4" {...props} />,
            h2: (props) => <Typography variant="h5" {...props} />,
            h3: (props) => <Typography variant="h6" {...props} />,
            code: ({ inline, ...props }) => (
              <code className={inline ? styles.inlineCode : styles.codeBlock} {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};

export default MarkdownRenderer;
