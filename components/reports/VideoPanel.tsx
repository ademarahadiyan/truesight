// 18) /components/report/VideoPanel.tsx
"use client";

export default function VideoPanel({ score }: { score: number }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-medium">Video Deepfake</h4>
      <p>Score: {score}</p>
    </div>
  );
}
