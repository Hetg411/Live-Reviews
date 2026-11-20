const mongoose = require('mongoose');

const connectDatabase = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required.');
  }

  await mongoose.connect(MONGODB_URI);
  return mongoose.connection;
};

module.exports = connectDatabase;
