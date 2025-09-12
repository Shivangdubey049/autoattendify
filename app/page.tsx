import { SiteHeader } from "@/components/site-header"
import { FeatureCard } from "@/components/feature-card"
import { SummaryStat } from "@/components/attendance-summary"
import { AttendanceTrendChart } from "@/components/attendance-trend-chart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { QrCode, Pencil, BarChart3, Users, CheckCircle2, CloudUpload, FileSpreadsheet, Camera } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <p className="text-sm font-medium text-green-600 tracking-wide uppercase">
              Start here: Login as Teacher (admin) or Student to continue.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/teacher-login">
                <Button size="sm" variant="outline">
                  Teacher Login
                </Button>
              </Link>
              <Link href="/student-login">
                <Button size="sm" variant="outline">
                  Student Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance">AutoAttendify</h1>
            <p className="text-xl text-gray-600 text-balance font-medium">Where Technology Meets Rural Classrooms.</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto text-pretty">
              Fast, reliable, and accessible attendance—designed for low-connectivity environments with three simple
              ways to mark presence: Face Recognition, QR Punch, or Manual Entry.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link href="/face-scan">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="mr-2 h-5 w-5" />
                Face Recognition
              </Button>
            </Link>
            <Link href="/punch">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <QrCode className="mr-2 h-5 w-5" />
                QR Punch
              </Button>
            </Link>
            <Link href="/manual">
              <Button size="lg" variant="outline">
                <Pencil className="mr-2 h-5 w-5" />
                Manual Entry
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Face Recognition"
            description="AI-powered instant attendance with facial scanning"
            href="/face-scan"
            icon={<Camera className="h-6 w-6" />}
            accent="blue"
          />
          <FeatureCard
            title="QR Code Punch"
            description="Quick scan attendance with student ID QR codes"
            href="/punch"
            icon={<QrCode className="h-6 w-6" />}
            accent="green"
          />
          <FeatureCard
            title="Manual Entry"
            description="Traditional roll-call with digital tracking"
            href="/manual"
            icon={<Pencil className="h-6 w-6" />}
            accent="sky"
          />

          <FeatureCard
            title="Reports & Analytics"
            description="Comprehensive attendance insights and trends"
            href="/reports"
            icon={<BarChart3 className="h-6 w-6" />}
            accent="green"
          />
          <FeatureCard
            title="Student Management"
            description="Add, edit, and organize student records"
            href="/students"
            icon={<Users className="h-6 w-6" />}
            accent="sky"
          />
          <FeatureCard
            title="Offline Support"
            description="Works without internet, syncs when connected"
            href="/offline"
            icon={<CheckCircle2 className="h-6 w-6" />}
            accent="green"
          />
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">1) Choose method</h3>
              <p className="text-gray-600">
                Face Recognition (fastest), QR Punch, or Manual—whichever fits your setup today.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
                <CloudUpload className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold">2) Sync when online</h3>
              <p className="text-gray-600">Works offline; your data syncs automatically when a connection returns.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FileSpreadsheet className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">3) Export reports</h3>
              <p className="text-gray-600">One-click CSV/Excel exports for audits, sharing, and records.</p>
            </div>
          </div>
        </section>

        {/* Why AutoAttendify */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why AutoAttendify</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">AI-powered face recognition for instant attendance</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Works reliably offline in low-connectivity areas</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Simple CSV/Excel exports for quick sharing</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Multiple modes: Face Recognition, QR Punch, or Manual entry</span>
            </div>
          </div>
        </section>

        {/* Weekly Snapshot */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Weekly Snapshot</h2>
            <p className="text-gray-600">Sample data—swap with your live metrics.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <SummaryStat label="Total Students" value="127" />
            <SummaryStat label="Present Today" value="118" sublabel="93%" />
            <SummaryStat label="This Week Avg" value="89%" accent="sky" />
            <SummaryStat label="Monthly Avg" value="91%" accent="green" />
          </div>
        </section>

        {/* Attendance Chart */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">This Week's Attendance</h2>
            <p className="text-gray-600">Sample data for demo—replace with your real dataset.</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <AttendanceTrendChart />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white/50 backdrop-blur-sm py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>AutoAttendify • Built for rural reliability • v0.1</p>
          <Link href="/contact" className="text-green-600 hover:underline mt-2 inline-block">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  )
}
