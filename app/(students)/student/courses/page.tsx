'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Course = {
  id: number
  name: string
  description: string
  progress: number
  instructor: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // In a real application, you would fetch courses from an API
    setCourses([
      { id: 1, name: 'UTME Preparation', description: 'Comprehensive preparation for UTME exams', progress: 60, instructor: 'Dr. Adebayo' },
      { id: 2, name: 'Mathematics Mastery', description: 'Advanced mathematics for secondary school students', progress: 40, instructor: 'Prof. Okonkwo' },
      { id: 3, name: 'English Language Skills', description: 'Improve your English language proficiency', progress: 75, instructor: 'Mrs. Nwosu' },
    ])
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Instructor: {course.instructor}</p>
              <div className="mb-2">
                <Progress value={course.progress} className="w-full" />
                <p className="text-sm text-gray-600 mt-1">Progress: {course.progress}%</p>
              </div>
              <Button className="w-full">Go to Course</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

