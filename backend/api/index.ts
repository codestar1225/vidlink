import serverless from "serverless-http";
import app from "../src/app"; // Import the Express app

export const handler = serverless(app);
