"use client"

import Link from "next/link"
import { Card, CardContent } from "_components/ui/card"
import { Button } from "_components/ui/button"
import { Music, Sparkles } from "lucide-react"

const instruments = [
  {
    id: "piano",
    name: "Piano",
    icon: "🎹",
    description: "Classic keyboard instrument",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-600 hover:to-cyan-600",
    glowColor: "shadow-blue-500/50",
  },
  {
    id: "guitar",
    name: "Guitar",
    icon: "🎸",
    description: "String instrument favorite",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    hoverColor: "hover:from-green-600 hover:to-emerald-600",
    glowColor: "shadow-green-500/50",
  },
  {
    id: "cello",
    name: "Cello",
    icon: "🎼",
    description: "Deep string resonance",
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
    hoverColor: "hover:from-pink-600 hover:to-rose-600",
    glowColor: "shadow-pink-500/50",
  },
  {
    id: "violin",
    name: "Violin",
    icon: "🎻",
    description: "Elegant string instrument",
    color: "bg-gradient-to-r from-purple-500 to-violet-500",
    hoverColor: "hover:from-purple-600 hover:to-violet-600",
    glowColor: "shadow-purple-500/50",
  },
  {
    id: "viola",
    name: "Viola",
    icon: "🎶",
    description: "Rich alto voice",
    color: "bg-gradient-to-r from-indigo-500 to-blue-500",
    hoverColor: "hover:from-indigo-600 hover:to-blue-600",
    glowColor: "shadow-indigo-500/50",
  },
  {
    id: "flute",
    name: "Flute",
    icon: "🎵",
    description: "Woodwind beauty",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    hoverColor: "hover:from-yellow-600 hover:to-orange-600",
    glowColor: "shadow-yellow-500/50",
  },
  {
    id: "trumpet",
    name: "Trumpet",
    icon: "🎺",
    description: "Brass section leader",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    hoverColor: "hover:from-orange-600 hover:to-red-600",
    glowColor: "shadow-orange-500/50",
  },
  {
    id: "trombone",
    name: "Trombone",
    icon: "🎺",
    description: "Slide-driven brass",
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    hoverColor: "hover:from-red-600 hover:to-pink-600",
    glowColor: "shadow-red-500/50",
  },
]

export default function InstrumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-bounce"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 left-1/3 w-60 h-60 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-40 right-1/4 w-70 h-70 bg-gradient-to-r from-violet-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-pulse animation-delay-3000"></div>
        <div className="absolute top-1/2 right-10 w-50 h-50 bg-gradient-to-r from-rose-300 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce animation-delay-4000"></div>
        <div className="absolute top-1/3 left-10 w-40 h-40 bg-gradient-to-r from-teal-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-5000"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-gradient-to-r from-lime-300 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-bounce animation-delay-6000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Choose Your
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              {" "}
              Instrument
            </span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
            Discover the joy of music with our collection of virtual instruments. Click on any instrument to start
            playing!
          </p>
        </div>

        {/* Instruments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {instruments.map((ins) => {
            return (
              <Card
                key={ins.id}
                className="group bg-white/20 border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-110 hover:shadow-2xl backdrop-blur-lg hover:shadow-purple-500/25 transform hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Card Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full ${ins.color} ${ins.hoverColor} flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl ${ins.glowColor} relative z-10`}
                  >
                    <div className="text-4xl animate-bounce group-hover:animate-pulse">{ins.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300 relative z-10 drop-shadow-lg">
                    {ins.name}
                  </h3>

                  <p className="text-white/80 text-sm mb-4 group-hover:text-white transition-colors duration-300 relative z-10">
                    {ins.description}
                  </p>

                  <Link href={`/instruments/${ins.id}`}>
                    <Button
                      size="sm"
                      className={`w-full ${ins.color} ${ins.hoverColor} text-white border-0 transition-all duration-500 group-hover:shadow-2xl ${ins.glowColor} font-semibold relative z-10 hover:scale-105`}
                    >
                      ✨ Play {ins.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-white bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
            <Music className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="font-medium">Start your musical journey today</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  )
}
