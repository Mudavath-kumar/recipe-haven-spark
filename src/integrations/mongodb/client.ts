
import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = "mongodb+srv://bycoderun:FaImdYJaRQx2bdwi@cluster0.zsov2sv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Export database collections for use throughout the application
export async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Database instance
const db = client.db("recipes_app");

// Collections
export const collections = {
  recipes: db.collection("recipes"),
  users: db.collection("users"),
  ingredients: db.collection("ingredients"),
  comments: db.collection("comments"),
  likes: db.collection("likes"),
};

// Initialize connection when module is imported
connectToMongoDB().catch(console.error);

export { client as mongoClient };
