/**
 * Utility functions for handling voice-related features
 */

/**
 * Initializes speech recognition
 * @returns {Object} Speech recognition instance or null if not supported
 */
export const initSpeechRecognition = () => {
  if (!('webkitSpeechRecognition' in window)) {
    return null;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  return recognition;
};

/**
 * Initializes speech synthesis
 * @returns {Object} Speech synthesis instance or null if not supported
 */
export const initSpeechSynthesis = () => {
  if (!('speechSynthesis' in window)) {
    return null;
  }

  return window.speechSynthesis;
};

/**
 * Finds a voice by language code or name
 * @param {Array} voices - Array of available voices
 * @param {string} langCode - Language code to search for (e.g., 'ur' for Urdu)
 * @returns {Object} Found voice or first available voice
 */
export const findVoice = (voices, langCode = 'ur') => {
  if (!voices || voices.length === 0) return null;

  const preferredVoice = voices.find(voice => 
    voice.lang.includes(langCode) || 
    voice.name.toLowerCase().includes(langCode)
  );

  return preferredVoice || voices[0];
};

/**
 * Creates a speech utterance
 * @param {string} text - Text to be spoken
 * @param {Object} voice - Voice to use
 * @param {Object} options - Additional options for speech
 * @returns {SpeechSynthesisUtterance} Configured utterance
 */
export const createUtterance = (text, voice, options = {}) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.rate = options.rate || 1.0;
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;
  return utterance;
};

/**
 * Formats voice name for display
 * @param {Object} voice - Voice object
 * @returns {string} Formatted voice name
 */
export const formatVoiceName = (voice) => {
  if (!voice) return '';
  return `${voice.name} (${voice.lang})`;
};

/**
 * Checks if voice features are supported in the browser
 * @returns {Object} Object containing support status for recognition and synthesis
 */
export const checkVoiceSupport = () => {
  return {
    recognition: 'webkitSpeechRecognition' in window,
    synthesis: 'speechSynthesis' in window
  };
}; 