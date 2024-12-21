'use client'

import { useState } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([
    { date: new Date(2023, 5, 15), title: 'UTME Preparation Workshop' },
    { date: new Date(2023, 5, 20), title: 'Parent-Teacher Meeting' },
    { date: new Date(2023, 6, 1), title: 'Summer Classes Begin' },
  ])

  const [newEvent, setNewEvent] = useState({ date: '', title: '' })

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEvent.date && newEvent.title) {
      setEvents([...events, { date: new Date(newEvent.date), title: newEvent.title }])
      setNewEvent({ date: '', title: '' })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">School Calendar</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS.map(day => (
            <div key={day} className="text-center font-semibold">{day}</div>
          ))}
          {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {Array.from({ length: getDaysInMonth(currentDate) }).map((_, index) => {
            const day = index + 1
            const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dayEvents = events.filter(event => 
              event.date.toDateString() === currentMonthDate.toDateString()
            )
            return (
              <div key={day} className="border p-2 h-24 overflow-y-auto">
                <div className="font-semibold">{day}</div>
                {dayEvents.map((event, eventIndex) => (
                  <div key={eventIndex} className="text-sm bg-blue-100 p-1 mt-1 rounded">
                    {event.title}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="eventDate"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title</label>
            <input
              type="text"
              id="eventTitle"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Add Event
          </button>
        </form>
      </div>
    </div>
  )
}

