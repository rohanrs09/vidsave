import { z } from 'zod'

export const downloadSchema = z.object({
  url: z.string().url('Invalid YouTube URL'),
  quality: z.string().min(1, 'Please select a quality'),
})

export type DownloadInput = z.infer<typeof downloadSchema>