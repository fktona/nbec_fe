"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    password: string;
    sex: string;
    email: string;
    desiredCourse: string;
    preferredInstitution: string;
    mobileNumber: string;
    subjectCombination: string[];
    parentsPhoneNumber: string;
    desiredUTMEScore: string;
    doneUTMEBefore: boolean;
    previousScore: string;
  }>({
    firstName: "",
    lastName: "",
    password: "",
    sex: "",
    email: "",
    desiredCourse: "",
    preferredInstitution: "",
    mobileNumber: "",
    subjectCombination: [],
    parentsPhoneNumber: "",
    desiredUTMEScore: "",
    doneUTMEBefore: false,
    previousScore: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subjectCombination: checked
        ? [...prev.subjectCombination, value]
        : prev.subjectCombination.filter((subject) => subject !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate successful submission
    alert("Registration successful!");
    setIsSubmitting(false);
    router.push("/admin/dashboard"); // Redirect to a dashboard page
  };

  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-blue-600">
                New Breed Educational Centre
              </h1>
              <p className="mt-2 text-gray-600">Registration Form</p>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="flex space-x-4">
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <select
                    id="sex"
                    name="sex"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label
                    htmlFor="sex"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm"
                  >
                    Sex
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="desiredCourse"
                    name="desiredCourse"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Desired Course"
                    value={formData.desiredCourse}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="desiredCourse"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Desired Course
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="preferredInstitution"
                    name="preferredInstitution"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Preferred Institution"
                    value={formData.preferredInstitution}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="preferredInstitution"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Preferred Institution
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="mobileNumber"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mobile Number
                  </label>
                </div>
                <div className="relative">
                  <fieldset>
                    <legend className="text-sm font-semibold text-gray-700 mb-2">
                      Subject Combination
                    </legend>
                    <div className="space-y-2">
                      {[
                        "Mathematics",
                        "English",
                        "Physics",
                        "Chemistry",
                        "Biology",
                      ].map((subject) => (
                        <label
                          key={subject}
                          className="inline-flex items-center mr-4"
                        >
                          <input
                            type="checkbox"
                            name="subjectCombination"
                            value={subject}
                            checked={formData.subjectCombination.includes(
                              subject
                            )}
                            onChange={handleSubjectChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <div className="relative">
                  <input
                    id="parentsPhoneNumber"
                    name="parentsPhoneNumber"
                    type="tel"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Parent's Phone Number"
                    value={formData.parentsPhoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="parentsPhoneNumber"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Parent's Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="desiredUTMEScore"
                    name="desiredUTMEScore"
                    type="number"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Desired UTME Score"
                    value={formData.desiredUTMEScore}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="desiredUTMEScore"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Desired UTME Score
                  </label>
                </div>
                <div className="relative">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="doneUTMEBefore"
                      checked={formData.doneUTMEBefore}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">
                      Have you taken UTME before?
                    </span>
                  </label>
                </div>
                {formData.doneUTMEBefore && (
                  <div className="relative">
                    <input
                      id="previousScore"
                      name="previousScore"
                      type="number"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Previous UTME Score"
                      value={formData.previousScore}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="previousScore"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Previous UTME Score
                    </label>
                  </div>
                )}
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
