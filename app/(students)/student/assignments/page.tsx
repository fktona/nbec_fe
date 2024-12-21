'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Assignment = {
  id: number
  title: string
  course: string
  dueDate: string
  status: 'Pending' | 'Submitted' | 'Graded'
  grade?: number
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])

  useEffect(() => {
    // In a real application, you would fetch assignments from an API
    setAssignments([
      { id: 1, title: 'UTME Practice Test 1', course: 'UTME Preparation', dueDate: '2023-07-15', status: 'Pending' },
      { id: 2, title: 'Algebra Quiz', course: 'Mathematics Mastery', dueDate: '2023-07-10', status: 'Submitted' },
      { id: 3, title: 'English Essay', course: 'UTME Preparation', dueDate: '2023-07-05', status: 'Graded', grade: 85 },
    ])
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>{assignment.course}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Due: {assignment.dueDate}</p>
              <div className="flex justify-between items-center">
                <Badge variant={assignment.status === 'Pending' ? 'destructive' : assignment.status === 'Submitted' ? 'outline' : 'default'}>
                  {assignment.status}
                </Badge>
                {assignment.grade && <span className="font-bold">Grade: {assignment.grade}%</span>}
              </div>
              <Button className="mt-4 w-full">
                {assignment.status === 'Pending' ? 'Submit Assignment' : 'View Details'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

