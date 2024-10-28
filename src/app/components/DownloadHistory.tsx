'use client'

import { useEffect, useState } from 'react'
import type { DownloadHistoryItem } from '@/types'

export default function DownloadHistory() {
  const [history, setHistory] = useState<DownloadHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/history')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch download history')
        }
        return res.json()
      })
      .then((data: DownloadHistoryItem[]) => {
        setHistory(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch download history:', error)
        setError('Failed to load download history. Please try again later.')
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading download history...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Download History</h2>
      {history.length === 0 ? (
        <p>No download history available.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item) => (
            <li key={item.id} className="border p-2 rounded">
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-gray-600">Quality: {item.quality}</p>
              <p className="text-sm text-gray-600">
                Downloaded: {new Date(item.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}