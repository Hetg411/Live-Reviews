const app = require('./app');
const connectDatabase = require('./database/connection');

const startServer = async () => {
  await connectDatabase();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
  });
}
