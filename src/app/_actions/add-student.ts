'use server';

import prisma from "../../../utils/db";

export default async function addStudent(
  prevState: unknown,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const age = parseInt(formData.get('age') as string);
  const department = formData.get('department') as string;
  const gpa = parseFloat(formData.get('gpa') as string);

  if (!name || isNaN(age) || !department || isNaN(gpa)) {
    return { error: 'ข้อมูลไม่ครบหรือไม่ถูกต้อง', message: '' };
  }

  if (gpa < 0 || gpa > 4) {
    return { error: 'GPA ต้องอยู่ระหว่าง 0-4', message: '' };
  }

  await prisma.student.create({
    data: {
      name,
      age,
      department,
      gpa,
    },
  });

  return { error: '', message: 'Add success' };
}
