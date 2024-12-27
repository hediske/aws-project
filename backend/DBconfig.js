import dotenv from "dotenv";
import Sequelize from "sequelize";
dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PWD = process.env.DB_PWD;
export const DB_DATABASE = process.env.DB_DATABASE;


export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
  );

export const connectDB = async () => {
    try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};
