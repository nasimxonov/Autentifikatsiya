
import pg from "pg";

const { Client } = pg;

const databaseClient = new Client({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

export const initTables = async () => {
  await databaseClient.query(`
        create table if not exists users(
            id serial primary key,
            phone_number varchar(255),
            password varchar(255),
            first_name varchar(255),
            last_name varchar(255),
            created_at timestamptz default current_timestamp
        );`);
};

export default databaseClient;
