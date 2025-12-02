import { NextRequest, NextResponse } from 'next/server';

import { HelloWorldData } from '@/types';

export async function POST(request: NextRequest) {
  let body;
  
  try {
    body = await request.json();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body.message !== 'string' || !body.message.trim()) {
    return NextResponse.json<HelloWorldData>(
      { message: 'Request body must contain a non-empty "message" field' },
      { status: 400 }
    );
  }

  const currentTime = new Date().toISOString().split('.')[0];
  return NextResponse.json<HelloWorldData>(
    { message: `You said "${body.message}" at ${currentTime}` },
    { status: 200 }
  );
}
