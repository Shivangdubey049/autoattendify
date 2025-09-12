"use client"

import Link from "next/link"
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-context"

export default function TeacherDashboardPage() {
  const { signOut } = useAuth()

  return (
    <RoleGuard role="teacher">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Upload attendance, manage students, and view reports.</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Attendance</CardTitle>
                <CardDescription>CSV or from scanner</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/teacher/upload">
                  <Button className="w-full">Open</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Students</CardTitle>
                <CardDescription>Add, edit, or remove</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/teacher/students">
                  <Button className="w-full">Open</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Punch (QR)</CardTitle>
                <CardDescription>Scan ID QR to mark</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/punch">
                  <Button className="w-full">Open</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/teacher/profile">
                  <Button className="w-full">Open</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
