'use server';

import prisma from "../../../utils/db";
import hashPassword from "../../../utils/hashPassword";
import { loginUser } from "../../../utils/loginUser";

export default async function login(
  prevState: { error: string; message: string },
  formData: FormData
) {
  const username = formData.get('name') as string;
  const password = formData.get('password') as string;
  const remember = formData.get('remember') === 'on';

  if (!username || !password) {
    return { error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', message: '' };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return { error: 'ไม่พบผู้ใช้นี้', message: '' };
  }

  const hashed = await hashPassword(password);
  if (user.password !== hashed) {
    return { error: 'รหัสผ่านไม่ถูกต้อง', message: '' };
  }

  await loginUser(
    {
      id: user.id,
      name: user.username,
    },
    remember
  );

  return { error: '', message: 'Login success' };
}
