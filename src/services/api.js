const API_BASE_URL = 'http://localhost:3500';

export const askQuestion = async (question) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rag/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
}; 