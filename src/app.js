import express from "express";
import "dotenv/config";
import databaseClient, { initTables } from "./config/database.js";
import Routes from "./routes/routes.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
app.use("/api", Routes());

const initApp = async () => {
  try {
    await databaseClient.connect();
    await initTables();
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

initApp();
