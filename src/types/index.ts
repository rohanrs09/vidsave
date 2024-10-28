export interface VideoInfo {
    title: string;
    thumbnail: string;
    formats: {
      itag: number;
      qualityLabel: string;
    }[];
  }
  
  export interface DownloadHistoryItem {
    id: string
    videoId: string
    title: string
    quality: string
    createdAt: Date
  }