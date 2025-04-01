import {
    createPool,
    Pool,
    PoolConnection,
    ResultSetHeader,
    RowDataPacket,
} from "mysql2/promise";

// Define the possible return types from MySQL queries
export type QueryResult = RowDataPacket;
export type InsertResult = ResultSetHeader;

// const pool: Pool = createPool({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT) || 3307,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

const pool: Pool = createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3307"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "vyxtest",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
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
    const updates = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
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

/**
 * Execute an INSERT/UPDATE/DELETE query
 */
export async function execute(
    sql: string,
    params?: (string | number | boolean | null | Buffer | Date)[]
): Promise<InsertResult> {
    let connection: PoolConnection | null = null;

    try {
        debugger;
        connection = await pool.getConnection();
        const [result] = await connection.execute<InsertResult>(sql, params);
        return result;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

/**
 * Execute a SQL query with proper typing
 */
export async function query<T extends QueryResult>(
    sql: string,
    params?: (string | number | boolean | null | Buffer | Date)[]
): Promise<T[]> {
    let connection: PoolConnection | null = null;

    try {
        connection = await pool.getConnection();
        const [results] = await connection.query<T[]>(sql, params);
        return results;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}
