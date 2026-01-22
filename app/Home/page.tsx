"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function HomeMenu() {
  const pathname = usePathname();
  const router = useRouter();

  // --- HOW IT WORKS SCROLL ANIMATION (ALL CARDS TOGETHER) ---
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(320);

  useEffect(() => {
    function handleScroll() {
      if (!howItWorksSectionRef.current) return;
      const rect = howItWorksSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      // More pronounced effect: threshold 800px from viewport center
      const threshold = 800;
      let progress = 1 - Math.min(distance, threshold) / threshold;
      // minWidth: 260, maxWidth: 520
      let width = 260 + progress * 260;
      width = Math.max(260, Math.min(width, 520));
      setCardWidth(width);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HOW IT WORKS DATA (SIMPLE, ENGAGING, USER-FRIENDLY) ---
  const howItWorks = [
    {
      step: "1",
      icon: "📤",
      title: "Upload Content",
      desc: (
        <>
          Upload image, video, audio, or just insert a URL. Super easy, no hassle.
        </>
      ),
    },
    {
      step: "2",
      icon: "🤖",
      title: "AI Analysis",
      desc: (
        <>
          Our AI checks integrity, manipulation, metadata, and any weird stuff. Fast and smart.
        </>
      ),
    },
    {
      step: "3",
      icon: "🔗",
      title: "Correlation",
      desc: (
        <>
          We combine all signals to calculate authenticity and credibility. No guesswork.
        </>
      ),
    },
    {
      step: "4",
      icon: "📊",
      title: "Interactive Report",
      desc: (
        <>
          Instantly see the verdict, metadata, scores, and detailed insights. All in one place.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A1733] via-[#0F2747] to-[#081124]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">DT</span>
          </div>
          <span className="text-white text-xl font-bold">DeepTruth </span>
        </div>
        <div className="flex items-center gap-8">
          <button
            type="button"
            className={`transition ${pathname === "/Home" ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"} bg-transparent border-none outline-none`}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/Home")}
          >
            Home
          </button>
          <Link href="/features">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition text-white font-semibold">
              Get Scan
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-blue-500"></div>
                <span className="text-blue-400 font-semibold text-sm">Advanced Detection Technology</span>
              </div>
              <h1 className="text-5xl font-bold text-white leading-tight mb-4">
                Detect Deepfakes<br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Instantly & Accurately
                </span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                DeepTruth Streamlined is a smart solution designed to detect and analyze deepfake content whether it’s video, audio, or other digital media using advanced AI technology. It helps you quickly identify what’s authentic and what’s manipulated, ensuring your digital information stays reliable.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 font-semibold">Main Features:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Video Deepfake Detection with MesoNet
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Audio Analysis & Speech Recognition
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Detailed Reports & Data Visualization
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Real-time Processing & Accuracy Score
                </li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/features">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition text-white font-semibold flex items-center gap-2">
                  <span>🔍</span>
                  Scan Now
                </button>
              </Link>
              <Link href="/features">
                <button className="px-8 py-3 rounded-full border-2 border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/10 transition text-blue-300 font-semibold">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Right - Hero Card with Fingerprint Image */}
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-[#0F2747]/80 to-[#081124]/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12 text-center space-y-6">
              {/* Accuracy Badge */}
              <div className="absolute top-6 right-6 bg-blue-500/20 border border-blue-500/50 rounded-xl px-4 py-2">
                <p className="text-blue-300 text-xs font-semibold">Accuracy</p>
                <p className="text-white text-2xl font-bold">98.5%</p>
              </div>
              {/* Fingerprint Image */}
              <div className="flex justify-center py-8">
                <Image
                  src="/Fingertips.png"
                  alt="Fingerprint Detection"
                  width={200}
                  height={240}
                  priority
                  className="drop-shadow-lg"
                />
              </div>
              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Deepfake Detection</h2>
                <p className="text-gray-400 text-sm">AI-Powered Analysis</p>
              </div>
              {/* Processing Badge */}
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl px-4 py-3 inline-block">
                <p className="text-blue-300 text-xs font-semibold">Processing</p>
                <p className="text-white text-lg font-bold">Real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
          <p className="text-gray-400 text-lg">Next-level technology for your digital security.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🚀",
              title: "Fast & Accurate",
              desc: "Deepfake detection in seconds with industry-leading accuracy."
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your data is protected. We never store your files."
            },
            {
              icon: "📊",
              title: "Detailed Reports",
              desc: "Comprehensive reports and easy-to-read."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">🚀 How It Works</h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Get started in just a few steps. It's simple, fast, and designed for everyone.
          </p>
        </div>
        <div
          ref={howItWorksSectionRef}
          className="flex flex-row items-stretch justify-center gap-8 mx-auto"
          style={{
            minHeight: 260,
            overflowX: "visible"
          }}
        >
          {howItWorks.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-br from-blue-900/80 to-blue-800/80 border border-blue-700/30 rounded-3xl shadow-2xl flex flex-col items-center text-center hover:scale-[1.04] transition group"
              style={{
                width: cardWidth,
                minWidth: 260,
                maxWidth: 520,
                minHeight: 260,
                marginBottom: 12,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                transition: "width 0.5s cubic-bezier(.4,2,.3,1), box-shadow 0.3s",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {/* Step Number & Icon */}
              <div className="flex flex-col items-center pt-8 pb-4">
                <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl font-bold border-4 border-blue-400 shadow-lg mb-2">
                  {step.icon}
                </div>
                <div className="text-blue-300 font-bold text-lg mb-2">Step {step.step}</div>
                <div className="font-bold text-white text-2xl mb-2">{step.title}</div>
                <div className="text-blue-100 text-base mb-4 px-4">{step.desc}</div>
              </div>
              {/* Connector */}
              {idx < howItWorks.length - 1 && (
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-900 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/30 to-blue-800/30 border border-blue-500/30 backdrop-blur-sm rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Detect Deepfake?</h2>
          <p className="text-gray-300 mb-8 text-lg">Start analyzing your content now and ensure its authenticity.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/features">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition text-white font-semibold">
                Start Now
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