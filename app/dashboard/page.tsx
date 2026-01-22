"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LineChart from "@/components/Charts/LineChart";
import Link from "next/link";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Dummy data untuk semua charts
const dailyScanData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 19 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 25 },
  { day: "Fri", count: 22 },
  { day: "Sat", count: 18 },
  { day: "Sun", count: 14 },
];

const videoScoreData = [
  { day: "Mon", score: 78 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 88 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 80 },
  { day: "Sun", score: 83 },
];

const audioScoreData = [
  { day: "Mon", score: 85 },
  { day: "Tue", score: 88 },
  { day: "Wed", score: 82 },
  { day: "Thu", score: 92 },
  { day: "Fri", score: 90 },
  { day: "Sat", score: 87 },
  { day: "Sun", score: 89 },
];

const osintRiskData = [
  { day: "Mon", risk: 45 },
  { day: "Tue", risk: 52 },
  { day: "Wed", risk: 38 },
  { day: "Thu", risk: 65 },
  { day: "Fri", risk: 58 },
  { day: "Sat", risk: 42 },
  { day: "Sun", risk: 48 },
];

const dailyScanPieData = [
  { name: "Completed", value: 158 },
  { name: "Pending", value: 42 },
];

const audioScorePieData = [
  { name: "High Score", value: 85 },
  { name: "Low Score", value: 15 },
];

const modelAccuracyPieData = [
  { name: "Accurate", value: 94 },
  { name: "Inaccurate", value: 6 },
];

const COLORS_DAILY = ["#3b82f6", "#f97316"];
const COLORS_AUDIO = ["#10b981", "#ef4444"];
const COLORS_ACCURACY = ["#8b5cf6", "#ec4899"];

const CustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-bold text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-[#0b1220] min-h-screen">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-[#141c2c] border-r border-[#1e2a3a] transition-all duration-300 flex flex-col p-6 sticky top-0 h-screen`}>
        
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between mb-8">
          <span className={`text-blue-100 font-bold text-lg transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
            SIC
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-100 hover:text-blue-300 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-3 flex-1">
          
          {/* Dashboard */}
          <Link href="/dashboard" className="block">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition cursor-pointer ${!sidebarOpen && "justify-center"}`}>
              <span className="text-xl">📊</span>
              <span className={`text-blue-100 font-medium transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
                Dashboard
              </span>
            </div>
          </Link>

          {/* Scan Video */}
          <Link href="/analyze?type=video" className="block">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-[#1e2a3a] transition cursor-pointer ${!sidebarOpen && "justify-center"}`}>
              <span className="text-xl">🎬</span>
              <span className={`transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
                Scan Video
              </span>
            </div>
          </Link>

          {/* Scan Audio */}
          <Link href="/analyze?type=audio" className="block">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-[#1e2a3a] transition cursor-pointer ${!sidebarOpen && "justify-center"}`}>
              <span className="text-xl">🎵</span>
              <span className={`transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
                Scan Audio
              </span>
            </div>
          </Link>

          {/* Scan Image */}
          <Link href="/analyze?type=image" className="block">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-[#1e2a3a] transition cursor-pointer ${!sidebarOpen && "justify-center"}`}>
              <span className="text-xl">🖼️</span>
              <span className={`transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
                Scan Image
              </span>
            </div>
          </Link>

          {/* Scan Link */}
          <Link href="/analyze?type=link" className="block">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-[#1e2a3a] transition cursor-pointer ${!sidebarOpen && "justify-center"}`}>
              <span className="text-xl">🔗</span>
              <span className={`transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
                Scan Link
              </span>
            </div>
          </Link>

        </nav>

        {/* Footer */}
        <div className={`text-center text-blue-300 text-xs border-t border-[#1e2a3a] pt-4 transition-all duration-300 ${!sidebarOpen && "hidden"}`}>
          © 2025 NgoSec-WC
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">

          {/* Title */}
          <h1 className="text-2xl font-semibold text-blue-100">Dashboard</h1>

          {/* Quick Actions Section */}
          <div className="bg-gradient-to-r from-[#1e2a3a] to-[#141c2c] rounded-lg p-6 border border-[#2d3f52]">
            <h2 className="text-lg font-semibold text-blue-100 mb-4">🚀 Quick Scan</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              
              {/* Quick Scan Video */}
              <Link href="/analyze?type=video" className="block">
                <div className="p-4 rounded-lg bg-[#141c2c] border border-[#1e2a3a] hover:border-blue-500 hover:bg-[#1a2333] transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="text-3xl mb-2">🎬</div>
                  <p className="text-blue-100 font-semibold text-sm">Scan Video</p>
                  <p className="text-blue-300 text-xs mt-1">Deepfake Detection</p>
                </div>
              </Link>

              {/* Quick Scan Audio */}
              <Link href="/analyze?type=audio" className="block">
                <div className="p-4 rounded-lg bg-[#141c2c] border border-[#1e2a3a] hover:border-blue-500 hover:bg-[#1a2333] transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="text-3xl mb-2">🎵</div>
                  <p className="text-blue-100 font-semibold text-sm">Scan Audio</p>
                  <p className="text-blue-300 text-xs mt-1">Voice Clone Detection</p>
                </div>
              </Link>

              {/* Quick Scan Image */}
              <Link href="/analyze?type=image" className="block">
                <div className="p-4 rounded-lg bg-[#141c2c] border border-[#1e2a3a] hover:border-purple-500 hover:bg-[#1a2333] transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="text-3xl mb-2">🖼️</div>
                  <p className="text-blue-100 font-semibold text-sm">Scan Image</p>
                  <p className="text-blue-300 text-xs mt-1">Metadata Extraction</p>
                </div>
              </Link>

              {/* Quick Scan Link */}
              <Link href="/analyze?type=link" className="block">
                <div className="p-4 rounded-lg bg-[#141c2c] border border-[#1e2a3a] hover:border-green-500 hover:bg-[#1a2333] transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                  <div className="text-3xl mb-2">🔗</div>
                  <p className="text-blue-100 font-semibold text-sm">Scan Link</p>
                  <p className="text-blue-300 text-xs mt-1">OSINT Analysis</p>
                </div>
              </Link>

            </div>
          </div>

          {/* Top Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <p className="text-xs text-blue-300">Total Scan</p>
              <p className="text-2xl font-bold text-blue-200 mt-2">32</p>
            </Card>

            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <p className="text-xs text-blue-300">Video Avg Score</p>
              <p className="text-2xl font-bold text-blue-200 mt-2">87%</p>
            </Card>

            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <p className="text-xs text-blue-300">Audio Avg Score</p>
              <p className="text-2xl font-bold text-blue-200 mt-2">92%</p>
            </Card>
          </div>

          {/* Charts Section - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Daily Scan Count - PIE CHART */}
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <h3 className="font-semibold text-blue-100 mb-4">Daily Scan Count</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-full h-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dailyScanPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={CustomizedLabel}
                      >
                        {dailyScanPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS_DAILY[index % COLORS_DAILY.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1a2333", border: "1px solid #1e2a3a" }} formatter={(value) => `${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
                    <span className="text-blue-100">Completed 158</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }}></div>
                    <span className="text-blue-100">Pending 42</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Video Deepfake Average Score */}
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <h3 className="font-semibold text-blue-100 mb-4">Video Deepfake Avg Score</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={videoScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a2333", border: "1px solid #1e2a3a" }} />
                    <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Charts Section - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Audio Deepfake Average Score - PIE CHART */}
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <h3 className="font-semibold text-blue-100 mb-4">Audio Deepfake Avg Score</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-full h-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audioScorePieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={CustomizedLabel}
                      >
                        {audioScorePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS_AUDIO[index % COLORS_AUDIO.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1a2333", border: "1px solid #1e2a3a" }} formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
                    <span className="text-blue-100">High Score 85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
                    <span className="text-blue-100">Low Score 15%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* OSINT Risk Trends */}
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <h3 className="font-semibold text-blue-100 mb-4">OSINT Risk Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={osintRiskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a2333", border: "1px solid #1e2a3a" }} />
                    <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 4 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Charts Section - Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Model Accuracy / Confidence History - PIE CHART */}
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <h3 className="font-semibold text-blue-100 mb-4">Model Accuracy History</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-full h-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modelAccuracyPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={CustomizedLabel}
                      >
                        {modelAccuracyPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS_ACCURACY[index % COLORS_ACCURACY.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1a2333", border: "1px solid #1e2a3a" }} formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#8b5cf6" }}></div>
                    <span className="text-blue-100">Accurate 94%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ec4899" }}></div>
                    <span className="text-blue-100">Inaccurate 6%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scan Activity Chart */}
            <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
              <h3 className="font-semibold text-blue-100 mb-4">Scan Activity</h3>
              <div className="h-64">
                <LineChart />
              </div>
            </Card>
          </div>

          {/* OSINT Reports */}
          <Card className="p-4 border border-[#1e2a3a] rounded-lg bg-[#141c2c] shadow">
            <h3 className="font-semibold text-blue-100 text-sm mb-3">OSINT Reports</h3>

            <div className="space-y-2 text-sm">
              <div className="p-2 rounded border border-blue-700 bg-[#1a2333] text-blue-100">
                <strong className="text-blue-50">email@example.com</strong> leaked.
              </div>
              <div className="p-2 rounded border border-blue-700 bg-[#1a2333] text-blue-100">
                Password exposed in breach.
              </div>
            </div>
          </Card>

        </div>
      </div>

    </div>
  );
}