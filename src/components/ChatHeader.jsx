import React from 'react';
import { formatVoiceName } from '../utils/voiceUtils';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ 
  isSidebarOpen, 
  setIsSidebarOpen,
  isVoiceEnabled,
  voiceSupport,
  availableVoices,
  selectedVoice,
  toggleVoiceFeatures,
  handleVoiceChange 
}) => {
  return (
    <header className={styles.header}>
      <button className={styles.sidebarToggle} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>
      <h1 className={styles.title}>AI Chat Assistant</h1>
      {voiceSupport.recognition && voiceSupport.synthesis && (
        <div className={styles.voiceControls}>
          <button 
            className={`${styles.voiceToggle} ${isVoiceEnabled ? styles.enabled : ''}`}
            onClick={toggleVoiceFeatures}
            title={isVoiceEnabled ? "Disable voice features" : "Enable voice features"}
          >
            {isVoiceEnabled ? '🔊' : '🔇'}
          </button>
          {isVoiceEnabled && (
            <select 
              value={selectedVoice?.name || ''} 
              onChange={handleVoiceChange}
              className={styles.voiceSelect}
            >
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {formatVoiceName(voice)}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </header>
  );
};

export default ChatHeader; 