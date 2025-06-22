// app/instruments/page.jsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "_components/ui/card"
import { Button } from "_components/ui/button"
import {
  Piano,
  Guitar,
  Drum,
  Music,
  Mic,
  Volume2,
  Radio,
  Headphones,
} from "lucide-react"

const instruments = [
  {
    id: "piano",
    name: "Piano",
    icon: Piano,
    description: "Classic keyboard instrument",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: "guitar",
    name: "Guitar",
    icon: Guitar,
    description: "String instrument favorite",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: "drums",
    name: "Drums",
    icon: Drum,
    description: "Percussion powerhouse",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
  {
    id: "violin",
    name: "Violin",
    icon: Music,
    description: "Elegant string instrument",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
  },
  {
    id: "flute",
    name: "Flute",
    icon: Mic,
    description: "Woodwind beauty",
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
  },
  {
    id: "saxophone",
    name: "Saxophone",
    icon: Volume2,
    description: "Jazz classic",
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
  },
  {
    id: "trumpet",
    name: "Trumpet",
    icon: Radio,
    description: "Brass section leader",
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
  },
  {
    id: "cello",
    name: "Cello",
    icon: Headphones,
    description: "Deep string resonance",
    color: "bg-pink-500",
    hoverColor: "hover:bg-pink-600",
  },
]

export default function InstrumentsPage() {
  const [selected, setSelected] = useState(null)

  const handleClick = (name) => {
    setSelected(name)
    alert(`Opening ${name}…`)
    // if you want to navigate instead of alert:
    // import { useRouter } from "next/navigation"
    // const router = useRouter()
    // router.push(`/instruments/${name.toLowerCase()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Instrument
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the joy of music with our collection of virtual instruments.
            Click on any instrument to start playing!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {instruments.map((ins) => {
            const Icon = ins.icon
            return (
              <Card
                key={ins.id}
                className="group bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full ${ins.color} ${ins.hoverColor} flex items-center justify-center transition-colors duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {ins.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{ins.description}</p>
                  <Button
                    size="sm"
                    className={`w-full ${ins.color} ${ins.hoverColor} text-white border-0 transition-all duration-300 group-hover:shadow-lg`}
                    onClick={() => handleClick(ins.name)}
                  >
                    Play {ins.name}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-slate-400">
            <Music className="w-5 h-5" />
            <span>Start your musical journey today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
