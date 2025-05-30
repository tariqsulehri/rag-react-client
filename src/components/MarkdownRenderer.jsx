import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useVoice from "../hooks/useVoice";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import styles from './ChatInterface.module.css';

/**
 * Main chat interface component with voice capabilities
 */
const ChatInterface = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatEndRef = useRef(null);

  // Initialize voice features using custom hook
  const {
    isVoiceEnabled,
    isListening,
    isSpeaking,
    availableVoices,
    selectedVoice,
    voiceSupport,
    setSelectedVoice,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    toggleVoiceFeatures
  } = useVoice();

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Handle voice input
   */
  const handleVoiceInput = async () => {
    try {
      const transcript = await startListening();
      setQuestion(transcript);
    } catch (error) {
      console.error('Voice input error:', error);
    }
  };

  /**
   * Handle voice selection change
   */
  const handleVoiceChange = (event) => {
    const voice = availableVoices.find(v => v.name === event.target.value);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  /**
   * Send question to AI and handle response
   */
  const sendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const response = await axios.post("http://localhost:3500/rag/ask", {
        question,
      });

      const aiMessage = {
        role: "ai",
        content: response.data?.answerRaw || "No response from server.",
      };

      setMessages((prev) => [...prev, aiMessage]);
      
      // Speak the AI response if voice is enabled
      if (isVoiceEnabled) {
        speakText(aiMessage.content);
      }
    } catch (err) {
      console.error("Error sending question:", err);
      const errorMessage = "An error occurred. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: errorMessage },
      ]);
      if (isVoiceEnabled) {
        speakText(errorMessage);
      }
    }
  };

  /**
   * Handle keyboard input
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  return (
    <div className={styles.appContainer}>
      <ChatHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isVoiceEnabled={isVoiceEnabled}
        voiceSupport={voiceSupport}
        availableVoices={availableVoices}
        selectedVoice={selectedVoice}
        toggleVoiceFeatures={toggleVoiceFeatures}
        handleVoiceChange={handleVoiceChange}
      />
      
      <div className={styles.mainContainer}>
        <ChatSidebar
          isSidebarOpen={isSidebarOpen}
          messages={messages}
        />

        <main className={styles.chatMain}>
          <div className={styles.chatBox}>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg}
                isVoiceEnabled={isVoiceEnabled}
                isSpeaking={isSpeaking}
                speakText={speakText}
                stopSpeaking={stopSpeaking}
              />
            ))}
            <div ref={chatEndRef} />
          </div>

          <ChatInput
            question={question}
            setQuestion={setQuestion}
            isVoiceEnabled={isVoiceEnabled}
            isListening={isListening}
            handleVoiceInput={handleVoiceInput}
            stopListening={stopListening}
            sendQuestion={sendQuestion}
            handleKeyDown={handleKeyDown}
          />
        </main>
      </div>
    </div>
  );
};

export default ChatInterface;
