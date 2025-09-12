"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Role = "teacher" | "student" | null

type AuthState = {
  role: Role
  email?: string | null
  id?: string | null
}

type DemoUser = {
  role: Exclude<Role, null>
  id: string // enrollment (teacher) or roll (student)
  name?: string
  dob?: string // DDMMYYYY
  password: string // for demo ONLY
}

type AuthContextValue = {
  role: Role
  email: string | null
  id: string | null
  signIn: (opts: { role: Exclude<Role, null>; email?: string; id?: string }) => void
  signOut: () => void
  signInWithPassword: (opts: { role: Exclude<Role, null>; id: string; password: string }) => {
    ok: boolean
    error?: string
  }
  resetPasswordToDOB: (opts: { role: Exclude<Role, null>; id: string; dob: string }) => { ok: boolean; error?: string }
}

const USERS_KEY = "ras-users"

function loadUsers(): Record<string, DemoUser> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, DemoUser>
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, DemoUser>) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {}
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ role: null, email: null, id: null })

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ras-auth")
      if (raw) {
        const parsed = JSON.parse(raw) as AuthState
        setState({ role: parsed.role, email: parsed.email ?? null, id: parsed.id ?? null })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("ras-auth", JSON.stringify(state))
    } catch {}
  }, [state])

  const value = useMemo<AuthContextValue>(
    () => ({
      role: state.role,
      email: state.email ?? null,
      id: state.id ?? null,
      signIn: ({ role, email, id }) => setState({ role, email: email ?? null, id: id ?? null }),
      signOut: () => setState({ role: null, email: null, id: null }),
      signInWithPassword: ({ role, id, password }) => {
        const key = `${role}:${id}`.trim()
        if (!id || !password) return { ok: false, error: "ID and password are required" }

        const ddmmyyyy = /^\d{8}$/
        const users = loadUsers()
        const existing = users[key]

        if (existing) {
          if (existing.password === password) {
            setState({ role, email: null, id })
            return { ok: true }
          }
          return { ok: false, error: "Invalid password" }
        }

        if (!ddmmyyyy.test(password)) {
          return { ok: false, error: "For first-time login, use DOB as DDMMYYYY (e.g., 01012006)" }
        }

        users[key] = { role, id, dob: password, password }
        saveUsers(users)
        setState({ role, email: null, id })
        return { ok: true }
      },
      resetPasswordToDOB: ({ role, id, dob }) => {
        const ddmmyyyy = /^\d{8}$/
        if (!ddmmyyyy.test(dob)) return { ok: false, error: "DOB must be DDMMYYYY (e.g., 01012006)" }

        const key = `${role}:${id}`.trim()
        const users = loadUsers()
        const u = users[key]

        if (u) {
          users[key] = { ...u, dob, password: dob }
        } else {
          users[key] = { role, id, dob, password: dob }
        }

        saveUsers(users)
        return { ok: true }
      },
    }),
    [state.role, state.email, state.id],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
