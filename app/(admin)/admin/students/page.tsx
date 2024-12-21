import { cookies } from "next/headers";
import StudentDashboard from "./_components/StudentDashboard";
import { getStudents } from "@/actions/actions";

export default async function DashboardPage() {
  const { data: students } = await getStudents();
  return <StudentDashboard initialStudents={students} />;
}
