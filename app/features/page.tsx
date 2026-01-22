"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeaturesPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      icon: "🎬",
      title: "Video Deepfake Detection",
      description: "Detect deepfake videos with high accuracy, powered by advanced MesoNet AI technology.",
      details: [
        "Frame-by-frame analysis",
        "Real-time processing with no delay",
        "Accuracy score up to 98%",
        "Supports MP4, AVI, MOV formats"
      ],
      color: "from-blue-600 to-blue-800",
      type: "video"
    },
    {
      id: 2,
      icon: "🎵",
      title: "Audio Deepfake Detection",
      description: "Analyze and detect fake audio with comprehensive and reliable results.",
      details: [
        "Speech pattern analysis",
        "Frequency spectrum check",
        "Real-time audio stream analysis",
        "Supports WAV, MP3, OGG formats"
      ],
      color: "from-green-600 to-green-800",
      type: "audio"
    },
    {
      id: 3,
      icon: "🔗",
      title: "Link & URL Analysis",
      description: "Identify suspicious links and protect yourself from phishing and malicious content.",
      details: [
        "Real-time threat detection",
        "Domain reputation check",
        "Phishing detection",
        "Risk score calculation"
      ],
      color: "from-purple-600 to-purple-800",
      type: "link"
    },
    {
      id: 4,
      icon: "🖼️",
      title: "Image DeepFake Detection",
      description: "Verify the authenticity of images and detect deepfake content instantly.",
      details: [
        "Pixel-level analysis",
        "AI-based forgery detection",
        "Supports JPEG, PNG, WEBP formats",
        "Instant results"
      ],
      color: "from-orange-600 to-orange-800",
      type: "image"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A1733] via-[#0F2747] to-[#081124]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/Home" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">DT</span>
          </div>
          <span className="text-white text-xl font-bold">Powered By NgoSec-WC</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/Home" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/features">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition text-white font-semibold">
              Get Scan
            </button>
          </Link>
        </div>
      </nav>

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-500"></div>
            <span className="text-blue-400 font-semibold text-sm">POWERFUL FEATURES</span>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">
            Advanced Detection<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Technology at Your Fingertips
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We provide the most advanced deepfake detection tools to help you stay secure and confident in the digital world.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Card Container */}
              <div className={`relative bg-gradient-to-br ${feature.color} p-1.5 rounded-3xl transition-all duration-500 ${hoveredFeature === idx ? "scale-105 shadow-2xl" : "scale-100"}`}>
                {/* Inner Card */}
                <div className="bg-[#0F2747] rounded-3xl p-8 h-full backdrop-blur-sm">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className={`text-6xl mb-4 transition-all duration-500 ${hoveredFeature === idx ? "scale-125" : "scale-100"}`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Details List */}
                  <div className={`space-y-3 transition-all duration-500 ${hoveredFeature === idx ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}`}>
                    <p className="text-blue-300 text-xs font-semibold">KEY FEATURES</p>
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={`/analyze?type=${feature.type}`} className="block mt-8">
                    <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${feature.color} hover:opacity-80 transition-all duration-500 text-white font-semibold text-sm transform ${hoveredFeature === idx ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"}`}>
                      Try {feature.title.split(" ")[0]} Now →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/30 to-blue-800/30 border border-blue-500/30 backdrop-blur-sm rounded-3xl p-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8">Start detecting deepfakes now and protect your digital reputation.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/features">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition text-white font-semibold">
                Explore Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/10 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-400">
          <p>© Copyright 2025 NgoSec-WC</p>
        </div>
      </footer>
    </div>
  );
}