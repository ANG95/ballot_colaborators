import { NextResponse } from 'next/server';
import { createUser } from './userModel';

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API!' });
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email } = data;

  try {
    const result = await createUser(name, email);
    return NextResponse.json({ message: 'User created', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}