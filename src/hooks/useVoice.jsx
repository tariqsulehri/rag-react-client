import { useState, useEffect } from 'react';

const useVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    // Get available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Find Hindi voice as default
      const hindiVoice = voices.find(voice => 
        voice.name.includes('Google') && 
        voice.lang.includes('hi-IN')
      );

      if (hindiVoice) {
        setSelectedVoice(hindiVoice.name);
      } else if (voices.length > 0) {
        setSelectedVoice(voices[0].name);
      }
    };

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []); // Remove selectedVoice from dependencies to prevent re-initialization

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the selected voice
    const voice = availableVoices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    // Set language based on selected voice
    if (voice?.lang.includes('hi-IN')) {
      utterance.lang = 'hi-IN';
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking text:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    isSpeaking,
    speakText,
    stopSpeaking,
    availableVoices,
    selectedVoice,
    setSelectedVoice
  };
};

export default useVoice; 