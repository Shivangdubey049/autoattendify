import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SummaryStat({
  label,
  value,
  sublabel,
}: {
  label: string
  value: string
  sublabel?: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {sublabel ? <p className="text-xs text-gray-500">{sublabel}</p> : null}
      </CardContent>
    </Card>
  )
}
