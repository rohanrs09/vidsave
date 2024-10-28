// src/app/api/download/route.ts
import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function POST(req: Request) {
  try {
    const { url, quality } = await req.json();
    const videoId = ytdl.getVideoID(url);
    const info = await ytdl.getInfo(videoId);
    const format = ytdl.chooseFormat(info.formats, { quality });

    return NextResponse.json({
      url: format.url,
      title: info.videoDetails.title,
    });
  } catch (error) {
    console.error('Error processing download request:', error); // Log the error
    return NextResponse.json({ error: 'Failed to process video' }, { status: 500 });
  }
}
