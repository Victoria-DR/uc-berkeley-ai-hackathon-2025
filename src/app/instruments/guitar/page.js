"use client"

import { useState, useRef } from "react"
import { Button } from "@/_components/ui/button";
import { Card } from "@/_components/ui/card";
import { Mic, Upload, Square, Play, Pause, Trash2, Music, Sparkles } from "lucide-react"
import { cn } from "@/_lib/utils"

export default function GuitarRecordingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioRef = useRef(null)

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none">
        <Music className="absolute top-20 left-20 w-6 h-6 text-orange-300 animate-float" />
        <Music className="absolute top-40 right-32 w-4 h-4 text-amber-300 animate-float animation-delay-1000" />
        <Music className="absolute bottom-40 left-32 w-5 h-5 text-yellow-300 animate-float animation-delay-2000" />
        <Sparkles className="absolute top-60 right-20 w-5 h-5 text-orange-400 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg mb-4">
              <div className="text-3xl">🎸</div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Guitar Practice
            </h1>
            <p className="text-gray-600 text-lg">Record your performance or upload an audio file</p>
          </div>

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
                    <p className="text-sm text-gray-500">Ready to analyze</p>
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
              <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg transform transition-all duration-200 hover:scale-105">
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Performance
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
