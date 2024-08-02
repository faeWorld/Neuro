import axios from 'axios';

export const submitScore = async (email, score) => {
  try {
    await axios.post('/submit-test', {
      email,
      score
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};

export const getUserScores = async (email) => {
  try {
    const response = await axios.get(`/user-scores?email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user scores:', error);
    throw error;
  }
};
