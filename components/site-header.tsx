"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-context"

const routes = [
  { href: "/", label: "Home" },
  { href: "/attendance", label: "Overall Attendance" },
  { href: "/face-scan", label: "Face Recognition" },
  { href: "/punch", label: "Punch (QR)" },
  { href: "/manual", label: "Manual Entry" },
  { href: "/calendar", label: "Academic Calendar" },
  { href: "/reports", label: "Reports" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { role, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-green-700">AutoAttendify</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center flex-1 space-x-8 ml-16">
          {routes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600 whitespace-nowrap",
                pathname === r.href ? "text-green-600" : "text-gray-600",
              )}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3 ml-8">
          {role === null && (
            <Link href="/login">
              <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                Login
              </Button>
            </Link>
          )}
          {role === "teacher" && (
            <>
              <Link href="/teacher">
                <Button variant="ghost" size="sm">
                  Teacher Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          )}
          {role === "student" && (
            <>
              <Link href="/student">
                <Button variant="ghost" size="sm">
                  Student Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {open && (
          <div id="mobile-nav" className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg md:hidden">
            {routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={cn(
                  "block px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50",
                  pathname === r.href ? "text-green-600 bg-green-50" : "text-gray-600",
                )}
                onClick={() => setOpen(false)}
              >
                {r.label}
              </Link>
            ))}
            {role === null && (
              <Link
                href="/login"
                className="block px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 text-gray-600"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
            {role === "teacher" && (
              <>
                <Link
                  href="/teacher"
                  className="block px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 text-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Teacher Dashboard
                </Link>
                <button
                  className="block w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 text-gray-600"
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                >
                  Sign out
                </button>
              </>
            )}
            {role === "student" && (
              <>
                <Link
                  href="/student"
                  className="block px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 text-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Student Dashboard
                </Link>
                <button
                  className="block w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 text-gray-600"
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
