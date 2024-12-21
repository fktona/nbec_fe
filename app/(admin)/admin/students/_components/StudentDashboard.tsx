"use client";

import { useState, useEffect } from "react";
import { Search, Check, X, MessageSquare, Trash2, Eye } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import StudentInfoModal from "./StudentInfoModal";
import StudentCard from "./StudentCard";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/app/config/config";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  desiredCourse: string;
  studentId: string;
  status: string;
  sex: string;
  preferredInstitution: string;
  mobileNumber: string;
  subjectCombination: string[];
  parentsPhoneNumber: string;
  desiredUTMEScore: number;
  doneUTMEBefore: boolean;
  previousScore: number | null;
  createdAt: string;
  updatedAt: string;
};

type StudentDashboardProps = {
  initialStudents: Student[];
};

export default function StudentDashboard({
  initialStudents,
}: StudentDashboardProps) {
  const [students, setStudents] = useState(initialStudents);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    type: "approve" | "delete";
    studentId: string | null;
  }>({ isOpen: false, type: "approve", studentId: null });
  const [studentInfoModal, setStudentInfoModal] = useState<{
    isOpen: boolean;
    student: Student | null;
  }>({ isOpen: false, student: null });
  const [isDesktop, setIsDesktop] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Synchronize searchTerm with query param
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update query parameters when the search term changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`);
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`${config.API_URL}/students/approve/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        setStudents(
          students.map((student) =>
            student.id === id ? { ...student, status: "approved" } : student
          )
        );
      } else {
        throw new Error("Failed to approve student");
      }
    } catch (error) {
      console.error("Error approving student:", error);
      alert("Failed to approve student. Please try again.");
    }
    setConfirmationModal({ isOpen: false, type: "approve", studentId: null });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${config.API_URL}/students/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStudents(students.filter((student) => student.id !== id));
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
    setConfirmationModal({ isOpen: false, type: "delete", studentId: null });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Student Management
      </h1>
      <div className="flex items-center bg-white rounded-md p-2">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          className="ml-2 flex-1 outline-none"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      {isDesktop ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desired Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.studentId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {student.desiredCourse}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {student.status === "pending" && (
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            isOpen: true,
                            type: "approve",
                            studentId: student.id,
                          })
                        }
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setStudentInfoModal({ isOpen: true, student })
                      }
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          isOpen: true,
                          type: "delete",
                          studentId: student.id,
                        })
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onApprove={() =>
                setConfirmationModal({
                  isOpen: true,
                  type: "approve",
                  studentId: student.id,
                })
              }
              onDelete={() =>
                setConfirmationModal({
                  isOpen: true,
                  type: "delete",
                  studentId: student.id,
                })
              }
              onViewInfo={() => setStudentInfoModal({ isOpen: true, student })}
            />
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() =>
          setConfirmationModal({
            isOpen: false,
            type: "approve",
            studentId: null,
          })
        }
        onConfirm={() =>
          confirmationModal.studentId &&
          (confirmationModal.type === "approve"
            ? handleApprove(confirmationModal.studentId)
            : handleDelete(confirmationModal.studentId))
        }
        title={
          confirmationModal.type === "approve"
            ? "Approve Student"
            : "Delete Student"
        }
        message={
          confirmationModal.type === "approve"
            ? "Are you sure you want to approve this student?"
            : "Are you sure you want to delete this student?"
        }
      />
      <StudentInfoModal
        isOpen={studentInfoModal.isOpen}
        onClose={() => setStudentInfoModal({ isOpen: false, student: null })}
        student={studentInfoModal.student}
      />
    </div>
  );
}
