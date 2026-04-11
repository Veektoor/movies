import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers.authorization || "";
    const [scheme, token] = bearerHeader.split(" ");

    if (!token || scheme?.toLowerCase() !== "bearer") return false;
    if (["null", "undefined"].includes(token.toLowerCase())) return false;

    return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    if (error.name !== "JsonWebTokenError" || error.message !== "jwt malformed") {
      console.error("Invalid auth token:", error);
    }
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode };
