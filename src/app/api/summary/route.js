import { NextResponse } from 'next/server';
import axios from 'axios';
import { transformUsers } from '../../../utils/transformer';

export async function GET() {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    const result = transformUsers(response.data.users);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}