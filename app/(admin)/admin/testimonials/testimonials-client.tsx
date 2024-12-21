"use client";

import { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Testimonial,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/actions/actions";

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsClient({
  initialTestimonials,
}: TestimonialsClientProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    await deleteTestimonial(id);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (editingTestimonial) {
      const updatedTestimonial = await updateTestimonial(
        editingTestimonial.id,
        formData
      );
      setTestimonials(
        testimonials.map((t) =>
          t.id === updatedTestimonial.id ? updatedTestimonial : t
        )
      );
    } else {
      const newTestimonial = await createTestimonial(formData);
      setTestimonials([...testimonials, newTestimonial]);
    }

    setShowEditor(false);
    setEditingTestimonial(null);
  };

  return (
    <div className="space-y-6">
      {!showEditor && (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">
            {testimonials.length > 0
              ? "Add Another Testimonial"
              : "Start Creating Your Testimonial!"}
          </h2>
          <p className="text-sm mt-2 text-blue-100 text-center">
            Share your experiences and feedback with us. Click the button below
            to start creating a new testimonial.
          </p>
          <button
            onClick={() => setShowEditor(true)}
            className="mt-4 bg-white text-blue-600 hover:text-blue-800 font-semibold px-6 py-3 rounded-full shadow-md flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Testimonial
          </button>
        </div>
      )}

      {showEditor && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={editingTestimonial?.firstName || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={editingTestimonial?.lastName || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                defaultValue={editingTestimonial?.role || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company/Institution
              </label>
              <input
                type="text"
                id="company"
                name="company"
                defaultValue={editingTestimonial?.company || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Testimonial Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              defaultValue={editingTestimonial?.content || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowEditor(false);
                setEditingTestimonial(null);
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          View Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {testimonial.firstName} {testimonial.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
