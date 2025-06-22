"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { Button } from "_components/ui/button"
import { Card } from "_components/ui/card"
import {
  Mic,
  Upload,
  Square,
  Play,
  Pause,
  Trash2,
  Music,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  X
} from "lucide-react"
import { cn } from "_lib/utils"
import { analyzeAudio } from "_lib/gemini/analyze"

export default function FluteRecordingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioRef = useRef(null)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [musicType, setMusicType] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState("")
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)

  // Helper function to convert blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1] // Remove data:audio/wav;base64, prefix
        resolve(base64String)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setRecordedBlob(blob) // Store the blob for analysis
        const audioUrl = URL.createObjectURL(blob)
        setRecordedAudio(audioUrl)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file)
      setRecordedBlob(file) // Store the file for analysis
      const audioUrl = URL.createObjectURL(file)
      setRecordedAudio(audioUrl)
    }
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const clearRecording = () => {
    setRecordedAudio(null)
    setUploadedFile(null)
    setRecordedBlob(null)
    setIsPlaying(false)
    setAnalysisResult("")
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (musicType.trim()) {
      console.log("Music title selected:", musicType)
      setShowChatModal(false)
      // Add your logic here to handle the music type selection
    }
  }

  const handleAnalyzePerformance = async () => {
    if (!recordedBlob) {
      alert("No audio file to analyze")
      return
    }

    setIsAnalyzing(true)
    try {
      // Convert audio blob to base64
      const base64Audio = await blobToBase64(recordedBlob)

      // Call the analyze function
      const result = await analyzeAudio("Flute", musicType || "Unknown Piece", base64Audio)

      setAnalysisResult(result)
      setShowAnalysisModal(true)
    } catch (error) {
      console.error("Analysis failed:", error)
      alert("Analysis failed. Please try again later.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 relative overflow-hidden">
      {/* Header with navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-md border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none">
        <Music className="absolute top-20 left-20 w-6 h-6 text-yellow-300 animate-float" />
        <Music className="absolute top-40 right-32 w-4 h-4 text-amber-300 animate-float animation-delay-1000" />
        <Music className="absolute bottom-40 left-32 w-5 h-5 text-orange-300 animate-float animation-delay-2000" />
        <Sparkles className="absolute top-60 right-20 w-5 h-5 text-yellow-400 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-lg mb-4">
              <div className="text-3xl">🎵</div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Flute Practice
            </h1>
            <p className="text-gray-600 text-lg">Record your performance or upload an audio file</p>
          </div>

          {/* Selected Music Type */}
          {musicType && (
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-md">
              <div className="flex items-center justify-center space-x-2">
                <Music className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">Practicing: {musicType}</span>
              </div>
            </Card>
          )}

          {/* Recording Status */}
          {isRecording && (
            <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg animate-pulse">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-red-700 font-semibold text-lg">Recording in progress...</span>
              </div>
            </Card>
          )}

          {/* Audio Playback */}
          {recordedAudio && (
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-amber-500 rounded-full flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile ? uploadedFile.name : "Your Recording"}</p>
                    <p className="text-sm text-gray-500">
                      {musicType ? `${musicType} • Ready to analyze` : "Ready to analyze"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePlayback}
                    className="bg-white/50 hover:bg-white border-gray-200 shadow-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearRecording}
                    className="bg-white/50 hover:bg-red-50 hover:border-red-200 border-gray-200 shadow-sm"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <audio ref={audioRef} src={recordedAudio} onEnded={handleAudioEnded} className="hidden" />
            </Card>
          )}

          {/* Music Type Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChatModal(true)}
              className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-md border border-white/20"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Music Title
            </Button>
          </div>

          {/* Main Control */}
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-2xl p-3 flex items-center space-x-2 border border-white/20">
              {/* Record Button */}
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "rounded-full w-20 h-20 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105",
                  isRecording && "bg-red-100 hover:bg-red-200 animate-pulse",
                )}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-red-600 fill-current" />
                ) : (
                  <Mic className="w-8 h-8 text-gray-700" />
                )}
              </Button>

              {/* Divider */}
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

              {/* Upload Button */}
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full w-20 h-20 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-gray-700" />
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-3">
            <p className="text-gray-600 font-medium">Tap the microphone to start recording</p>
            <p className="text-gray-500">Or tap the upload icon to select an audio file</p>
          </div>

          {/* Action Buttons */}
          {(recordedAudio || uploadedFile) && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isAnalyzing}
                onClick={handleAnalyzePerformance}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Performance
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white shadow-md"
                size="lg"
              >
                Save Recording
              </Button>
            </div>
          )}

          {/* Hidden File Input */}
          <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Music Title</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <form onSubmit={handleChatSubmit} className="space-y-4">
                <div>
                  <label htmlFor="musicType" className="block text-sm font-medium text-gray-700 mb-2">
                    What piece are you practicing?
                  </label>
                  <input
                    id="musicType"
                    type="text"
                    value={musicType}
                    onChange={(e) => setMusicType(e.target.value)}
                    placeholder="e.g., Mozart Concerto K.313, Bach Partita, Debussy Syrinx..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setShowChatModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                  >
                    Set Title
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Analysis Results Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] bg-white shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Flute Performance Analysis</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnalysisModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{analysisResult}</div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button
                onClick={() => setShowAnalysisModal(false)}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
