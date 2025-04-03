import mariadb from "mariadb";

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    connectionLimit: 1,
    connectTimeout: 10000,
});

console.log(`pool: ${process.env.DB_HOST} ${process.env.DB_USER} ${process.env.DB_PASS} ${process.env.DB_NAME} ${process.env.DB_PORT}`);

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Connected to MariaDB!");
    } catch (err) {
        console.error("Database connection failed:", err);
    } finally {
        if (conn) conn.release();
    }
}

async function executeQuery(query: string, params: any[] = []) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } catch (err) {
        console.error("Query error:", err);
        throw err;
    } finally {
        if (conn) {
            try {
                await conn.release();
            } catch (releaseErr) {
                console.error("Error releasing connection:", releaseErr);
            }
        }
    }
}

async function getAll(table: string) {
    return await executeQuery(`SELECT * FROM ${table}`);
}

async function getById(table: string, id: never) {
    return await executeQuery(`SELECT * FROM ${table} WHERE id = ?`, [id]);
}

async function insert<T extends Record<string, any>>(
    table: string,
    entity: T
): Promise<number> {
    // Get all properties from the entity object
    const properties = Object.keys(entity);

    // Filter out any properties that are undefined or null
    const validProperties = properties.filter(
        (prop) =>
            entity[prop] !== undefined &&
            entity[prop] !== null &&
            typeof entity[prop] !== "function"
    );

    // Create arrays for columns and values
    const columns = validProperties;
    const values = validProperties.map((prop) => entity[prop]);

    // Generate the SQL query
    const placeholders = values.map(() => "?").join(", ");
    const query = `INSERT INTO ${table} (${columns.join(
        ", "
    )}) VALUES (${placeholders})`;

    console.log("Generated SQL:", query);
    console.log("Columns:", columns);
    console.log("Values:", values);

    var result = await executeQuery(query, values);
    var insertId = Number(result.insertId);
    return insertId;
}

async function update(
    table: string,
    id: number | string,
    data: Record<string, any>
) {
    // Create SET clause with column names
    const setClause = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");

    // Combine values with id for the WHERE clause
    const values = [...Object.values(data), id];

    const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

    console.log("Generated SQL:", query);
    console.log("Parameters:", values);

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
