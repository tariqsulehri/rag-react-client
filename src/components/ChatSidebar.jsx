import React from 'react';
import styles from './ChatSidebar.module.css';

const ChatSidebar = ({ isSidebarOpen, messages }) => {
  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        <h2>Chat History</h2>
      </div>
      <div className={styles.chatHistory}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.historyItem}>
            <span className={`${styles.historyIcon} ${styles[msg.role]}`}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </span>
            <span className={styles.historyPreview}>
              {msg.content.substring(0, 30)}...
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar; 