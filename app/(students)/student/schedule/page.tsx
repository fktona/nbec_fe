'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ScheduleItem = {
  id: number
  day: string
  time: string
  course: string
  instructor: string
  location: string
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [selectedDay, setSelectedDay] = useState<string>('Monday')

  useEffect(() => {
    // In a real application, you would fetch the schedule from an API
    setSchedule([
      { id: 1, day: 'Monday', time: '09:00 AM - 11:00 AM', course: 'UTME Preparation', instructor: 'Dr. Adebayo', location: 'Room 101' },
      { id: 2, day: 'Monday', time: '01:00 PM - 03:00 PM', course: 'Mathematics Mastery', instructor: 'Prof. Okonkwo', location: 'Room 202' },
      { id: 3, day: 'Tuesday', time: '10:00 AM - 12:00 PM', course: 'English Language Skills', instructor: 'Mrs. Nwosu', location: 'Room 103' },
      { id: 4, day: 'Wednesday', time: '09:00 AM - 11:00 AM', course: 'UTME Preparation', instructor: 'Dr. Adebayo', location: 'Room 101' },
      { id: 5, day: 'Thursday', time: '02:00 PM - 04:00 PM', course: 'Mathematics Mastery', instructor: 'Prof. Okonkwo', location: 'Room 202' },
      { id: 6, day: 'Friday', time: '11:00 AM - 01:00 PM', course: 'English Language Skills', instructor: 'Mrs. Nwosu', location: 'Room 103' },
    ])
  }, [])

  const filteredSchedule = schedule.filter(item => item.day === selectedDay)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Schedule</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Class Schedule</span>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.instructor}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
              {filteredSchedule.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No classes scheduled for this day.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

