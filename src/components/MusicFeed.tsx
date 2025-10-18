import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Song {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  lyrics: string[];
  likes: number;
  comments: number;
}

const mockSongs: Song[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Rivers",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    lyrics: [
      "Lost in the midnight dreams",
      "Where nothing's as it seems",
      "Dancing through the night",
      "Everything feels so right",
    ],
    likes: 12400,
    comments: 342,
  },
  {
    id: 2,
    title: "Electric Hearts",
    artist: "The Neon Waves",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    lyrics: [
      "Electric hearts collide tonight",
      "Sparking colors in the light",
      "Feel the rhythm, feel the beat",
      "Moving to this endless heat",
    ],
    likes: 18200,
    comments: 521,
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Coastal Dreams",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    lyrics: [
      "Crashing waves upon the shore",
      "Can't help but ask for more",
      "Salty air and summer breeze",
      "These moments bring me peace",
    ],
    likes: 9850,
    comments: 287,
  },
  {
    id: 4,
    title: "City Lights",
    artist: "Urban Echo",
    coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    lyrics: [
      "Underneath the city lights",
      "We come alive at night",
      "Concrete jungle symphony",
      "This is where we're meant to be",
    ],
    likes: 15600,
    comments: 445,
  },
];

export const MusicFeed = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSong = mockSongs[currentSongIndex];

  // Simulate lyrics progression
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentLyricIndex((prev) => 
        (prev + 1) % currentSong.lyrics.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong.lyrics.length]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / itemHeight);
    
    if (newIndex !== currentSongIndex && newIndex < mockSongs.length) {
      setCurrentSongIndex(newIndex);
      setCurrentLyricIndex(0);
      setIsPlaying(false);
    }
  };

  const toggleLike = (songId: number) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div
      ref={containerRef}
      className="snap-container h-screen w-full"
      onScroll={handleScroll}
    >
      {mockSongs.map((song, index) => (
        <div
          key={song.id}
          className="snap-item relative h-screen w-full"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'var(--gradient-overlay)' }}
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 pb-24">
            {/* Lyrics Display */}
            <div className="mb-8 space-y-2 animate-slide-up">
              {song.lyrics.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-2xl font-bold transition-all duration-500 ${
                    idx === currentLyricIndex && isPlaying
                      ? 'gradient-text scale-110'
                      : 'text-white/60'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Song Info */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                {song.title}
              </h2>
              <p className="text-lg text-white/80">
                {song.artist}
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
            {/* Like Button */}
            <button
              onClick={() => toggleLike(song.id)}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
            >
              <div
                className={`glass rounded-full p-3 transition-all ${
                  likedSongs.has(song.id)
                    ? 'bg-[hsl(280_100%_70%)] animate-pulse-glow'
                    : ''
                }`}
              >
                <Heart
                  className={`h-7 w-7 transition-colors ${
                    likedSongs.has(song.id)
                      ? 'fill-white text-white'
                      : 'text-white'
                  }`}
                />
              </div>
              <span className="text-xs text-white font-medium">
                {formatNumber(
                  song.likes + (likedSongs.has(song.id) ? 1 : 0)
                )}
              </span>
            </button>

            {/* Comment Button */}
            <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
              <div className="glass rounded-full p-3">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <span className="text-xs text-white font-medium">
                {formatNumber(song.comments)}
              </span>
            </button>

            {/* Share Button */}
            <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
              <div className="glass rounded-full p-3">
                <Share2 className="h-7 w-7 text-white" />
              </div>
              <span className="text-xs text-white font-medium">
                Share
              </span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110 mt-2"
            >
              <div className="glass rounded-full p-3 bg-[hsl(280_100%_70%)] animate-pulse-glow">
                {isPlaying ? (
                  <Pause className="h-7 w-7 text-white fill-white" />
                ) : (
                  <Play className="h-7 w-7 text-white fill-white" />
                )}
              </div>
            </button>

            {/* Album Art Thumbnail */}
            <div className="mt-2 rounded-lg overflow-hidden border-2 border-white/30">
              <img
                src={song.coverUrl}
                alt="Album"
                className="h-12 w-12 object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
