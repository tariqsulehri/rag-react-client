import React from 'react';
import styles from './ChatInput.module.css';

const ChatInput = ({
  question,
  setQuestion,
  isVoiceEnabled,
  isListening,
  handleVoiceInput,
  stopListening,
  sendQuestion,
  handleKeyDown
}) => {
  return (
    <div className={styles.inputContainer}>
      <textarea
        className={styles.input}
        placeholder="Type your question here..."
        value={question}
        rows={3}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttons}>
        {isVoiceEnabled && (
          <button 
            className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
            onClick={isListening ? stopListening : handleVoiceInput}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? '🎤' : '🎙️'}
          </button>
        )}
        <button className={styles.sendButton} onClick={sendQuestion}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput; 