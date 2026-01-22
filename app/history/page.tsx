"use client";

import { useState, useEffect } from "react";
import { api } from "@/libs/api";

interface AnalysisItem {
  id: string;
  filename: string;
  created_at: string;
  overall_score: number;
}

export default function HistoryPage() {
  const [data, setData] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get<AnalysisItem[]>("/analysis/all");
        setData(res.data);
      } catch (e: any) {
        setErr(e?.response?.data?.message ?? "Gagal memuat history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-4">History</h1>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">History</h1>
      <div className="bg-white p-4 rounded shadow">
        {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
        
        {data.length === 0 ? (
          <p className="text-sm text-slate-600">Belum ada scan history.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Filename</th>
                  <th className="text-left py-2">Score</th>
                  <th className="text-left py-2">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="py-2">{item.filename}</td>
                    <td className="py-2">{item.overall_score}</td>
                    <td className="py-2">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}