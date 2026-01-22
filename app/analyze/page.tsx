"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

// Dummy Data
const dummyVideo = {
  score: 0.32,
  heatmap: Array(30).fill(0).map((_, i) => (i === 12 || i === 13 ? 0.8 : Math.random() * 0.5)),
  metadata: {
    codec: "H.264",
    bitrate: "2.5 Mbps",
    fps: "30",
    duration: "00:01:23",
  },
  encoder: "FFmpeg",
  container: "MP4",
};
const dummyImage = {
  score: 0.67,
  exif: {
    camera: "Canon EOS 80D",
    lens: "EF-S 18-135mm",
    edited: "Yes",
    gps: "6.1751° S, 106.8650° E",
  },
  tampering: ["AI-generated", "GAN noise"],
  heatmap: "https://via.placeholder.com/400x200?text=Heatmap+Overlay",
  image: "https://via.placeholder.com/400x200?text=Image",
};
const dummyLink = {
  whois: {
    domain: "example.com",
    created: "2023-01-01",
    expires: "2026-01-01",
    registrar: "Namecheap",
    owner: "Private",
  },
  dns: [
    { type: "A", value: "192.168.1.1" },
    { type: "MX", value: "mail.example.com" },
    { type: "TXT", value: "v=spf1 include:_spf.example.com ~all" },
  ],
  ssl: "Valid",
  geo: {
    ip: "192.168.1.1",
    isp: "Indihome",
    country: "Indonesia",
    city: "Jakarta",
    map: "https://via.placeholder.com/200x100?text=Map",
  },
  reputation: 0.15,
};
const dummyAudio = {
  score: 0.45,
  spectrogram: "https://via.placeholder.com/400x100?text=Spectrogram",
  metadata: {
    bitrate: "128 kbps",
    codec: "AAC",
    channels: "2",
    sampleRate: "44.1 kHz",
  },
  voiceprint: 0.82,
};

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scanned, setScanned] = useState(false);

  // Helper Gauge
  const Gauge = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center my-4">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="#0b1220" stroke="#1e2a3a" strokeWidth="5" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={value > 0.5 ? "#ef4444" : "#22d3ee"}
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - value)}
            transform="rotate(-90 50 50)"
          />
          <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="22px" fontWeight="bold">
            {(value * 100).toFixed(1)}%
          </text>
        </svg>
      </div>
      <span className="text-blue-300 mt-2">{label}</span>
    </div>
  );

  // Dummy Heatmap Timeline
  const HeatmapTimeline = ({ scores }: { scores: number[] }) => (
    <div className="flex flex-col gap-2 my-4">
      <div className="flex gap-1">
        {scores.map((score, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 40,
              background: score > 0.7 ? "#ef4444" : score > 0.4 ? "#f59e42" : "#22d3ee",
              opacity: 0.8,
              borderRadius: 2,
            }}
            title={`Frame ${i + 1}: ${(score * 100).toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-blue-300">
        <span>0%</span>
        <span>Anomaly</span>
        <span>100%</span>
      </div>
    </div>
  );

  // Dummy Badge
  const Badge = ({ text, color = "blue" }: { text: string; color?: string }) => {
    let bg = "#1e293b", border = "#3b82f6", txt = "#60a5fa";
    if (color === "red") { bg = "#7f1d1d"; border = "#ef4444"; txt = "#f87171"; }
    if (color === "green") { bg = "#14532d"; border = "#22c55e"; txt = "#4ade80"; }
    if (color === "yellow") { bg = "#78350f"; border = "#eab308"; txt = "#fde047"; }
    return (
      <span
        style={{ background: bg, border: `1px solid ${border}`, color: txt }}
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
      >
        {text}
      </span>
    );
  };

  // Dummy Table
  const Table = ({ data }: { data: { type: string; value: string }[] }) => (
    <table className="w-full text-left text-blue-100 my-2 border border-[#1e2a3a] rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-[#0b1220]">
          <th className="px-3 py-2">Type</th>
          <th className="px-3 py-2">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t border-[#1e2a3a]">
            <td className="px-3 py-2">{row.type}</td>
            <td className="px-3 py-2">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Dummy Card Key-Value
  const CardKV = ({ data }: { data: Record<string, string> }) => (
    <Card className="p-4 mb-2 bg-[#0b1220] border border-[#1e2a3a]">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex justify-between py-1 text-blue-100">
          <span className="font-semibold text-blue-300">{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </Card>
  );

  // Dummy Mini Map
  const MiniMap = ({ url }: { url: string }) => (
    <div className="my-2">
      <img src={url} alt="Map" className="rounded-lg border border-[#1e2a3a]" />
    </div>
  );

  // Dummy Spectrogram
  const Spectrogram = ({ url }: { url: string }) => (
    <div className="my-2">
      <img src={url} alt="Spectrogram" className="rounded-lg border border-[#1e2a3a]" />
    </div>
  );

  // Dummy Image Overlay
  const ImageOverlay = ({ image, heatmap }: { image: string; heatmap: string }) => (
    <div className="relative w-[400px] h-[200px] my-2">
      <img src={image} alt="Image" className="absolute w-full h-full object-cover rounded-lg border border-[#1e2a3a]" />
      <img src={heatmap} alt="Heatmap" className="absolute w-full h-full object-cover rounded-lg opacity-50" />
    </div>
  );

  // Dummy Similarity Bar
  const SimilarityBar = ({ value }: { value: number }) => (
    <div className="my-2">
      <span className="text-blue-300 text-xs">Voiceprint Similarity</span>
      <div className="w-full bg-[#0b1220] rounded-full h-4 border border-[#1e2a3a] mt-1">
        <div
          className="h-full rounded-full transition-all bg-blue-500"
          style={{ width: `${value * 100}%` }}
        ></div>
      </div>
      <span className="text-blue-100 text-xs">{(value * 100).toFixed(1)}%</span>
    </div>
  );

  // Render Dummy Result
  const renderDummy = () => {
    if (!scanned) return null;
    if (type === "video") {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Video Analysis (Dummy)</h3>
          <Gauge value={dummyVideo.score} label="Skor Keaslian Video" />
          <HeatmapTimeline scores={dummyVideo.heatmap} />
          <CardKV data={dummyVideo.metadata} />
          <div>
            <Badge text={dummyVideo.encoder} color="blue" />
            <Badge text={dummyVideo.container} color="green" />
          </div>
        </Card>
      );
    }
    if (type === "image") {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Image Analysis (Dummy)</h3>
          <Gauge value={dummyImage.score} label="Skor Keaslian Gambar" />
          <ImageOverlay image={dummyImage.image} heatmap={dummyImage.heatmap} />
          <CardKV data={dummyImage.exif} />
          <div>
            {dummyImage.tampering.map((t, i) => (
              <Badge key={i} text={t} color={i % 2 === 0 ? "red" : "yellow"} />
            ))}
          </div>
        </Card>
      );
    }
    if (type === "link") {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Link/Domain Analysis (Dummy)</h3>
          <CardKV data={dummyLink.whois} />
          <Table data={dummyLink.dns} />
          <Badge text={`SSL: ${dummyLink.ssl}`} color={dummyLink.ssl === "Valid" ? "green" : "red"} />
          <MiniMap url={dummyLink.geo.map} />
          <CardKV data={{ IP: dummyLink.geo.ip, ISP: dummyLink.geo.isp, Country: dummyLink.geo.country, City: dummyLink.geo.city }} />
          <Gauge value={dummyLink.reputation} label="Domain Reputation" />
        </Card>
      );
    }
    if (type === "audio") {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Audio Analysis (Dummy)</h3>
          <Gauge value={dummyAudio.score} label="Skor Keaslian Audio" />
          <Spectrogram url={dummyAudio.spectrogram} />
          <CardKV data={dummyAudio.metadata} />
          <SimilarityBar value={dummyAudio.voiceprint} />
        </Card>
      );
    }
    return (
      <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] mt-8">
        <h3 className="text-blue-100 font-semibold text-lg">Pilih kategori untuk demo dummy</h3>
      </Card>
    );
  };

  // File accept type
  const getFileAccept = () => {
    if (type === "audio") return "audio/*";
    if (type === "video") return "video/*";
    if (type === "image") return "image/*";
    return "*/*";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0f1419] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button & Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push("/features")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition px-3 py-2 rounded-lg bg-blue-900/30 border border-blue-700/30"
          >
            <span>←</span>
            <span>Back to Features</span>
          </button>
          <h1 className="text-3xl font-bold text-blue-100">Analyze {type?.toUpperCase()}</h1>
          <div className="w-20"></div>
        </div>

        {/* Main Card */}
        <div className="bg-[#141c2c] border border-[#1e2a3a] rounded-2xl p-12 space-y-8">
          {/* Upload Section Header */}
          <div>
            <h2 className="text-xl font-bold text-blue-100 mb-4">Upload {type?.toUpperCase()}</h2>
            {type === "link" ? (
              <div className="space-y-4">
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Enter URL to analyze..."
                  className="w-full px-4 py-3 bg-[#0b1220] border border-[#1e2a3a] rounded-lg text-blue-100 placeholder-blue-400 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  onClick={() => setScanned(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>🔍</span>
                  Analyze
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-[#1e2a3a] rounded-xl p-8 text-center hover:border-blue-500/50 transition flex flex-col items-center">
                  <input
                    type="file"
                    onChange={e => { setFile(e.target.files?.[0] || null); }}
                    accept={getFileAccept()}
                    className="hidden"
                    id="file-input"
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </button>
                  <span className="text-blue-300 mt-3">{file ? file.name : "No file chosen"}</span>
                </div>
                {/* File Info */}
                {file && (
                  <p className="text-blue-300 text-sm">
                    <span className="text-green-400">✓ Selected:</span> {file.name}
                  </p>
                )}
                {/* Analyze Button */}
                <button
                  onClick={() => setScanned(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  disabled={!file}
                >
                  <span>🔍</span>
                  Analyze
                </button>
              </div>
            )}
          </div>
          {/* Dummy Result */}
          {renderDummy()}
        </div>
      </div>
    </div>
  );
}