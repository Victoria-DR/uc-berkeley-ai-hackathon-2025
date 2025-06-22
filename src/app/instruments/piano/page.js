"use client"

// import type React from "react"

import { useState, useRef } from "react"
import { Button } from "_components/ui/button"
import { Card } from "_components/ui/card"
import { Mic, Upload, Square, Play, Pause, Trash2, Music, Sparkles, ArrowLeft, MessageCircle } from "lucide-react"
import { cn } from "_lib/utils"

export default function PianoRecordingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  const [showMusicTypeChat, setShowMusicTypeChat] = useState(false)
  const [musicType, setMusicType] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white shadow-md"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-sky-50 to-purple-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-100 via-transparent to-blue-100 opacity-60"></div>

        {/* Large animated blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-bl from-indigo-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-tr from-rose-300 to-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-6000"></div>

        {/* Medium floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full filter blur-xl opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full filter blur-lg opacity-40 animate-float-slow animation-delay-3000"></div>

        {/* Sparkle particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-twinkle"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-80 animate-twinkle animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/5 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-twinkle animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full opacity-60 animate-twinkle animation-delay-3000"></div>
        <div className="absolute bottom-1/2 right-1/5 w-2 h-2 bg-indigo-200 rounded-full opacity-50 animate-twinkle animation-delay-4000"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none">
        <Music className="absolute top-20 left-20 w-6 h-6 text-purple-300 animate-float" />
        <Music className="absolute top-40 right-32 w-4 h-4 text-blue-300 animate-float animation-delay-1000" />
        <Music className="absolute bottom-40 left-32 w-5 h-5 text-pink-300 animate-float animation-delay-2000" />
        <Sparkles className="absolute top-60 right-20 w-5 h-5 text-indigo-300 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg mb-4">
              <div className="text-3xl">🎹</div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Piano Practice
            </h1>
            <p className="text-gray-600 text-lg">Record your performance or upload an audio file</p>
          </div>

          {/* Practicing Display */}
          {musicType && (
            <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-center space-x-2">
                <Music className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-semibold text-orange-600">Practicing: {musicType}</span>
              </div>
            </Card>
          )}

          {/* Music Type Chat */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white shadow-md"
              onClick={() => {
                console.log("Button clicked, current state:", showMusicTypeChat)
                setShowMusicTypeChat(!showMusicTypeChat)
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {musicType ? "Music Type" : "Set Music Type"}
            </Button>
          </div>

          {/* Music Type Input */}
          {showMusicTypeChat && (
            <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">What type of music are you playing?</label>
                <input
                  type="text"
                  value={musicType}
                  onChange={(e) => setMusicType(e.target.value)}
                  placeholder="e.g., Classical, Jazz, Pop, Blues..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => setShowMusicTypeChat(false)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMusicType("")
                      setShowMusicTypeChat(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
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
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isAnalyzing}
                onClick={async () => {
                  setIsAnalyzing(true)
                  try {
                    // Your analyze code here - replace this with your actual analysis logic
                    await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulated delay
                    console.log("Analysis complete!")
                  } catch (error) {
                    console.error("Analysis failed:", error)
                  } finally {
                    setIsAnalyzing(false)
                  }
                }}
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
          0%, 100% {
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
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-15px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-20px) translateX(15px);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  )
}