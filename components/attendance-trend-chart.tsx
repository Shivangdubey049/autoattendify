"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const sampleData = [
  { day: "Mon", present: 86 },
  { day: "Tue", present: 91 },
  { day: "Wed", present: 88 },
  { day: "Thu", present: 93 },
  { day: "Fri", present: 89 },
  { day: "Sat", present: 80 },
]

export function AttendanceTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="present" stroke="#15803d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
