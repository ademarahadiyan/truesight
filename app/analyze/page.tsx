"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  // Render Result
  const renderResult = () => {
    if (!scanned) return null;
    if (loading) {
      return <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] mt-8 text-blue-300">Loading...</Card>;
    }
    if (type === "video" && result) {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Video Analysis</h3>
          <Gauge value={result.score ?? 0} label="Skor Keaslian Video" />
          {result.heatmap && result.heatmap.length > 0 && <HeatmapTimeline scores={result.heatmap} />}
          {result.heatmapImg && (
            <div className="my-4">
              <img src={result.heatmapImg} alt="Heatmap" className="rounded-lg border border-[#1e2a3a] mx-auto" style={{maxWidth: 400}} />
            </div>
          )}
          {/* Tambahkan metadata, encoder, container jika backend sudah support */}
        </Card>
      );
    }
    if (type === "image" && result) {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Image Analysis</h3>
          <Gauge value={result.image_score ?? 0} label="Skor Keaslian Gambar" />
          {result.image && result.heatmap && <ImageOverlay image={result.image} heatmap={result.heatmap} />}
          {result.exif && <CardKV data={result.exif} />}
          <div>
            {result.tampering && result.tampering.map((t: string, i: number) => (
              <Badge key={i} text={t} color={i % 2 === 0 ? "red" : "yellow"} />
            ))}
          </div>
        </Card>
      );
    }
    if (type === "link" && result) {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Link/Domain Analysis</h3>
          {result.whois && <CardKV data={result.whois} />}
          {result.dns && <Table data={result.dns} />}
          {result.ssl && <Badge text={`SSL: ${result.ssl}`} color={result.ssl === "Valid" ? "green" : "red"} />}
          {result.geo && result.geo.map && <MiniMap url={result.geo.map} />}
          {result.geo && <CardKV data={{ IP: result.geo.ip, ISP: result.geo.isp, Country: result.geo.country, City: result.geo.city }} />}
          <Gauge value={result.reputation ?? 0} label="Domain Reputation" />
        </Card>
      );
    }
    if (type === "audio" && result) {
      return (
        <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] space-y-6 mt-8">
          <h3 className="text-blue-100 font-semibold text-lg">Audio Analysis</h3>
          <Gauge value={result.score ?? 0} label="Skor Keaslian Audio" />
          {result.spectrogram && <Spectrogram url={result.spectrogram} />}
          {result.metadata && <CardKV data={result.metadata} />}
          {typeof result.voiceprint === "number" && <SimilarityBar value={result.voiceprint} />}
        </Card>
      );
    }
    return (
      <Card className="p-6 border border-[#1e2a3a] rounded-lg bg-[#141c2c] mt-8">
        <h3 className="text-blue-100 font-semibold text-lg">Pilih kategori untuk analisa</h3>
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
                  onClick={async () => {
                    if (!linkUrl) return;
                    setLoading(true);
                    setScanned(true);
                    try {
                      const res = await (await import("@/libs/api")).api.analyzeOsint<any>(linkUrl);
                      setResult(res);
                    } catch (err) {
                      setResult({ error: "Gagal analisa link" });
                    }
                    setLoading(false);
                  }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  disabled={!linkUrl}
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
                  onClick={async () => {
                    if (!file) return;
                    setLoading(true);
                    setScanned(true);
                    try {
                      if (type === "image") {
                        const res = await (await import("@/libs/api")).api.extractMetadata<any>(file);
                        setResult(res);
                      } else if (type === "audio") {
                        const res = await (await import("@/libs/api")).api.uploadAudio<any>(file);
                        setResult(res);
                      } else if (type === "video") {
                        const res = await (await import("@/libs/api")).api.uploadVideo<any>(file);
                        // Mapping agar sesuai dengan struktur frontend
                        setResult({
                          score: res.analysis?.video_score ?? 0,
                          heatmap: res.analysis?.frame_scores ?? [],
                          heatmapImg: res.analysis?.frame_heatmap_path ?? null,
                          filename: res.filename ?? '',
                          // Tambahkan mapping lain jika backend sudah support
                        });
                      }
                    } catch (err) {
                      setResult({ error: `Gagal analisa ${type}` });
                    }
                    setLoading(false);
                  }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  disabled={!file}
                >
                  <span>🔍</span>
                  Analyze
                </button>
              </div>
            )}
          </div>
          {/* Result */}
          {renderResult()}
        </div>
      </div>
    </div>
  );
}