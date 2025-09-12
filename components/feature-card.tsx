import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { ReactNode } from "react"

export function FeatureCard({
  title,
  description,
  href,
  icon,
  accent = "green",
}: {
  title: string
  description: string
  href: string
  icon: ReactNode
  accent?: "green" | "sky"
}) {
  const accentRing =
    accent === "green" ? "ring-green-600 bg-green-600/10 text-green-700" : "ring-sky-600 bg-sky-600/10 text-sky-700"

  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="space-y-4">
          <div className={`w-12 h-12 rounded-lg ring-1 ${accentRing} flex items-center justify-center`}>{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
