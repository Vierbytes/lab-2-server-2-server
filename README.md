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
