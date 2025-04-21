'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import addStudent from '@/app/_actions/add-student';
import { useEffect } from 'react';
import Header from '../../../components/Header';

export default function AddStudentPage() {
  const router = useRouter();

  const [state, formAction] = useActionState(addStudent, {
    error: '',
    message: '',
  });

  useEffect(() => {
    if (state.message === 'Add success') {
      router.push('/');
    }
  }, [state.message, router]);

  return (
    <div className="p-6">
      <Header />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">Add New Student</h2>
          <button
            className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100"
            onClick={() => router.push('/')}
          >
            Back to List
          </button>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="name" type="text" required className="w-full border px-3 py-2 rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input name="age" type="number" required className="w-full border px-3 py-2 rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input name="department" type="text" required className="w-full border px-3 py-2 rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GPA (0–4)</label>
            <input name="gpa" type="number" step="0.1" min="0" max="4" required className="w-full border px-3 py-2 rounded text-black" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Student
          </button>
          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        </form>
      </div>
    </div>
  );
}
