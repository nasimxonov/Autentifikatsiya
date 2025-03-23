import databaseClient from "../config/database.js";

export default class DatabaseService {
  constructor() {
    this.userRepo = databaseClient;
  }
  async createUser({ first_name, last_name, phone_number, password }) {
    const { rows } = await this.userRepo.query(
      `INSERT INTO users (phone_number, password,first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`,
      [phone_number, password, first_name, last_name]
    );
    return rows[0];
  }

  findUser() {}
  findOneUser() {}

  async findUserByPhone({ phone_number }) {
    const { rows } = await this.userRepo.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [phone_number]
    );
    return rows[0];
  }

  updateUser() {}
  deleteUser() {}
}
