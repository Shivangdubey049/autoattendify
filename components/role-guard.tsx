"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-context"

export function RoleGuard({
  role,
  children,
  fallback,
}: {
  role: "teacher" | "student"
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const auth = useAuth()

  if (auth.role === role) return <>{children}</>
  if (fallback) return <>{fallback}</>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Access restricted</h1>
        <p className="text-gray-600">You must be logged in as a {role} to view this page.</p>
        <div className="space-x-4">
          <Link href={`/${role}-login`}>
            <Button>Go to Login</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
