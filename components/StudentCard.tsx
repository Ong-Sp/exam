'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import deleteStudent from '@/app/_actions/delete-student';

interface Student {
  id: number;
  name: string;
  age: number;
  department: string;
  gpa: number;
}

export default function StudentCard({ student }: { student: Student }) {
  const router = useRouter();

  const gpaColor =
    student.gpa < 2
      ? 'bg-red-100 text-red-600'
      : student.gpa < 3.5
      ? 'bg-blue-100 text-blue-600'
      : 'bg-green-100 text-green-600';

  const handleDelete = async () => {
    const confirmed = confirm(`ต้องการลบนักเรียน ${student.name} หรือไม่?`);
    if (!confirmed) return;

    const result = await deleteStudent(student.id);
    if (result.success) {
      router.refresh(); // โหลดหน้าใหม่เพื่ออัปเดตรายการ
    } else {
      alert('ลบไม่สำเร็จ กรุณาลองใหม่');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{student.name}</h3>
        <span className={`text-sm px-2 py-1 rounded ${gpaColor}`}>
          GPA: {student.gpa.toFixed(1)}
        </span>
      </div>
      <p>Age: {student.age}</p>
      <p>Department: {student.department}</p>
      <p className="text-sm text-gray-400">ID: {student.id}</p>

      <div className="flex gap-2 mt-3">
        <Link
          href={`/edit/${student.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
