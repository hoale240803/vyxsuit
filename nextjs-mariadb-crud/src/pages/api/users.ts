import { NextApiRequest, NextApiResponse } from "next";
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
  connectionLimit: 5,
  acquireTimeout: 30000,  // 30 seconds to get connection from pool
  connectTimeout: 30000,  // 30 seconds to establish connection
  trace: true            // For better debugging
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let conn;
  try {
    conn = await pool.getConnection();
    if (req.method === "GET") {
      const users = await conn.query("SELECT * FROM users");
      return res.status(200).json(users);
    } else if (req.method === "POST") {
      const { name, email } = req.body;
      await conn.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
      return res.status(201).json({ message: "User created" });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (conn) conn.release();
  }
}
