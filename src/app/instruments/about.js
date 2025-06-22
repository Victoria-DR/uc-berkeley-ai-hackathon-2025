"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Mail, MapPin, GraduationCap, Briefcase, Trophy, Users } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const teamMembers = [
    {
      name: "Aakash Goyal",
      role: "Rising Junior & ASU Intern",
      university: "Arizona State University",
      description:
        "Pretty chill guy studying at ASU, currently doing an internship at ASU this summer. Always bringing positive vibes to the team!",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      skills: ["Software Development", "Research", "Team Leadership"],
      status: "Rising Junior",
      location: "Arizona State University",
    },
    {
      name: "Janet Meng",
      role: "SWE Intern @ Google",
      university: "Duke University",
      description:
        "CS & Statistics double major at Duke University, currently crushing it as a Software Engineering Intern at Google.",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "from-blue-500 via-teal-500 to-green-500",
      skills: ["Software Engineering", "Statistics", "Data Analysis"],
      status: "Google Intern",
      location: "Duke University",
    },
    {
      name: "Sujal Prajapati",
      role: "Research Assistant & PI Intern",
      university: "Arizona State University",
      description:
        "CS major at ASU with hands-on experience as a Research Assistant at FURI and PI Intern at ASU. Passionate about research and innovation.",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "from-orange-500 via-yellow-500 to-lime-500",
      skills: ["Computer Science", "Research", "Project Management"],
      status: "FURI Research Assistant",
      location: "Arizona State University",
    },
    {
      name: "Victoria Da Rosa",
      role: "SWE Intern @ Google",
      university: "University of Waterloo",
      description:
        "Computer Engineering student at UWaterloo, Software Engineering Intern at Google, and an impressive 10x Hackathon Winner! 🏆",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      skills: ["Computer Engineering", "Hackathons", "Software Engineering"],
      status: "10x Hackathon Winner",
      location: "University of Waterloo",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white/90">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Meet Our Amazing Team</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're a diverse team of passionate students and interns from top universities, bringing together expertise
              in software engineering, research, and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                <GraduationCap className="w-4 h-4 mr-2" />4 Universities
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                <Briefcase className="w-4 h-4 mr-2" />
                Google Interns
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-400/30">
                <Trophy className="w-4 h-4 mr-2" />
                Research Leaders
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                    />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <div
                        className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${member.gradient} text-white text-sm font-medium`}
                      >
                        {member.role}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-white/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{member.university}</span>
                    </div>

                    <p className="text-white/80 leading-relaxed max-w-sm">{member.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="bg-white/5 text-white/80 border-white/20 hover:bg-white/10 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Status Badge */}
                    <div className="pt-2">
                      <Badge className={`bg-gradient-to-r ${member.gradient} text-white border-0`}>
                        <Briefcase className="w-3 h-3 mr-1" />
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We're always excited to work on new projects and connect with fellow innovators. Let's build something
              amazing together!
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 px-8 py-3">
              <Github className="w-4 h-4 mr-2" />
              View Our Work
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </div>
  )
}
