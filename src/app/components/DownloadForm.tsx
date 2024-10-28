// src/app/components/DownloadForm.tsx
'use client';

import { useState } from 'react';
import { getVideoInfo } from '../lib/youtube';
import toast from 'react-hot-toast';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<{ title: string; thumbnail: string; formats: { itag: number; qualityLabel: string; }[] } | null>(null);
  const [selectedQuality, setSelectedQuality] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const info = await getVideoInfo(url);
      setVideoInfo(info);
    } catch (error) {
      toast.error('Failed to fetch video information');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, quality: selectedQuality }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;  // Start download
        toast.success('Download started!');
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast.error('Failed to start download');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Get Video Info
        </button>
      </form>
      {videoInfo && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{videoInfo.title}</h2>
          <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full" />
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
          <button
            onClick={handleDownload}
            disabled={!selectedQuality}
            className="w-full p-2 bg-green-500 text-white rounded disabled:bg-gray-300"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
