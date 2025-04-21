'use server';

import prisma from '../../../utils/db';
import hashPassword from '../../../utils/hashPassword';

export default async function registerUser(
  prevState: unknown,
  formData: FormData
) {
  const username = formData.get('name') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'กรุณากรอกข้อมูลให้ครบ', message: '' };
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return { error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว', message: '' };
  }

  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      username, // ✅ ต้องเป็น username ไม่ใช่ name
      password: hashed,
    },
  });

  return { error: '', message: 'ลงทะเบียนสำเร็จ' };
}
