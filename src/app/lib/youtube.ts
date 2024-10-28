// src/lib/youtube.ts
import ytdl from 'ytdl-core';

export async function getVideoInfo(url: string) {
  try {
    const info = await ytdl.getInfo(url);
    return {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      formats: ytdl.filterFormats(info.formats, 'videoandaudio'),
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw new Error('Failed to fetch video information');
  }
}
