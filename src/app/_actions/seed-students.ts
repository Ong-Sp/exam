'use server';

import prisma from "../../../utils/db";

export default async function seedStudents() {
  const students = [
    { name: 'Warodom Werapun', age: 47, department: 'Digital Engineering', gpa: 3.9 },
    { name: 'Jane Doe', age: 28, department: 'Computer Science', gpa: 3.8 },
    { name: 'Alice Smith', age: 22, department: 'Mathematics', gpa: 3.6 },
    { name: 'Bob Johnson', age: 30, department: 'Physics', gpa: 3.2 },
    { name: 'Charlie Brown', age: 25, department: 'Chemistry', gpa: 3.9 },
  ];

  await prisma.student.deleteMany(); // เคลียร์ของเดิมก่อน
  await prisma.student.createMany({ data: students });
}
