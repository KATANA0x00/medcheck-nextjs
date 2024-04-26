import { Client, sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const inputValue = searchParams.get('inputValue');
        const result = await sql`SELECT MedName FROM Medlists WHERE MedId = ${inputValue};`;

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}