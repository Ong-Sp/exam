import prisma from "../utils/db";
import StudentCard from "./StudentCard";

export default async function StudentList({ query }: { query: string }) {
  const students = await prisma.student.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { department: { contains: query } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (students.length === 0) {
    return <p className="text-gray-500">No students found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
