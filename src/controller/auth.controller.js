import AuthService from "../service/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async registerController(req, res) {
    try {
      const userData = req.body;
      const token = await this.authService.register(userData);
      res.status(201).json({
        token,
      });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async loginController(req, res) {
    try {
      const { phone_number, password } = req.body;
      const token = await this.authService.login({ phone_number, password });
      res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(error.statusCode).json({
        message: error.message
      });
    }
  }
}

export default AuthController;
