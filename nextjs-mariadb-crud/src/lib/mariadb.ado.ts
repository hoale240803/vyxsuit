import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connected to MariaDB!");
  } catch (err) {
    console.error("Database connection failed:", err);
  } finally {
    if (conn) conn.end();
  }
}

async function executeQuery(query: string, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, params);
    return result;
  } catch (err) {
    console.error("Query error:", err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

async function getAll(table: string) {
  return await executeQuery(`SELECT * FROM ${table}`);
}

async function getById(table: string, id: never) {
  return await executeQuery(`SELECT * FROM ${table} WHERE id = ?`, [id]);
}

async function insert(table: string, data: never) {
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data) as never[];
  const placeholders = values.map(() => "?").join(", ");

  const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
  return await executeQuery(query, values);
}

async function update(table: string, id: never, data: never) {
  const updates = Object.keys(data).map((key) => `${key} = ?`).join(", ");
  const values = [...Object.values(data), id] as never[];

  const query = `UPDATE ${table} SET ${updates} WHERE id = ?`;
  return await executeQuery(query, values);
}

async function remove(table: string, id: never) {
  return await executeQuery(`DELETE FROM ${table} WHERE id = ?`, [id]);
}

process.on("SIGINT", async () => {
  await pool.end();
  console.log("Database pool closed.");
  process.exit(0);
});

const mariadbHelper = {
  testConnection,
  executeQuery,
  getAll,
  getById,
  insert,
  update,
  remove,
};

export default mariadbHelper;
