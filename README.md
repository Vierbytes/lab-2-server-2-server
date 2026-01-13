# Lab 2: Server to Server Communication

An Express.js API that fetches random fun facts from an external API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

3. Test the API:
- Visit `http://localhost:3000/api/fun-fact` in your browser
- Or use curl: `curl http://localhost:3000/api/fun-fact`

## Features

- GET endpoint that returns random fun facts
- Server-to-server communication with Useless Facts API
- JSON response format
- Error handling for API failures

## Example Response

```json
{
  "fact": "Mercury is the only planet whose orbit is coplanar with its equator."
}
```

## Reflection Questions

### 1. Why was it important to re-format the data from the Useless Facts API before sending it to your own client? What are the benefits of an API providing a clean, minimal response?

Re-formatting the data was important because the Useless Facts API returns a lot of extra information that our clients don't need - things like the fact ID, source URL, language, and permalink. By extracting just the `text` field and sending it as `{ fact: "..." }`, we're creating a cleaner, simpler response.

The benefits of a clean, minimal response include:
- **Less bandwidth** - Smaller responses mean faster load times, especially important for mobile users
- **Easier to use** - Client developers don't need to dig through extra fields to find what they need
- **Security** - We don't expose internal API details or metadata that clients shouldn't see
- **Flexibility** - If the external API changes its response format, we can adjust our code without breaking client applications
- **Better user experience** - The client gets exactly what they need, nothing more

This is basically creating our own API layer that acts as a middleman, which gives us control over what data flows through.

### 2. In the `catch` block, why is it better to send a generic error message to the client instead of the actual error object from `axios`?

Sending a generic error message is better for several security and user experience reasons:

- **Security** - The full error object might contain sensitive information like API keys, internal server paths, database details, or network configuration that hackers could use to attack the system
- **Privacy** - Error details might reveal information about third-party services we're using
- **User-friendly** - Technical error stack traces are confusing for end users and don't help them understand what went wrong
- **Consistency** - We can provide clear, standardized error messages across our API

In my code, I'm logging the full error with `console.error()` so I can debug issues on the server side, but only sending a simple message like "Failed to fetch fun fact" to the client. This way I get the debugging information I need without exposing sensitive details to users or potential attackers.

### 3. How might you modify this application to get a fact in a different language if the external API supported it (e.g., with a query parameter like `?language=de`)?

To add language support, I would modify the endpoint to accept a language query parameter:

1. Update the route to accept an optional language parameter:
   ```javascript
   app.get('/api/fun-fact', async (req, res) => {
     const language = req.query.language || 'en'; // Default to English
   ```

2. Pass the language parameter to the external API:
   ```javascript
   const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random', {
     params: { language: language }
   });
   ```

3. Add validation to make sure only supported languages are requested:
   ```javascript
   const supportedLanguages = ['en', 'de', 'es', 'fr'];
   if (!supportedLanguages.includes(language)) {
     return res.status(400).json({ error: 'Language not supported' });
   }
   ```

Then users could request facts in different languages by visiting:
- `http://localhost:3000/api/fun-fact` (English by default)
- `http://localhost:3000/api/fun-fact?language=de` (German)
- `http://localhost:3000/api/fun-fact?language=es` (Spanish)

This pattern of accepting query parameters is really common in APIs and makes them much more flexible.
