"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "_components/ui/button";
import { Music, Play, Sparkles, MessageCircle, X, Star } from "lucide-react";

export default function MusicTutorLanding() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const themes = [
    {
      name: "Pink Sunset",
      gradient: "from-pink-400 via-rose-400 to-orange-400",
      shadow: "shadow-pink-400/50",
      glow: "shadow-pink-500/30",
    },
    {
      name: "Purple Ocean",
      gradient: "from-purple-400 via-violet-400 to-blue-400",
      shadow: "shadow-purple-400/50",
      glow: "shadow-purple-500/30",
    },
    {
      name: "Emerald Forest",
      gradient: "from-green-400 via-emerald-400 to-teal-400",
      shadow: "shadow-green-400/50",
      glow: "shadow-green-500/30",
    },
    {
      name: "Ruby Fire",
      gradient: "from-red-400 via-pink-400 to-rose-400",
      shadow: "shadow-red-400/50",
      glow: "shadow-red-500/30",
    },
  ];

  // Track mouse movement for cursor light effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleThemeChange = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
  };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentThemeData = themes[currentTheme];

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"
          : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50"
      }`}
    >
      {/* Cursor Light Effect */}
      <div
        className="fixed pointer-events-none z-30 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: "200px",
          height: "200px",
          background: `radial-gradient(circle, ${
            isDarkMode
              ? "rgba(147, 51, 234, 0.15), rgba(219, 39, 119, 0.1), transparent 70%"
              : "rgba(147, 51, 234, 0.08), rgba(219, 39, 119, 0.05), transparent 70%"
          })`,
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Enhanced Moving Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Shiny Floating Circles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-70 animate-bounce shadow-lg shadow-pink-300/50"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full opacity-60 animate-pulse shadow-lg shadow-purple-300/50"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-70 animate-ping shadow-lg shadow-blue-300/50"></div>
        <div className="absolute top-60 left-1/4 w-3 h-3 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full opacity-80 animate-bounce shadow-lg shadow-yellow-300/50"></div>
        <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-70 animate-pulse shadow-lg shadow-green-300/50"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-full opacity-60 animate-ping shadow-lg shadow-indigo-300/50"></div>

        {/* Glowing Geometric Shapes */}
        <div className="absolute top-32 left-1/3 w-8 h-8 border-2 border-pink-200 rounded-full opacity-40 animate-spin shadow-lg shadow-pink-200/30"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-12 border-2 border-purple-200 rounded-full opacity-30 animate-pulse shadow-lg shadow-purple-200/30"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 border-2 border-blue-300 opacity-50 animate-bounce transform rotate-45 shadow-lg shadow-blue-300/30"></div>

        {/* More Shiny Particles */}
        <div className="absolute top-16 left-1/2 w-2 h-2 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 animate-ping shadow-md shadow-pink-400/40"></div>
        <div className="absolute bottom-20 left-1/2 w-3 h-3 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full opacity-70 animate-bounce shadow-md shadow-purple-400/40"></div>
        <div className="absolute top-3/4 left-16 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60 animate-pulse shadow-md shadow-blue-400/40"></div>

        {/* Glowing Musical Notes */}
        <div className="absolute top-24 right-1/4 text-pink-400 opacity-50 text-xl animate-bounce drop-shadow-lg">
          ♪
        </div>
        <div className="absolute bottom-24 left-1/3 text-purple-400 opacity-40 text-2xl animate-pulse drop-shadow-lg">
          ♫
        </div>
        <div className="absolute top-2/3 right-20 text-blue-400 opacity-60 text-lg animate-ping drop-shadow-lg">
          ♬
        </div>
        <div className="absolute top-1/3 left-1/4 text-pink-400 opacity-45 text-lg animate-bounce drop-shadow-lg">
          ♩
        </div>
      </div>

      {/* Enhanced Left Sidebar */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20">
        <div
          className={`backdrop-blur-xl rounded-r-3xl p-6 space-y-8 border-r-2 shadow-2xl transition-all duration-500 ${
            isDarkMode
              ? "bg-gray-800/90 border-purple-500/30 shadow-purple-500/20"
              : "bg-white/90 border-white/40 shadow-white/30"
          }`}
        >
          <div className="text-center">
            <div
              className={`text-sm font-bold mb-3 tracking-wider ${
                isDarkMode ? "text-pink-300" : "text-purple-600"
              }`}
            >
              THEME
            </div>
            <button
              onClick={handleThemeChange}
              className={`w-12 h-12 bg-gradient-to-br ${currentThemeData.gradient} rounded-2xl flex items-center justify-center hover:scale-125 transition-all duration-300 ${currentThemeData.shadow} hover:shadow-xl border-2 border-white/30`}
            >
              <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div
                  className={`w-4 h-4 bg-gradient-to-br ${currentThemeData.gradient} rounded-full animate-pulse`}
                ></div>
              </div>
            </button>
            <div className="text-xs mt-2 font-medium opacity-70">
              {currentThemeData.name}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <Sparkles
              className={`w-7 h-7 ${
                isDarkMode ? "text-purple-300" : "text-purple-500"
              } drop-shadow-lg animate-pulse`}
            />
            <button
              onClick={handleModeToggle}
              className={`w-8 h-8 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg border-2 border-white/30 ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-600 shadow-gray-500/30"
                  : "bg-gradient-to-br from-purple-100 to-purple-200 shadow-purple-300/30"
              }`}
            >
              <div
                className={`w-4 h-4 rounded ${
                  isDarkMode ? "bg-purple-300" : "bg-purple-500"
                } animate-pulse`}
              ></div>
            </button>
          </div>

          <div className="text-center">
            <div
              className={`text-sm font-bold tracking-wider ${
                isDarkMode ? "text-purple-300" : "text-purple-600"
              }`}
            >
              MODE
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-20 px-6 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 group">
            <div
              className={`w-14 h-14 bg-gradient-to-br ${currentThemeData.gradient} rounded-3xl flex items-center justify-center shadow-xl ${currentThemeData.shadow} group-hover:scale-110 transition-all duration-300 border-2 border-white/20`}
            >
              <Music className="w-7 h-7 text-white drop-shadow-lg" />
            </div>
            <span
              className={`text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              } drop-shadow-lg`}
            >
              Crescendo
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <span
              className={`font-semibold cursor-default hover:scale-105 transition-transform duration-200 ${
                isDarkMode ? "text-pink-300" : "text-purple-600"
              } drop-shadow-sm`}
            >
              Home
            </span>
            <span
              className={`cursor-default hover:scale-105 transition-transform duration-200 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } drop-shadow-sm`}
            >
              Features
            </span>
            <span
              className={`cursor-default hover:scale-105 transition-transform duration-200 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } drop-shadow-sm`}
            >
              Instruments
            </span>
            <span
              className={`cursor-default hover:scale-105 transition-transform duration-200 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } drop-shadow-sm`}
            >
              About
            </span>
          </div>

          <Link href="/instruments">
            <Button
              className={`bg-gradient-to-r ${currentThemeData.gradient} hover:scale-110 text-white px-8 py-3 rounded-2xl font-semibold shadow-xl ${currentThemeData.shadow} hover:shadow-2xl transition-all duration-300 border border-white/20`}
            >
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 px-6 pt-20 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Shiny Badge */}
          <div
            className={`inline-flex items-center space-x-3 backdrop-blur-xl rounded-full px-8 py-4 mb-16 border-2 shadow-2xl hover:scale-105 transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/90 border-purple-400/30 shadow-purple-500/30"
                : "bg-white/90 border-white/40 shadow-white/40"
            }`}
          >
            <Sparkles className="w-6 h-6 text-pink-500 animate-spin drop-shadow-lg" />
            <span
              className={`font-semibold text-lg ${
                isDarkMode ? "text-pink-300" : "text-purple-600"
              } drop-shadow-sm`}
            >
              AI-Powered Music Learning
            </span>
            <Star className="w-6 h-6 text-yellow-400 animate-pulse drop-shadow-lg" />
          </div>

          {/* Glowing Hero Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold mb-10 leading-tight">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl ${
                isDarkMode
                  ? "from-pink-300 via-purple-300 to-blue-300"
                  : "from-pink-500 via-purple-600 to-blue-600"
              }`}
              style={{
                filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))",
              }}
            >
              Master Your Music
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p
            className={`text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed drop-shadow-lg ${
              isDarkMode ? "text-purple-200" : "text-purple-600"
            }`}
          >
            AI-powered music tutor that helps you learn piano, guitar, and more
            <br />
            with personalized feedback and interactive lessons.
          </p>

          {/* Shiny CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-24">
            <Link href="/instruments">
              <Button
                className={`bg-gradient-to-r ${currentThemeData.gradient} hover:scale-110 text-white px-10 py-5 rounded-3xl font-semibold text-xl flex items-center space-x-3 shadow-2xl ${currentThemeData.shadow} hover:shadow-3xl transition-all duration-300 border border-white/20`}
              >
                <Play className="w-6 h-6 drop-shadow-lg" />
                <span>Start Learning</span>
                <span className="animate-bounce">→</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              className={`backdrop-blur-xl px-10 py-5 rounded-3xl font-semibold text-xl flex items-center space-x-3 hover:scale-110 transition-all duration-300 shadow-xl border-2 ${
                isDarkMode
                  ? "bg-gray-800/90 border-purple-400/50 text-purple-300 hover:bg-gray-700/90 shadow-purple-500/30"
                  : "bg-white/90 border-purple-300/50 text-purple-600 hover:bg-purple-50/90 shadow-purple-300/30"
              }`}
              onClick={() => alert("Watch Demo clicked!")}
            >
              <Play className="w-6 h-6 drop-shadow-lg" />
              <span>Watch Demo</span>
            </Button>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div
              className={`backdrop-blur-xl rounded-3xl p-10 border-2 hover:scale-105 transition-all duration-300 shadow-2xl ${
                isDarkMode
                  ? "bg-gray-800/90 border-gray-600/30 shadow-gray-500/20"
                  : "bg-white/90 border-white/40 shadow-white/30"
              }`}
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${currentThemeData.gradient} rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl ${currentThemeData.shadow} border-2 border-white/20`}
              >
                <Music className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <h3
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                } drop-shadow-sm`}
              >
                AI Analysis
              </h3>
              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } drop-shadow-sm`}
              >
                Get instant feedback on your performance
              </p>
            </div>

            <div
              className={`backdrop-blur-xl rounded-3xl p-10 border-2 hover:scale-105 transition-all duration-300 shadow-2xl ${
                isDarkMode
                  ? "bg-gray-800/90 border-gray-600/30 shadow-gray-500/20"
                  : "bg-white/90 border-white/40 shadow-white/30"
              }`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl shadow-purple-400/50 border-2 border-white/20">
                <Play className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <h3
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                } drop-shadow-sm`}
              >
                Interactive Lessons
              </h3>
              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } drop-shadow-sm`}
              >
                Learn with engaging, step-by-step lessons
              </p>
            </div>

            <div
              className={`backdrop-blur-xl rounded-3xl p-10 border-2 hover:scale-105 transition-all duration-300 shadow-2xl ${
                isDarkMode
                  ? "bg-gray-800/90 border-gray-600/30 shadow-gray-500/20"
                  : "bg-white/90 border-white/40 shadow-white/30"
              }`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl shadow-blue-400/50 border-2 border-white/20">
                <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <h3
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                } drop-shadow-sm`}
              >
                Progress Tracking
              </h3>
              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } drop-shadow-sm`}
              >
                Monitor your improvement with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Chatbox */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/chat">
          <Button
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-125 transition-all duration-300 border-2 border-white/20 animate-pulse"
          >
            <MessageCircle className="w-7 h-7 drop-shadow-lg" />
          </Button>
        </Link>
        {/* {!isChatOpen ? (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-125 transition-all duration-300 border-2 border-white/20 animate-pulse"
          >
            <MessageCircle className="w-7 h-7 drop-shadow-lg" />
          </Button>
        ) : (
          <div
            className={`rounded-3xl shadow-2xl w-80 h-96 border-2 backdrop-blur-xl transition-all duration-500 ${
              isDarkMode ? "bg-gray-800/95 border-gray-600/30 shadow-gray-500/30" : "bg-white/95 border-white/40 shadow-white/40"
            }`}
          >
            <div className={`flex items-center justify-between p-6 border-b-2 ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <MessageCircle className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"} drop-shadow-sm`}>Chat Support</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className={`rounded-full hover:scale-110 transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 h-64 overflow-y-auto">
              <div className={`rounded-2xl p-4 mb-4 shadow-lg ${
                isDarkMode ? "bg-gray-700/80" : "bg-gray-100/80"
              }`}>
                <p className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"} drop-shadow-sm`}>
                  Hello! How can I help you with your music learning journey today? 🎵
                </p>
              </div>
            </div>

            <div className={`p-6 border-t-2 ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-3 border-2 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-600/50 bg-gray-700/80 text-white placeholder-gray-400"
                      : "border-gray-300/50 bg-white/80 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl px-4 shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

