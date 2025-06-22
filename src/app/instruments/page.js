"use client";

import { useState } from "react";
import { Button } from "_components/ui/button";
import { Music, Play, Sparkles, MessageCircle, X, Star } from "lucide-react";

export default function MusicTutorLanding() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themes = [
    { primary: "from-pink-400 to-orange-400", secondary: "from-pink-400 to-pink-500" },
    { primary: "from-purple-400 to-blue-400", secondary: "from-purple-400 to-purple-500" },
    { primary: "from-green-400 to-teal-400", secondary: "from-green-400 to-green-500" },
    { primary: "from-red-400 to-pink-400", secondary: "from-red-400 to-red-500" },
  ];

  const handleThemeChange = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
  };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"
          : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50"
      } relative overflow-hidden transition-all duration-500`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute animate-float-slow top-20 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-60" />
        <div className="absolute animate-float-medium top-40 right-20 w-6 h-6 bg-purple-300 rounded-full opacity-40" />
        <div className="absolute animate-float-fast bottom-40 left-20 w-8 h-8 bg-blue-300 rounded-full opacity-50" />
        <div className="absolute animate-bounce-slow top-60 left-1/4 w-3 h-3 bg-yellow-300 rounded-full opacity-70" />
        <div className="absolute animate-pulse-slow bottom-60 right-1/3 w-5 h-5 bg-green-300 rounded-full opacity-60" />
        <div className="absolute animate-float-medium top-1/3 right-10 w-4 h-4 bg-indigo-300 rounded-full opacity-50" />

        <div className="absolute animate-spin-slow top-32 left-1/3 w-8 h-8 border border-pink-200 rounded-full opacity-30" />
        <div className="absolute animate-pulse bottom-32 right-1/4 w-12 h-12 border border-purple-200 rounded-full opacity-20" />
        <div className="absolute animate-float-slow top-1/2 left-10 w-6 h-6 border-2 border-blue-300 rotate-45 opacity-40" />

        <div className="absolute animate-float-medium top-16 left-1/2 w-2 h-2 bg-pink-400 rounded-full opacity-50" />
        <div className="absolute animate-bounce-slow bottom-20 left-1/2 w-3 h-3 bg-purple-400 rounded-full opacity-60" />
        <div className="absolute animate-float-fast top-3/4 left-16 w-4 h-4 bg-blue-400 rounded-full opacity-45" />
        <div className="absolute animate-pulse-slow top-1/4 right-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-80" />
        <div className="absolute animate-float-slow bottom-1/3 right-16 w-5 h-5 bg-green-400 rounded-full opacity-55" />

        <div className="absolute animate-spin-slow top-1/2 right-1/4 w-6 h-6 border border-pink-300 rotate-45 opacity-35" />
        <div className="absolute animate-float-medium bottom-1/4 left-1/3 w-4 h-4 bg-purple-300 rotate-45 opacity-40" />
        <div className="absolute animate-bounce-slow top-1/6 right-1/6 w-3 h-3 border-2 border-blue-300 rounded opacity-50" />

        <div className="absolute animate-bounce top-24 right-1/4 text-pink-400 opacity-40 text-xl">♪</div>
        <div className="absolute animate-float-medium bottom-24 left-1/3 text-purple-400 opacity-30 text-2xl">♫</div>
        <div className="absolute animate-pulse-slow top-2/3 right-20 text-blue-400 opacity-50 text-lg">♬</div>
        <div className="absolute animate-float-slow top-1/3 left-1/4 text-pink-400 opacity-35 text-lg">♩</div>
        <div className="absolute animate-bounce-slow bottom-1/2 right-1/2 text-purple-400 opacity-45 text-xl">♭</div>

        <div className="absolute animate-float-medium top-1/4 left-1/6 w-12 h-0.5 bg-pink-300 opacity-30 rotate-12" />
        <div className="absolute animate-float-slow bottom-1/4 right-1/6 w-8 h-0.5 bg-purple-300 opacity-25 -rotate-12" />
        <div className="absolute animate-pulse-slow top-1/2 left-1/2 w-10 h-0.5 bg-blue-300 opacity-35 rotate-45" />
      </div>

      {/* Sidebar controls */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10">
        <div
          className={`${
            isDarkMode ? "bg-gray-800/80" : "bg-white/80"
          } backdrop-blur-sm rounded-r-2xl p-4 space-y-6 transition-all duration-300`}
        >
          <div className="text-center">
            <div
              className={`text-sm font-medium ${
                isDarkMode ? "text-pink-300" : "text-purple-600"
              } mb-2`}
            >
              THEME
            </div>
            <button
              onClick={handleThemeChange}
              className={`w-10 h-10 bg-gradient-to-br ${
                themes[currentTheme].primary
              } rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer`}
            >
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div
                  className={`w-3 h-3 bg-gradient-to-br ${
                    themes[currentTheme].primary
                  } rounded-full`}
                ></div>
              </div>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Sparkles
              className={`w-6 h-6 ${
                isDarkMode ? "text-purple-300" : "text-purple-500"
              }`}
            />
            <button
              onClick={handleModeToggle}
              className={`w-6 h-6 ${
                isDarkMode ? "bg-gray-700" : "bg-purple-100"
              } rounded flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer`}
            >
              <div
                className={`w-3 h-3 ${
                  isDarkMode ? "bg-purple-300" : "bg-purple-500"
                } rounded`}
              ></div>
            </button>
          </div>
          <div className="text-center">
            <div
              className={`text-sm font-medium ${
                isDarkMode ? "text-purple-300" : "text-purple-600"
              }`}
            >
              MODE
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${
                themes[currentTheme].secondary
              } rounded-2xl flex items-center justify-center transition-all duration-300`}
            >
              <Music className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              } transition-colors duration-300`}
            >
              MusicTutor
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <span
              className={`${
                isDarkMode ? "text-pink-300" : "text-purple-600"
              } font-medium cursor-default transition-colors duration-300`}
            >
              Home
            </span>
            <span
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } cursor-default transition-colors duration-300`}
            >
              Features
            </span>
            <span
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } cursor-default transition-colors duration-300`}
            >
              Instruments
            </span>
            <span
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } cursor-default transition-colors duration-300`}
            >
              About
            </span>
          </div>

          <Button
            className={`bg-gradient-to-r ${
              themes[currentTheme].secondary
            } hover:opacity-90 text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200`}
            onClick={() => alert("Get Started clicked!")}
          >
            Get Started
          </Button>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 pt-16 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`inline-flex items-center space-x-2 ${
              isDarkMode ? "bg-gray-800/80" : "bg-white/80"
            } backdrop-blur-sm rounded-full px-6 py-3 mb-12 border ${
              isDarkMode ? "border-gray-700" : "border-white/20"
            } transition-all duration-300`}
          >
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span
              className={`${
                isDarkMode ? "text-pink-300" : "text-purple-600"
              } font-medium transition-colors duration-300`}
            >
              AI-Powered Music Learning
            </span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span
              className={`${
                isDarkMode
                  ? "bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"
                  : "bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600"
              } bg-clip-text text-transparent transition-all duration-300`}
            >
              Master Your Music
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl ${
              isDarkMode ? "text-purple-200" : "text-purple-600"
            } mb-12 max-w-4xl mx-auto leading-relaxed transition-colors duration-300`}
          >
            AI-powered music tutor that helps you learn piano, guitar, and more
            <br />
            with personalized feedback and interactive lessons.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
            <Button
              className={`bg-gradient-to-r ${
                themes[currentTheme].secondary
              } hover:opacity-90 text-white px-8 py-4 rounded-2xl font-medium text-lg flex items-center space-x-2 hover:scale-105 transition-all duration-200`}
              onClick={() => alert("Start Learning clicked!")}
            >
              <Play className="w-5 h-5" />
              <span>Start Learning</span>
              <div className="w-5 h-5 flex items-center justify-center">→</div>
            </Button>
            <Button
              variant="outline"
              className={`${
                isDarkMode
                  ? "bg-gray-800/80 border-purple-400 text-purple-300 hover:bg-gray-700/80"
                  : "bg-white/80 border-purple-200 text-purple-600 hover:bg-purple-50"
              } backdrop-blur-sm px-8 py-4 rounded-2xl font-medium text-lg flex items-center space-x-2 hover:scale-105 transition-all duration-200`}
              onClick={() => alert("Watch Demo clicked!")}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              className={`${
                isDarkMode ? "bg-gray-800/60" : "bg-white/60"
              } backdrop-blur-sm rounded-3xl p-8 border ${
                isDarkMode ? "border-gray-700" : "border-white/20"
              } hover:scale-105 transition-all duration-300`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${
                  themes[currentTheme].secondary
                } rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300`}
              >
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                } mb-4 transition-colors duration-300`}
              >
                AI Analysis
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}
              >
                Get instant feedback on your performance
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800/60" : "bg-white/60"
              } backdrop-blur-sm rounded-3xl p-8 border ${
                isDarkMode ? "border-gray-700" : "border-white/20"
              } hover:scale-105 transition-all duration-300`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                } mb-4 transition-colors duration-300`}
              >
                Interactive Lessons
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}
              >
                Learn with engaging, step-by-step lessons
              </p>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-gray-800/60" : "bg-white/60"
              } backdrop-blur-sm rounded-3xl p-8 border ${
                isDarkMode ? "border-gray-700" : "border-white/20"
              } hover:scale-105 transition-all duration-300`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                } mb-4 transition-colors duration-300`}
              >
                Progress Tracking
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}
              >
                Monitor your improvement with detailed
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbox */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        ) : (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-2xl w-80 h-96 border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            } transition-all duration-300`}
          >
            <div
              className={`flex items-center justify-between p-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  Chat Support
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className={`${
                  isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                } transition-colors duration-300`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              <div
                className={`${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                } rounded-lg p-3 mb-3 transition-colors duration-300`}
              >
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } transition-colors duration-300`}
                >
                  Hello! How can I help you with your music learning journey today?
                </p>
              </div>
            </div>
            <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2 border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                />
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
