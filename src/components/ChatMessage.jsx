import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message, isVoiceEnabled, isSpeaking, speakText, stopSpeaking }) => {
  return (
    <div className={`${styles.message} ${styles[message.role]}`}>
      <div className={styles.messageHeader}>
        <span className={styles.messageRole}>
          {message.role === 'user' ? 'You' : 'AI Assistant'}
        </span>
        {message.role === 'ai' && isVoiceEnabled && (
          <button
            className={`${styles.speakButton} ${isSpeaking ? styles.speaking : ''}`}
            onClick={isSpeaking ? stopSpeaking : () => speakText(message.content)}
            title={isSpeaking ? "Stop speaking" : "Speak message"}
          >
            {isSpeaking ? '🔇' : '🔊'}
          </button>
        )}
      </div>
      <div className={styles.messageContent}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage; 