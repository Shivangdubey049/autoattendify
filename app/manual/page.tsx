"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save } from "lucide-react"

const sampleStudents: { id: string; name: string; rollNo: string }[] = []

export default function ManualEntryPage() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [saved, setSaved] = useState(false)

  const filteredStudents = sampleStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: present,
    }))
  }

  const handleSave = () => {
    // Save attendance data (would normally sync to backend)
    console.log("Saving attendance:", attendance)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const presentCount = Object.values(attendance).filter(Boolean).length
  const totalCount = sampleStudents.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual Attendance Entry</h1>
            <p className="text-gray-600">Traditional roll-call with digital tracking</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Pencil className="h-5 w-5 text-green-600" />
                  <CardTitle>Class Attendance</CardTitle>
                </div>
                <div className="text-sm text-gray-600">
                  Present: {presentCount}/{totalCount}
                </div>
              </div>
              <CardDescription>Mark students as present or absent for today's class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Search Students</Label>
                <Input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, roll number, or ID..."
                />
              </div>

              {/* Student List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">
                          Roll No: {student.rollNo} • ID: {student.id}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`present-${student.id}`}
                          checked={attendance[student.id] || false}
                          onCheckedChange={(checked) => handleAttendanceChange(student.id, checked as boolean)}
                        />
                        <Label htmlFor={`present-${student.id}`} className="text-sm font-medium cursor-pointer">
                          Present
                        </Label>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Pencil className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-lg font-medium mb-1">No Students Loaded</p>
                    <p className="text-sm">Import your class roster to begin taking attendance</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    const allPresent = sampleStudents.reduce(
                      (acc, student) => {
                        acc[student.id] = true
                        return acc
                      },
                      {} as Record<string, boolean>,
                    )
                    setAttendance(allPresent)
                  }}
                >
                  Mark All Present
                </Button>
                <Button variant="outline" onClick={() => setAttendance({})}>
                  Clear All
                </Button>
                <Button onClick={handleSave} className="ml-auto" disabled={saved}>
                  <Save className="h-4 w-4 mr-2" />
                  {saved ? "Saved!" : "Save Attendance"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Attendance data is saved locally and will sync when online</p>
          </div>
        </div>
      </div>
    </div>
  )
}
