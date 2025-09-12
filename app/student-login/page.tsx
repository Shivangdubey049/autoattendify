"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-context"

export default function StudentLoginPage() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signInWithPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = signInWithPassword({ role: "student", id, password })

    if (result.ok) {
      router.push("/student")
    } else {
      setError(result.error || "Login failed")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Student Login</CardTitle>
          <CardDescription>Enter your roll number and password to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">Roll Number</Label>
              <Input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter your roll number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Link href="#" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <Link href="/teacher-login" className="text-green-600 hover:underline">
              Teacher? Login here
            </Link>
            <br />
            <Link href="/" className="text-gray-500 hover:underline">
              Back to Home
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">New to AutoAttendify?</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Register your institution by uploading CSV files of students and teachers. We'll handle the setup for
                you.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:hackhawks2025@gmail.com?subject=Institution Registration - AutoAttendify"
                  className="inline-block text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Contact us for Institution Registration
                </a>
                <p className="text-xs text-gray-400">hackhawks2025@gmail.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
