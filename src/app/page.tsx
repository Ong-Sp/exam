import seedStudents from "./_actions/seed-students";
import dropAllStudents from "./_actions/drop-all-students";
import Header from "../../components/Header";
import StudentList from "../../components/StudentList";
import { Suspense } from "react";

interface Props {
  searchParams: {
    query?: string;
  };
}

export default function HomePage({ searchParams }: Props) {
  const query = (searchParams.query || "").toLowerCase();

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Student Management System
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Manage your students with ease
        </p>

        {/* ✅ Search Bar */}
        <form className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="query"
            defaultValue={searchParams.query || ""}
            placeholder="Search by name or department..."
            className="w-full sm:w-1/2 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {/* ✅ Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <form action={seedStudents} className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Seed 5 students
            </button>
          </form>

          <form action={dropAllStudents} className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Drop all
            </button>
          </form>

          <a
            href="/new"
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
          >
            New
          </a>
        </div>

        {/* ✅ Student Grid with Loading State */}
        <Suspense fallback={<p className="text-gray-500 animate-pulse">Loading students...</p>}>
          <StudentList query={query} />
        </Suspense>
      </main>

      {/* ✅ Footer */}
      <footer className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Student Management System — Created by Ongsa
      </footer>
    </div>
  );
}
