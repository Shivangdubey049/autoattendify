"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { BookOpen, Users, GraduationCap, CalendarIcon } from "lucide-react"

// Indian Academic Calendar Events
const academicEvents = [
  // First Semester (June - November)
  { date: "2024-06-15", title: "Academic Session Begins", type: "session", description: "New academic year starts" },
  { date: "2024-07-15", title: "First Internal Assessment", type: "exam", description: "Mid-term examinations" },
  { date: "2024-08-15", title: "Independence Day", type: "holiday", description: "National Holiday" },
  { date: "2024-09-05", title: "Teachers' Day", type: "holiday", description: "Celebrating educators" },
  { date: "2024-10-02", title: "Gandhi Jayanti", type: "holiday", description: "National Holiday" },
  { date: "2024-10-15", title: "Diwali Break Begins", type: "break", description: "Festival holidays start" },
  { date: "2024-10-25", title: "Diwali Break Ends", type: "break", description: "Classes resume" },
  { date: "2024-11-15", title: "First Semester Exams", type: "exam", description: "Final examinations" },

  // Second Semester (December - May)
  { date: "2024-12-01", title: "Second Semester Begins", type: "session", description: "Winter semester starts" },
  { date: "2024-12-25", title: "Christmas Holiday", type: "holiday", description: "Christmas celebration" },
  { date: "2025-01-26", title: "Republic Day", type: "holiday", description: "National Holiday" },
  { date: "2025-02-15", title: "Second Internal Assessment", type: "exam", description: "Mid-term examinations" },
  { date: "2025-03-08", title: "Holi Break", type: "break", description: "Festival of colors" },
  { date: "2025-04-15", title: "Final Semester Exams", type: "exam", description: "Annual examinations" },
  { date: "2025-05-15", title: "Summer Break Begins", type: "break", description: "Academic year ends" },
]

const eventTypeColors = {
  session: "bg-blue-100 text-blue-800 border-blue-200",
  exam: "bg-red-100 text-red-800 border-red-200",
  holiday: "bg-green-100 text-green-800 border-green-200",
  break: "bg-orange-100 text-orange-800 border-orange-200",
}

const eventTypeIcons = {
  session: BookOpen,
  exam: GraduationCap,
  holiday: CalendarIcon,
  break: Users,
}

export default function AcademicCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return academicEvents.filter((event) => event.date === dateString)
  }

  // Get upcoming events (next 5)
  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split("T")[0]
    return academicEvents.filter((event) => event.date >= today).slice(0, 5)
  }

  // Check if date has events
  const hasEvents = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return academicEvents.some((event) => event.date === dateString)
  }

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Calendar</h1>
          <p className="text-gray-600">Indian Academic Session 2024-25</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Academic Calendar
                </CardTitle>
                <CardDescription>
                  Click on any date to view events. Highlighted dates have scheduled activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md border"
                  modifiers={{
                    hasEvents: (date) => hasEvents(date),
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      fontWeight: "bold",
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && selectedEvents.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>
                    Events on{" "}
                    {selectedDate.toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedEvents.map((event, index) => {
                      const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons]
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <IconComponent className="h-5 w-5 mt-0.5 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              <Badge className={eventTypeColors[event.type as keyof typeof eventTypeColors]}>
                                {event.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Next 5 scheduled activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => {
                    const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons]
                    const eventDate = new Date(event.date)
                    return (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <IconComponent className="h-4 w-4 mt-1 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{event.title}</p>
                          <p className="text-xs text-gray-500 mb-1">
                            {eventDate.toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <Badge size="sm" className={eventTypeColors[event.type as keyof typeof eventTypeColors]}>
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Academic Session Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Academic Year:</span>
                  <span className="text-sm font-medium">2024-25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Semester:</span>
                  <span className="text-sm font-medium">First</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Session Type:</span>
                  <span className="text-sm font-medium">Annual</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Events:</span>
                  <span className="text-sm font-medium">{academicEvents.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
