"use client";

import { useState, useRef, useEffect } from "react";
import {
  Moon,
  Sun,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Star,
  Send,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "next-themes";
import axios from "axios";

export default function PersonaLanding() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const characters = [
    {
      id: 1,
      name: "Hitesh Choudhary",
      description:
        "Retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (950k & 470k)",
      image: "/indian-male-developer-instructor.png",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-500",
      specialty: "Full-Stack Development",
    },
    {
      id: 2,
      name: "Piyush Garg",
      description:
        "Passionate educator specializing in modern web technologies",
      image: "/young-indian-male-web-developer-tech-educator-smiling.png",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500",
      specialty: "Frontend Development",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = (character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: 1,
        text: `Hi! I'm ${character.name}, your ${character.specialty} mentor. How can I help you today?`,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hitesh/chat",
        {
          message: inputMessage,
          character: selectedCharacter.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = {
        id: messages.length + 2,
        text: response.data?.reply || "I'm not sure how to respond to that.", // Changed to use 'reply' field
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling API:", error);

      const aiResponse = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const backToLanding = () => {
    setSelectedCharacter(null);
    setMessages([]);
    setInputMessage("");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Chat Interface
  if (selectedCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        {/* Chat Header */}
        <div className="sticky top-0 z-10 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/30 dark:border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={backToLanding}
                className="p-2 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:scale-110 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <img
                src={selectedCharacter.image || "/placeholder.svg"}
                alt={selectedCharacter.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {selectedCharacter.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCharacter.specialty}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-600" />
              )}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="max-w-4xl mx-auto px-6 py-6 min-h-[calc(100vh-200px)]">
          <div className="space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-sm border
                    ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-white/20"
                        : "bg-white/20 dark:bg-black/20 text-gray-900 dark:text-white border-white/30 dark:border-white/10"
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="sticky bottom-0 bg-white/20 dark:bg-black/20 backdrop-blur-md border-t border-white/30 dark:border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${selectedCharacter.name}...`}
                  className="w-full px-4 py-3 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/40 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  rows="1"
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Persona
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              TOTALLY NOT INAPPROPRIATE
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
            Chat with Brilliantly
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Smart Characters!
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Connect with AI characters who are definitely appropriate for your
          learning journey. They remember your progress... err... conversations!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 border border-gray-200 dark:border-gray-700"
            onClick={() =>
              document
                .getElementById("characters")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <MessageCircle className="w-5 h-5" />
            Start Learning Free
          </button>
          <button className="px-8 py-4 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            Browse Expert Characters
          </button>
        </div>

        {/* Character Grid */}
        <div
          id="characters"
          className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
        >
          {characters.map((character, index) => (
            <div
              key={character.id}
              className="group cursor-pointer"
              onClick={() => startChat(character)}
            >
              <div
                className={`
                relative p-8 rounded-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2
                ${character.bgColor} bg-opacity-90 backdrop-blur-sm
                shadow-xl hover:shadow-2xl w-64
              `}
              >
                <div className="relative mb-6">
                  <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/30 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl mb-3">
                  {character.name}
                </h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  {character.description}
                </p>

                <div className="flex items-center justify-center gap-1 text-white/90 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{character.specialty}</span>
                </div>

                <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              50K+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Active Learners
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              1M+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Conversations
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400">Available</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Persona
              </span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Persona. Built with modern web technologies.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
