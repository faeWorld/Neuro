// src/services/apiService.js
export async function fetchQuestions() {
    const response = await fetch('/api/questions');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return await response.json();
  }
  