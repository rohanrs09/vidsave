"use client";

import { VideoInfo } from "@/types";
import Image from "next/image";

interface VideoInfoProps {
  videoInfo: VideoInfo; // Use the imported VideoInfo type
  selectedQuality: string;
  setSelectedQuality: (quality: string) => void;
}

export default function VideoInfoComponent({
  videoInfo,
  selectedQuality,
  setSelectedQuality,
}: VideoInfoProps) {
  if (!videoInfo) {
    return null; // Don't render anything if there's no video info
  }

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl font-bold">{videoInfo.title}</h2>
      <Image
        src={videoInfo.thumbnail}
        alt={videoInfo.title}
        width={500} // Set a specific width
        height={300} // Set a specific height
        className="w-full rounded" // You can still use className for styling
        layout="responsive" // Optional: maintains aspect ratio
      />
      <select
        value={selectedQuality}
        onChange={(e) => setSelectedQuality(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Quality</option>
        {videoInfo.formats.map((format) => (
          <option key={format.itag} value={format.itag}>
            {format.qualityLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
