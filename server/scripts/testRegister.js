const axios = require('axios');

const run = async () => {
  try {
    const payload = { name: 'Test User', email: 'testuser@example.com', password: 'Password123' };
    const res = await axios.post(process.env.API_URL || 'http://localhost:5000/api/auth/register', payload, { timeout: 5000 });
    console.log('Status:', res.status);
    console.log('Data:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
};

run();
