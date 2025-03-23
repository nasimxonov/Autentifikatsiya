import jwt from "jsonwebtoken";
import CustomError from "../utils/custom.error.js";

class JwtService {
  constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY;
  }
  generateToken(userId) {
    try {
      const token = jwt.sign({ userId }, this.secretKey, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  verifyToken() {}
}

export default JwtService;
