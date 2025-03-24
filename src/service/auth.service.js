import CustomError from "../utils/custom.error.js";
import DatabaseService from "./database.service.js";
import bcrypt from "bcrypt";
import JwtService from "./jwt.service.js";

class AuthService {
  constructor() {
    this.databaeService = new DatabaseService();
    this.jwtService = new JwtService();
  }

  async register(user_data) {
    const findUser = await this.databaeService.findUserByPhone({
      phone_number: user_data.phone_number,
    });
    if (findUser) throw new CustomError("User already exists", 409);
    const hashedPassword = await bcrypt.hash(user_data.password, 12);
    const user = await this.databaeService.createUser({
      ...user_data,
      password: hashedPassword,
    });
    const token = this.jwtService.generateToken(user.id);
    return token;
  }
  async login({ phone_number, password }) {
    const findUser = await this.databaeService.findUserByPhone({
      phone_number,
    });
    if (!findUser)
      throw new CustomError("Username or passsword is incorrect", 401);
    try {
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword)
        throw new CustomError("Username or passsword is incorrect", 401);
      const token = this.jwtService.generateToken(findUser.id);
      return token;
    } catch (error) {
      throw new CustomError(error.message, 401);
    }
  }
}

export default AuthService;
