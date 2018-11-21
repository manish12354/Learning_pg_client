const http = require('http');
const PORT = 8080;
const app = require('./app.js');
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server is listening ${PORT}`));
