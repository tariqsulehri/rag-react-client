import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ChatInterface from './components/ChatInterface';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ChatInterface />
      </div>
    </ThemeProvider>
  );
}

export default App;
