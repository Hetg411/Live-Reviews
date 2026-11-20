const http = require('node:http');
const path = require('node:path');
const { Server } = require('socket.io');
const app = require('./app');
const connectDatabase = require('./database/connection');

const startServer = async () => {
  process.loadEnvFile(path.join(__dirname, '.env'));
  await connectDatabase();

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
    },
  });
  app.set('io', io);

  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
  });
}

module.exports = { startServer };
