import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);
const TIMEOUT = 60; // ✅ 1 นาที

export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TIMEOUT} sec from now`)
    .sign(key);
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

interface UserInput {
  id: number;
  name: string;
  role?: string;
}

export async function loginUser(user: UserInput, remember: boolean) {
  const expires = new Date(Date.now() + (remember ? 86400000 : TIMEOUT * 1000)); // ✅ 1 วัน หรือ 1 นาที
  const session = await encrypt({ ...user, expires });

  (await cookies()).set('session', session, {
    httpOnly: true,
    expires,
    path: '/',
  });

  return { message: 'Login Success' };
}

export async function logoutUser() {
  try {
    (await cookies()).delete('session');
    return { message: 'Logout Success' };
  } catch (error) {
    console.error('Logout error:', error);
    return { message: '' };
  }
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;

  try {
    return await decrypt(session);
  } catch {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + TIMEOUT * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date,
  });

  return res;
}
