"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/_components/ui/button";
import { Card } from "@/_components/ui/card";
import {
  Mic,
  Upload,
  Square,
  Play,
  Pause,
  Trash2,
  Music,
  Sparkles,
} from "lucide-react";
import { cn } from "@/_components/lib/utils";
import { analyzeAudio } from "@/_lib/gemini/analyze";



export default function PianoRecordingPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [base64AudioFile, setBase64AudioFile] = useState(null);
  const [songTitle, setSongTitle] = useState(""); // change back later vv
  const [analysis, setAnalysis] = useState(`This is a performance of Chopin's Minute Waltz (Waltz in D-flat major, Op. 64, No. 1). Here's an analysis of your playing: ### Strengths: * **Consistent Rhythmic Drive:** You maintain a good underlying pulse throughout the piece, giving it a solid rhythmic foundation, particularly evident in the faster passages (e.g., **0:08-0:14** and **0:53-0:58**). * **Good Finger Dexterity and Clarity:** Your notes are generally well-articulated and clear, even in rapid runs, which prevents the sound from becoming muddy (e.g., **0:22-0:25** and **0:38-0:41**). * **Emerging Musicality:** There's an evident attempt to shape phrases and connect musical ideas, showing potential for more expressive interpretation. The transition around **1:00-1:05** shows a thoughtful approach to the changing character. ### Areas for Improvement: * **Limited Dynamic Range:** The performance largely remains at a mezzo-forte to forte level. Exploring a wider range of dynamics (from soft *piano* to loud *fortissimo*) would add significant emotional depth and contrast, especially at the opening (**0:08**) and in repeated sections (**0:53-0:58**). * **Lack of Consistent Legato and Lyrical Phrasing:** While articulation is good, the melodic lines sometimes feel less connected or "singing." Focus on creating smoother, longer legato phrases, particularly in the lyrical sections (e.g., **0:15-0:20**) and ensuring a more fluid transition between sections (e.g., **0:25-0:28**). * **Occasional Tempo Instability and Rhythmic Stiffness:** While the overall tempo is good, there are moments where it slightly rushes (e.g., **0:20-0:21** and **0:37-0:38**). Work on maintaining a more relaxed and consistent tempo, allowing the waltz character to breathe and flow naturally rather than feeling rushed. ### Resources for an Ideal Performance: To hear what an ideal performance of Chopin's Minute Waltz sounds like, focusing on nuanced dynamics, fluid phrasing, and a graceful waltz tempo, I recommend listening to recordings by: * **Arthur Rubinstein:** Known for his elegant and refined Chopin interpretations. Listen to his performance for the subtle dynamic shifts and beautiful legato phrasing. * [Arthur Rubinstein - Chopin: Waltz in D-flat major, Op. 64 No. 1 "Minute"](https://www.youtube.com/watch?v=F3S0w2tq04E) (Pay close attention to the dynamic swells and decays from **0:00-0:15** and the singing quality of the melody at **0:20-0:30**). * **Martha Argerich:** Offers a more fiery and virtuosic, yet still deeply musical, interpretation, showcasing impressive dynamic contrast and rhythmic vitality. * [Martha Argerich - Chopin: Waltz in D-flat major, Op. 64 No. 1 "Minute"](https://www.youtube.com/watch?v=gT-x00WJ0dM) (Notice her dynamic control throughout, especially the clear but not overly loud opening, and the incredible energy and rhythmic precision from **0:40 onwards**).`);
  const [analysisDone, setAnalysisDone] = useState(false); //change back later
  const [showModal, setShowModal] = useState(false); 
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach((track) => track.stop());

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setBase64AudioFile(reader.result);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file);
      const audioUrl = URL.createObjectURL(file);
      setRecordedAudio(audioUrl);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const clearRecording = () => {
    setRecordedAudio(null);
    setUploadedFile(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (analysisDone) {
      setShowModal(true);
    }
  }, [analysisDone]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
            <p className="text-gray-600 text-lg">
              Record your performance or upload an audio file
            </p>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg animate-pulse">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-red-700 font-semibold text-lg">
                  Recording in progress...
                </span>
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
                    <p className="font-medium text-gray-900">
                      {uploadedFile ? uploadedFile.name : "Your Recording"}
                    </p>
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
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
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
              <audio
                ref={audioRef}
                src={recordedAudio}
                onEnded={handleAudioEnded}
                className="hidden"
              />
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
                  isRecording && "bg-red-100 hover:bg-red-200 animate-pulse"
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
            <p className="text-gray-600 font-medium">
              Tap the microphone to start recording
            </p>
            <p className="text-gray-500">
              Or tap the upload icon to select an audio file
            </p>
          </div>

          {/* Action Buttons */}
          {(recordedAudio || uploadedFile) && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transform transition-all duration-200 hover:scale-105"
                onClick={async () => {
                  const result = await analyzeAudio(
                    "piano",
                    songTitle,
                    base64AudioFile.split(",")[1]
                  ).then((res) => {
                    setAnalysisDone(true);
                    return res;
                  });
                  setAnalysis(result);
                }}
              >
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

          {/* Song Title Input */}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 bg-gray-100 bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm text-center space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Analysis Complete</h2>
              <p className="text-gray-600">Your performance has been analyzed.</p>
              <Link
                href={{
                  pathname: "/analysis",
                  query: { data: analysis },
                }}
                className="inline-block w-full"
              >
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                >
                  See Analysis
                </Button>
              </Link>
            </div>
          </div>
        )}
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
  );
}
