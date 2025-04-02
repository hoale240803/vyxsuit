import { NextResponse } from 'next/server';
import mariadb from "mariadb";

export async function GET() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        connectionLimit: 1,
        connectTimeout: 10000,
    });

    let conn;
    try {
        console.log('Attempting to connect to database...');
        console.log('Connection details:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        
        conn = await pool.getConnection();
        console.log('Successfully connected to database!');
        
        const result = await conn.query('SELECT 1');
        console.log('Test query result:', result);
        
        return NextResponse.json({ 
            success: true, 
            message: 'Database connection successful',
            details: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT
            }
        });
    } catch (err) {
        console.error('Connection failed:', err);
        return NextResponse.json({ 
            success: false, 
            error: err instanceof Error ? err.message : 'Unknown error',
            details: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT
            }
        }, { status: 500 });
    } finally {
        if (conn) {
            try {
                await conn.release();
            } catch (err) {
                console.error('Error releasing connection:', err);
            }
        }
        await pool.end();
    }
} 