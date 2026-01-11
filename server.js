// Import Express to create the web server
const express = require('express');

// Import axios to make HTTP requests to external APIs
// This is what we'll use to fetch data from the Useless Facts API
const axios = require('axios');

// Create an Express application instance
const app = express();

// Define the port number where the server will listen
const PORT = 3000;

/**
 * API endpoint that fetches a random fun fact from the Useless Facts API
 *
 * When a client visits /api/fun-fact, this function:
 * 1. Makes a request to the external API
 * 2. Extracts the fact text from the response
 * 3. Returns it in a simple JSON format
 */
app.get('/api/fun-fact', async (req, res) => {
  // Use try-catch to handle any errors that might occur
  // This is important because external API calls can fail for many reasons
  try {
    // Make a GET request to the Useless Facts API
    // Using async/await here to wait for the API response
    // The API returns a random fun fact each time we call it
    const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');

    // Extract just the 'text' field from the API response
    // The API returns a lot of data, but we only want the fact itself
    const fact = response.data.text;

    // Send back a JSON response with just the fact
    // We're formatting it as { "fact": "..." } to make it simple and clear
    res.json({ fact: fact });

  } catch (error) {
    // If something goes wrong (API is down, network error, etc.)
    // Log the error so we can see what happened
    console.error('Error fetching fun fact:', error.message);

    // Send a 500 Internal Server Error response to the client
    // Include a helpful error message
    res.status(500).json({
      error: 'Failed to fetch fun fact',
      message: error.message
    });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Try visiting http://localhost:${PORT}/api/fun-fact`);
});
