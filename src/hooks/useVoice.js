import { useState, useEffect, useRef } from 'react';
import {
  initSpeechRecognition,
  initSpeechSynthesis,
  findVoice,
  createUtterance,
  checkVoiceSupport
} from '../utils/voiceUtils';

/**
 * Custom hook for managing voice features
 * @returns {Object} Voice-related state and functions
 */
const useVoice = () => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceSupport, setVoiceSupport] = useState({ recognition: false, synthesis: false });

  const recognitionRef = useRef(null);
  const speechRef = useRef(null);

  // Initialize voice features
  useEffect(() => {
    // Check browser support
    const support = checkVoiceSupport();
    setVoiceSupport(support);

    if (support.recognition) {
      recognitionRef.current = initSpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          return transcript;
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    if (support.synthesis) {
      speechRef.current = initSpeechSynthesis();

      const loadVoices = () => {
        const voices = speechRef.current.getVoices();
        setAvailableVoices(voices);
        setSelectedVoice(findVoice(voices));
      };

      if (speechRef.current.onvoiceschanged !== undefined) {
        speechRef.current.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechRef.current) {
        speechRef.current.cancel();
      }
    };
  }, []);

  /**
   * Start voice recognition
   * @returns {Promise<string>} Promise that resolves with the transcript
   */
  const startListening = () => {
    return new Promise((resolve, reject) => {
      if (!isVoiceEnabled || !recognitionRef.current) {
        reject(new Error('Voice recognition not available'));
        return;
      }

      try {
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          resolve(transcript);
        };

        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        reject(error);
      }
    });
  };

  /**
   * Stop voice recognition
   */
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  /**
   * Speak the given text
   * @param {string} text - Text to be spoken
   * @param {Object} options - Additional options for speech
   */
  const speakText = (text, options = {}) => {
    if (!isVoiceEnabled || !speechRef.current || !selectedVoice) {
      return;
    }

    speechRef.current.cancel();
    const utterance = createUtterance(text, selectedVoice, options);

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current.speak(utterance);
  };

  /**
   * Stop speaking
   */
  const stopSpeaking = () => {
    if (speechRef.current) {
      speechRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  /**
   * Toggle voice features
   */
  const toggleVoiceFeatures = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isSpeaking) {
      stopSpeaking();
    }
    if (isListening) {
      stopListening();
    }
  };

  return {
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
  };
};

export default useVoice; 