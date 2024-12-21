"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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

type StudentInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
};

export default function StudentInfoModal({
  isOpen,
  onClose,
  student,
}: StudentInfoModalProps) {
  if (!student) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Student Information
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <strong>Name:</strong> {student.firstName}{" "}
                    {student.lastName}
                    <br />
                    <strong>Email:</strong> {student.email}
                    <br />
                    <strong>Sex:</strong> {student.sex}
                    <br />
                    <strong>Student ID:</strong> {student.studentId} <br />
                    <strong>Desired Course:</strong> {student.desiredCourse}
                    <br />
                    <strong>Preferred Institution:</strong>{" "}
                    {student.preferredInstitution}
                    <br />
                    <strong>Mobile Number:</strong> {student.mobileNumber}
                    <br />
                    <strong>Subject Combination:</strong>{" "}
                    {student.subjectCombination.join(", ")}
                    <br />
                    <strong>Parent's Phone Number:</strong>{" "}
                    {student.parentsPhoneNumber}
                    <br />
                    <strong>Desired UTME Score:</strong>{" "}
                    {student.desiredUTMEScore}
                    <br />
                    <strong>Done UTME Before:</strong>{" "}
                    {student.doneUTMEBefore ? "Yes" : "No"}
                    <br />
                    {student.doneUTMEBefore && (
                      <>
                        <strong>Previous Score:</strong> {student.previousScore}
                        <br />
                      </>
                    )}
                    <strong>Status:</strong> {student.status}
                    <br />
                    <strong>Created At:</strong>{" "}
                    {new Date(student.createdAt).toLocaleString()}
                    <br />
                    <strong>Updated At:</strong>{" "}
                    {new Date(student.updatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
