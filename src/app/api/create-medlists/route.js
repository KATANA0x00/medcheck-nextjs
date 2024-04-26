import { Client, sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await sql`CREATE TABLE IF NOT EXISTS Medlists ( MedId varchar(15), MedName varchar(50) );`;
        const result = await sql`SELECT * FROM Medlists;`;
            
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}