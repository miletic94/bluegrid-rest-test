import mongoose from "mongoose";

// TODO: Put in docker and env
const MONGODB_URI = "mongodb://localhost:27017/bluegrid";
// Function to establish MongoDB connection
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    process.exit(1); // Exit with error
  }
}

// Function to close MongoDB connection
const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    process.exit(1); // Exit with error
  }
};

// Export functions for reuse
export { connectToDatabase, closeDatabaseConnection };
