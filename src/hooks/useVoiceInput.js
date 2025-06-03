import { useState, useEffect } from 'react';

const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          console.log('Voice recognition started');
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event) => {
          console.log('Voice recognition result:', event);
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setError(event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          console.log('Voice recognition ended');
          setIsListening(false);
        };

        setRecognition(recognition);
      } else {
        console.error('Speech recognition not supported in this browser');
        setError('Speech recognition not supported');
      }
    } catch (err) {
      console.error('Error initializing speech recognition:', err);
      setError(err.message);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    try {
      if (recognition) {
        console.log('Starting voice recognition...');
        recognition.start();
      } else {
        console.error('Recognition not initialized');
        setError('Voice recognition not initialized');
      }
    } catch (err) {
      console.error('Error starting voice recognition:', err);
      setError(err.message);
    }
  };

  const stopListening = () => {
    try {
      if (recognition) {
        console.log('Stopping voice recognition...');
        recognition.stop();
      }
    } catch (err) {
      console.error('Error stopping voice recognition:', err);
      setError(err.message);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setError(null);
  };

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript
  };
};

export default useVoiceInput; 