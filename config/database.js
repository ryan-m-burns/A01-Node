// MongoDB Configuration
const { MongoClient, ServerApiVersion } = require("mongodb");

// Construct MongoDB URI from components if available
const getMongoURI = () => {
  // If individual components are provided, construct the URI
  if (process.env.MONGO_PROTOCOL && 
      process.env.MONGO_USERNAME && 
      process.env.MONGO_PASSWORD && 
      process.env.MONGO_HOST && 
      process.env.MONGO_DATABASE) {
    
    const options = process.env.MONGO_OPTIONS ? `?${process.env.MONGO_OPTIONS}` : '';
    return `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}${options}`;
  }
  
  // Otherwise use the full URI
  return process.env.MONGO_URI;
};

// Create MongoDB client
const createClient = () => {
  const uri = getMongoURI();
  if (!uri) {
    console.error("MongoDB connection string is not configured. Check your .env file.");
    process.exit(1);
  }

  return new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
};

// Connect to MongoDB
const connectToDatabase = async () => {
  const client = createClient();
  
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    await client.close();
    throw error;
  }
};

module.exports = {
  createClient,
  connectToDatabase
};
