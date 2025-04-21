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

// ✅ ฟังก์ชันกำหนดสีตามระดับ GPA
const getGpaColor = (gpa: number) => {
  if (gpa >= 3.5) return 'bg-green-100 text-green-600';
  if (gpa >= 3.0) return 'bg-blue-100 text-blue-600';
  if (gpa >= 2.5) return 'bg-yellow-100 text-yellow-600';
  return 'bg-red-100 text-red-600';
};

export default function StudentCard({ student }: { student: Student }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`ต้องการลบนักเรียน ${student.name} หรือไม่?`);
    if (!confirmed) return;

    const result = await deleteStudent(student.id);
    if (result.success) {
      router.refresh(); // โหลดใหม่เพื่อแสดงข้อมูลล่าสุด
    } else {
      alert('ลบไม่สำเร็จ กรุณาลองใหม่');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{student.name}</h3>
        <span className={`text-sm px-2 py-1 rounded ${getGpaColor(student.gpa)}`}>
          GPA: {student.gpa.toFixed(2)}
        </span>
      </div>

      <p className="text-gray-700">Age: {student.age}</p>
      <p className="text-gray-700">Department: {student.department}</p>
      <p className="text-sm text-gray-400">ID: {student.id}</p>

      <div className="flex gap-2 mt-4">
        <Link
          href={`/edit/${student.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
