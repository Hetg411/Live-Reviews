const express = require('express');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use((req, res, next) => {
  const origin = req.get('Origin');
  const isLocalOrigin = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '');

  if (isLocalOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});
app.use(express.json());
app.use('/api/reviews', reviewRoutes);
app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found.' });
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ message: 'Invalid JSON request body.' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;

if (require.main === module) {
  require('./server').startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
  });
}
