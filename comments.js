// Create web server
// 1. Create a new web server
// 2. Listen for requests
// 3. Handle requests
// 4. Return responses
// 5. Parse request body
// 6. Read and write files
// 7. Build an API
// 8. Use an API
// 9. Use a database
// 10. Create a form
// 11. Handle form submissions
// 12. Create a REST API
// 13. Use a REST API
// 14. Create a single-page app
// 15. Use a single-page app
// 16. Create a web component
// 17. Use a web component
// 18. Create a full-stack app
// 19. Use a full-stack app

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const comments = [];

const server = http.createServer((request, response) => {
  const urlObj = url.parse(request.url, true);
  const pathname = urlObj.pathname;
  const query = urlObj.query;
  const method = request.method;

  // Handle GET requests
  if (pathname === '/' && method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(response);
  } else if (pathname === '/comments' && method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(comments));
  }
  // Handle POST requests
  else if (pathname === '/comments' && method === 'POST') {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
    });
    request.on('end', () => {
      const comment = JSON.parse(body);
      comments.push(comment);
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(comment));
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

