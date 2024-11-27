import { NextResponse } from 'next/server';
import { selectUser, selectUsers } from './loginModel';

export async function GET() {
    try {
        const result = await selectUsers();
        return NextResponse.json(result);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
      }
}

export async function POST(req: Request) {
  const data = await req.json();
  const { email } = data;

  try {
    const result = await selectUser(email);
    return NextResponse.json({ message: 'User created', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}