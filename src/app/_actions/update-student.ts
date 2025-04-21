'use server';

import { redirect } from "next/navigation";
import prisma from "../../../utils/db";

export default async function updateStudent(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;
  const age = Number(formData.get('age'));
  const department = formData.get('department') as string;
  const gpa = Number(formData.get('gpa'));

  if (!id || !name || !department || isNaN(age) || isNaN(gpa)) {
    console.error("Invalid data");
    return;
  }

  await prisma.student.update({
    where: { id },
    data: { name, age, department, gpa },
  });
    // ✅ Redirect กลับหน้าหลักหลังบันทึก
    redirect('/');
}
