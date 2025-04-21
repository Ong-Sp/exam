'use server';

import prisma from "../../../utils/db";

export default async function deleteStudent(id: number) {
  try {
    await prisma.student.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false };
  }
}
