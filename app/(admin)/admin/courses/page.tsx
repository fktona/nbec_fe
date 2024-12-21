'use client'

import { useState } from 'react'
import { Trash2, Edit } from 'lucide-react'

export default function CoursesPage() {
  const [courses, setCourses] = useState([
    { id: '1', name: 'UTME Preparation', description: 'Comprehensive preparation for UTME exams', duration: '3 months' },
    { id: '2', name: 'Mathematics Mastery', description: 'Advanced mathematics for secondary school students', duration: '6 months' },
  ])

  const [newCourse, setNewCourse] = useState({ name: '', description: '', duration: '' })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCourse(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setCourses(courses.map(course => 
        course.id === editingId ? { ...course, ...newCourse } : course
      ))
      setEditingId(null)
    } else {
      setCourses([...courses, { id: Date.now().toString(), ...newCourse }])
    }
    setNewCourse({ name: '', description: '', duration: '' })
  }

  const handleEdit = (id: string) => {
    const courseToEdit = courses.find(course => course.id === id)
    if (courseToEdit) {
      setNewCourse(courseToEdit)
      setEditingId(id)
    }
  }

  const handleDelete = (id: string) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Courses Management</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCourse.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={newCourse.duration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {editingId ? 'Update Course' : 'Add Course'}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-sm text-gray-500 mt-2">Duration: {course.duration}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(course.id)} className="text-blue-600 hover:text-blue-800 mr-2">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

