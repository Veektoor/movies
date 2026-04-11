import responseHandler from "../handlers/response.handler.js";
import { connectDatabase, isDatabaseConnected } from "../config/database.js";

const requireDatabase = async (req, res, next) => {
  if (isDatabaseConnected()) return next();

  try {
    await connectDatabase();
    return next();
  } catch (error) {
    console.error("Database unavailable for request:", error);
    return responseHandler.serviceUnavailable(res, "Database is currently unavailable");
  }
};

export default { requireDatabase };
