"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CameraOff, CheckCircle2, AlertCircle, Users } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

export default function FaceScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScanResult, setLastScanResult] = useState<{
    name: string
    id: string
    status: "success" | "error"
    message: string
  } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
        }
        streamRef.current = stream
      }
      setIsScanning(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setLastScanResult({
        name: "",
        id: "",
        status: "error",
        message: "Unable to access camera. Please check permissions.",
      })
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }, [])

  const simulateFaceRecognition = useCallback(() => {
    // Simulate face recognition result
    const mockStudents = [
      { name: "Rahul Sharma", id: "STU001" },
      { name: "Priya Patel", id: "STU002" },
      { name: "Amit Kumar", id: "STU003" },
      { name: "Sneha Singh", id: "STU004" },
    ]

    const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)]
    const isSuccess = Math.random() > 0.2 // 80% success rate

    setLastScanResult({
      name: randomStudent.name,
      id: randomStudent.id,
      status: isSuccess ? "success" : "error",
      message: isSuccess
        ? `Attendance marked successfully for ${randomStudent.name}`
        : "Face not recognized. Please try again or use manual entry.",
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Face Recognition Attendance</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The fastest way to mark attendance. Simply look at the camera and let AI do the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Camera Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera Feed
                </CardTitle>
                <CardDescription>Position your face in the camera view for recognition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {isScanning ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      key="camera-feed"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-2">
                        <CameraOff className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-500">Camera not active</p>
                      </div>
                    </div>
                  )}

                  {isScanning && (
                    <div className="absolute inset-4 border-2 border-blue-500 rounded-lg pointer-events-none">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {!isScanning ? (
                    <Button onClick={startCamera} className="flex-1">
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                  ) : (
                    <>
                      <Button onClick={simulateFaceRecognition} className="flex-1">
                        Scan Face
                      </Button>
                      <Button onClick={stopCamera} variant="outline">
                        <CameraOff className="mr-2 h-4 w-4" />
                        Stop
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recognition Results
                </CardTitle>
                <CardDescription>Latest face recognition attempt</CardDescription>
              </CardHeader>
              <CardContent>
                {lastScanResult ? (
                  <div
                    className={`p-4 rounded-lg border ${
                      lastScanResult.status === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {lastScanResult.status === "success" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        {lastScanResult.name && (
                          <p className="font-medium text-gray-900">
                            {lastScanResult.name} ({lastScanResult.id})
                          </p>
                        )}
                        <p
                          className={`text-sm ${
                            lastScanResult.status === "success" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {lastScanResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No scans yet. Start the camera to begin.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use Face Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-medium">Start Camera</h3>
                  <p className="text-sm text-gray-600">Click "Start Camera" and allow camera access</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-medium">Position Face</h3>
                  <p className="text-sm text-gray-600">Look directly at the camera within the frame</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-medium">Scan Face</h3>
                  <p className="text-sm text-gray-600">Click "Scan Face" for instant recognition</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
