import { Check, Trash2, Eye } from "lucide-react";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  desiredCourse: string;
  studentId: string;
  status: string;
};

type StudentCardProps = {
  student: Student;
  onApprove: () => void;
  onDelete: () => void;
  onViewInfo: () => void;
};

export default function StudentCard({
  student,
  onApprove,
  onDelete,
  onViewInfo,
}: StudentCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {student.firstName} {student.lastName}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            student.status === "approved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {student.status}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        <p>Student ID: {student.studentId}</p>
        <p>Email: {student.email}</p>
        <p>Desired Course: {student.desiredCourse}</p>
      </div>
      <div className="flex justify-end space-x-2">
        {student.status === "pending" && (
          <button
            onClick={onApprove}
            className="p-2 text-green-600 hover:text-green-900"
          >
            <Check className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={onViewInfo}
          className="p-2 text-blue-600 hover:text-blue-900"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:text-red-900"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
