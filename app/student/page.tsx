"use client"

import Link from "next/link"
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-context"

export default function StudentDashboardPage() {
  const { signOut } = useAuth()

  return (
    <RoleGuard role="student">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">View your classes and track your attendance.</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Attendance</CardTitle>
                <CardDescription>Overview and absences</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/student/attendance">
                  <Button className="w-full">View</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Classes</CardTitle>
                <CardDescription>Subjects and schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/student/classes">
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
                <Link href="/student/profile">
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
