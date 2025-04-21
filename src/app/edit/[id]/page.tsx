import { redirect } from "next/navigation";
import updateStudent from "@/app/_actions/update-student";
import { getSession } from "../../../../utils/loginUser";
import prisma from "../../../../utils/db";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: Props) {
  const session = await getSession();

  // 🔒 ไม่ได้ login → กลับหน้า login
  if (!session) {
    redirect("/login");
  }

  const id = Number(params.id);
  const student = await prisma.student.findUnique({ where: { id } });

  if (!student) {
    return <p className="text-red-500">Student not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Edit Student</h1>
      <form
        action={async (formData) => {
          "use server";
          await updateStudent(formData);
          redirect("/"); // ✅ กลับหน้าหลักหลัง update เสร็จ
        }}
        className="max-w-md space-y-4"
      >
        <input type="hidden" name="id" value={student.id} />
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={student.name}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            defaultValue={student.age}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Department</label>
          <input
            type="text"
            name="department"
            defaultValue={student.department}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">GPA (0–4)</label>
          <input
            type="number"
            name="gpa"
            step="0.1"
            max="4"
            min="0"
            defaultValue={student.gpa}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Student
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
          >
            Back to List
          </a>
        </div>
      </form>
    </div>
  );
}
