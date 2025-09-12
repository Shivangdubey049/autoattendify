"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, CheckCircle2 } from "lucide-react"

export default function PunchPage() {
  const [studentId, setStudentId] = useState("")
  const [isMarked, setIsMarked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePunch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentId.trim()) return

    setLoading(true)

    // Simulate QR scan processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsMarked(true)
    setLoading(false)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsMarked(false)
      setStudentId("")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Punch</h1>
            <p className="text-gray-600">Scan student ID QR codes to mark attendance</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Position the QR code in front of the camera or enter student ID manually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isMarked ? (
                <>
                  {/* QR Scanner Placeholder */}
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">QR Scanner View</p>
                      <p className="text-sm text-gray-400">Camera access required</p>
                    </div>
                  </div>

                  {/* Manual Entry */}
                  <div className="border-t pt-6">
                    <form onSubmit={handlePunch} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Or enter Student ID manually</Label>
                        <Input
                          id="studentId"
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="Enter student ID (e.g., STU001)"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Marking Attendance..." : "Mark Present"}
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Attendance Marked!</h3>
                  <p className="text-gray-600">Student ID: {studentId}</p>
                  <p className="text-sm text-gray-500 mt-2">Ready for next scan...</p>
                </div>
              )}
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
