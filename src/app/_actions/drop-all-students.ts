'use server';

import prisma from "../../../utils/db";

export default async function dropAllStudents() {
  // ลบนักเรียนทั้งหมดในตาราง Student
  await prisma.student.deleteMany({});
}
