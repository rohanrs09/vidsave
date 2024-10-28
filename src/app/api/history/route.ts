import { NextResponse } from 'next/server'
import prisma from '../../lib/db'
import type { DownloadHistoryItem } from '@/types'

export async function GET() {
  try {
    const downloads: DownloadHistoryItem[] = await prisma.download.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limit to the last 10 downloads
    })
    return NextResponse.json(downloads)
  } catch (error) {
    console.error('Failed to fetch download history:', error)
    return NextResponse.json({ error: 'Failed to fetch download history' }, { status: 500 })
  }
}