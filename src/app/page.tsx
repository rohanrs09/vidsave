import DownloadForm from './components/DownloadForm'
import DownloadHistory from './components/DownloadHistory'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-8">
          YouTube Downloader
        </h1>
        <div className="space-y-8">
          <DownloadForm />
          <DownloadHistory />
        </div>
      </div>
    </main>
  )
}