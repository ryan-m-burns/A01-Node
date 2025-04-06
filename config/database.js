const mongoose = require('mongoose');

// Construct MongoDB URI from components if available
const getMongoURI = () => {
  // If individual components are provided, construct the URI
  if (
    process.env.MONGO_PROTOCOL &&
    process.env.MONGO_USERNAME &&
    process.env.MONGO_PASSWORD &&
    process.env.MONGO_HOST &&
    process.env.MONGO_DATABASE
  ) {
    const options = process.env.MONGO_OPTIONS
      ? `?${process.env.MONGO_OPTIONS}`
      : '';
    return `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}${options}`;
  }

  // Otherwise use the full URI
  return process.env.MONGO_URI;
};

// Connect to MongoDB using Mongoose
const connectToDatabase = async () => {
  try {
    const uri = getMongoURI();

    if (!uri) {
      console.error(
        'MongoDB connection string is not configured. Check your .env file.'
      );
      process.exit(1);
    }

    // Configure Mongoose connection
    mongoose.set('strictQuery', true);

    // Connect to MongoDB
    await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Disconnect from MongoDB
const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

module.exports = {
  connectToDatabase,
  getMongoURI,
  disconnectFromDatabase,
};
