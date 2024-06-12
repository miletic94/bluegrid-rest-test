import { globalErrorHandler } from "./middleware/filters/global-error-handler";
import { connectToDatabase } from "./providers/db/mongo";
import filesRouter from "./routes/files.routes";
import express from "express";
const port = 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  try {
    // connect to database
    await connectToDatabase();

    // Define routes
    app.use("/api", [filesRouter]);

    // Handle errors
    app.use(globalErrorHandler);

    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
