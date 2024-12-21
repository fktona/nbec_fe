'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Grade = {
  courseId: number
  courseName: string
  grade: number
  letterGrade: string
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    // In a real application, you would fetch grades from an API
    setGrades([
      { courseId: 1, courseName: 'UTME Preparation', grade: 85, letterGrade: 'A' },
      { courseId: 2, courseName: 'Mathematics Mastery', grade: 78, letterGrade: 'B' },
      { courseId: 3, courseName: 'English Language Skills', grade: 92, letterGrade: 'A+' },
    ])
  }, [])

  const calculateGPA = (grades: Grade[]) => {
    const totalPoints = grades.reduce((sum, grade) => sum + grade.grade, 0)
    return (totalPoints / grades.length).toFixed(2)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Grades</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Grade Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">GPA: {calculateGPA(grades)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Grade Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Letter Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.courseId}>
                  <TableCell>{grade.courseName}</TableCell>
                  <TableCell>{grade.grade}</TableCell>
                  <TableCell>{grade.letterGrade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

