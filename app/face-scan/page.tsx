"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CameraOff, CheckCircle2, AlertCircle, Users, UserPlus, Database } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

interface FaceData {
  id: string
  name: string
  descriptors: Float32Array[]
  enrollmentDate: string
}

interface AttendanceRecord {
  id: string
  name: string
  timestamp: string
  confidence: number
  status: "present" | "late" | "absent"
}

export default function FaceScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [enrollmentMode, setEnrollmentMode] = useState(false)
  const [newPersonName, setNewPersonName] = useState("")
  const [lastScanResult, setLastScanResult] = useState<{
    name: string
    id: string
    status: "success" | "error"
    message: string
    confidence?: number
  } | null>(null)

  const [enrolledFaces, setEnrolledFaces] = useState<FaceData[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Simulate loading face-api.js models
        console.log("[v0] Loading face recognition models...")
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate loading time
        setIsModelLoaded(true)
        console.log("[v0] Face recognition models loaded successfully")

        // Load existing face data from localStorage
        const savedFaces = localStorage.getItem("enrolledFaces")
        if (savedFaces) {
          setEnrolledFaces(JSON.parse(savedFaces))
        }

        const savedAttendance = localStorage.getItem("attendanceRecords")
        if (savedAttendance) {
          setAttendanceRecords(JSON.parse(savedAttendance))
        }
      } catch (error) {
        console.error("[v0] Error loading models:", error)
      }
    }

    loadModels()
  }, [])

  const startCamera = useCallback(async () => {
    try {
      console.log("[v0] Requesting camera access...")

      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      console.log("[v0] Camera stream obtained successfully")

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error("Video element not available"))
            return
          }

          videoRef.current.onloadedmetadata = () => {
            console.log("[v0] Video metadata loaded")
            videoRef.current
              ?.play()
              .then(() => {
                console.log("[v0] Video playback started")
                resolve()
              })
              .catch(reject)
          }

          videoRef.current.onerror = (error) => {
            console.error("[v0] Video element error:", error)
            reject(new Error("Video playback failed"))
          }

          // Timeout after 10 seconds
          setTimeout(() => reject(new Error("Video loading timeout")), 10000)
        })

        streamRef.current = stream
        setIsScanning(true)
        console.log("[v0] Camera started successfully")
      }
    } catch (error) {
      console.error("[v0] Camera access error:", error)

      let errorMessage = "Unable to access camera. "

      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          errorMessage += "Camera permission denied. Please allow camera access and try again."
        } else if (error.name === "NotFoundError") {
          errorMessage += "No camera found. Please connect a camera and try again."
        } else if (error.name === "NotReadableError") {
          errorMessage += "Camera is already in use by another application."
        } else if (error.name === "OverconstrainedError") {
          errorMessage += "Camera doesn't support the required settings."
        } else {
          errorMessage += `Error: ${error.message}`
        }
      } else {
        errorMessage += "Please check camera permissions and try again."
      }

      setLastScanResult({
        name: "",
        id: "",
        status: "error",
        message: errorMessage,
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
    setEnrollmentMode(false)
  }, [])

  const performFaceRecognition = useCallback(async () => {
    if (!isModelLoaded || !videoRef.current || isProcessing) return

    setIsProcessing(true)

    try {
      // Simulate face detection and recognition
      console.log("[v0] Detecting faces...")
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate processing time

      if (enrollmentMode && newPersonName.trim()) {
        // Enrollment mode - add new face
        const newFace: FaceData = {
          id: `FACE_${Date.now()}`,
          name: newPersonName.trim(),
          descriptors: [new Float32Array([Math.random(), Math.random(), Math.random()])], // Simulated face descriptors
          enrollmentDate: new Date().toISOString(),
        }

        const updatedFaces = [...enrolledFaces, newFace]
        setEnrolledFaces(updatedFaces)
        localStorage.setItem("enrolledFaces", JSON.stringify(updatedFaces))

        setLastScanResult({
          name: newFace.name,
          id: newFace.id,
          status: "success",
          message: `Successfully enrolled ${newFace.name} in the system`,
        })

        setEnrollmentMode(false)
        setNewPersonName("")
      } else {
        // Recognition mode - identify existing faces
        if (enrolledFaces.length === 0) {
          setLastScanResult({
            name: "",
            id: "",
            status: "error",
            message: "No faces enrolled in the system. Please enroll faces first.",
          })
          return
        }

        // Simulate face matching
        const isRecognized = Math.random() > 0.3 // 70% recognition rate

        if (isRecognized) {
          const recognizedFace = enrolledFaces[Math.floor(Math.random() * enrolledFaces.length)]
          const confidence = 0.85 + Math.random() * 0.1 // 85-95% confidence

          // Check if already marked present today
          const today = new Date().toDateString()
          const alreadyPresent = attendanceRecords.some(
            (record) => record.name === recognizedFace.name && new Date(record.timestamp).toDateString() === today,
          )

          if (!alreadyPresent) {
            const attendanceRecord: AttendanceRecord = {
              id: `ATT_${Date.now()}`,
              name: recognizedFace.name,
              timestamp: new Date().toISOString(),
              confidence: confidence,
              status: "present",
            }

            const updatedAttendance = [...attendanceRecords, attendanceRecord]
            setAttendanceRecords(updatedAttendance)
            localStorage.setItem("attendanceRecords", JSON.stringify(updatedAttendance))

            setLastScanResult({
              name: recognizedFace.name,
              id: recognizedFace.id,
              status: "success",
              message: `Attendance marked for ${recognizedFace.name}`,
              confidence: Math.round(confidence * 100),
            })
          } else {
            setLastScanResult({
              name: recognizedFace.name,
              id: recognizedFace.id,
              status: "error",
              message: `${recognizedFace.name} already marked present today`,
              confidence: Math.round(confidence * 100),
            })
          }
        } else {
          setLastScanResult({
            name: "",
            id: "",
            status: "error",
            message: "Face not recognized. Please try again or enroll your face first.",
          })
        }
      }
    } catch (error) {
      console.error("[v0] Face recognition error:", error)
      setLastScanResult({
        name: "",
        id: "",
        status: "error",
        message: "Face recognition failed. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }, [isModelLoaded, enrollmentMode, newPersonName, enrolledFaces, attendanceRecords, isProcessing])

  const clearAllData = useCallback(() => {
    setEnrolledFaces([])
    setAttendanceRecords([])
    localStorage.removeItem("enrolledFaces")
    localStorage.removeItem("attendanceRecords")
    setLastScanResult({
      name: "",
      id: "",
      status: "success",
      message: "All face data and attendance records cleared",
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Advanced Face Recognition Attendance</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AI-powered attendance system with face enrollment and recognition capabilities.
            </p>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                isModelLoaded ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isModelLoaded ? "bg-green-500" : "bg-yellow-500"}`} />
              {isModelLoaded ? "AI Models Ready" : "Loading AI Models..."}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Camera Section */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  {enrollmentMode ? "Face Enrollment" : "Face Recognition"}
                </CardTitle>
                <CardDescription>
                  {enrollmentMode
                    ? "Position your face in the camera view to enroll in the system"
                    : "Position your face in the camera view for attendance marking"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={!enrollmentMode ? "default" : "outline"}
                    onClick={() => setEnrollmentMode(false)}
                    size="sm"
                  >
                    Recognition Mode
                  </Button>
                  <Button
                    variant={enrollmentMode ? "default" : "outline"}
                    onClick={() => setEnrollmentMode(true)}
                    size="sm"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Enrollment Mode
                  </Button>
                </div>

                {enrollmentMode && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Person Name</label>
                    <input
                      type="text"
                      value={newPersonName}
                      onChange={(e) => setNewPersonName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {isScanning ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                        key="camera-feed"
                        onError={(e) => {
                          console.error("[v0] Video element error:", e)
                          setLastScanResult({
                            name: "",
                            id: "",
                            status: "error",
                            message: "Video playback failed. Please try restarting the camera.",
                          })
                        }}
                        onLoadStart={() => console.log("[v0] Video load started")}
                        onCanPlay={() => console.log("[v0] Video can play")}
                      />
                      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-2">
                        <CameraOff className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-500">Camera not active</p>
                        <p className="text-xs text-gray-400">Click "Start Camera" and allow camera permissions</p>
                      </div>
                    </div>
                  )}

                  {isScanning && (
                    <div className="absolute inset-4 border-2 border-blue-500 rounded-lg pointer-events-none">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>

                      {isProcessing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                            <p>Processing...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {!isScanning ? (
                    <Button onClick={startCamera} className="flex-1" disabled={!isModelLoaded}>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={performFaceRecognition}
                        className="flex-1"
                        disabled={isProcessing || (enrollmentMode && !newPersonName.trim())}
                      >
                        {enrollmentMode ? "Enroll Face" : "Scan Face"}
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

            {/* Results and Stats Section */}
            <div className="space-y-6">
              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recognition Results
                  </CardTitle>
                  <CardDescription>Latest scan attempt</CardDescription>
                </CardHeader>
                <CardContent>
                  {lastScanResult ? (
                    <div
                      className={`p-4 rounded-lg border ${
                        lastScanResult.status === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
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
                          {lastScanResult.confidence && (
                            <p className="text-xs text-gray-600">Confidence: {lastScanResult.confidence}%</p>
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{enrolledFaces.length}</div>
                      <div className="text-sm text-blue-700">Enrolled Faces</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{attendanceRecords.length}</div>
                      <div className="text-sm text-green-700">Total Records</div>
                    </div>
                  </div>

                  {enrolledFaces.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Enrolled People:</h4>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {enrolledFaces.map((face) => (
                          <div key={face.id} className="text-xs p-2 bg-gray-50 rounded">
                            {face.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={clearAllData}
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700 bg-transparent"
                  >
                    Clear All Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
