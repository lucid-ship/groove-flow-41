import { Heart, Music, ListMusic, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const userStats = [
  { label: "Favorites", value: "234", icon: Heart },
  { label: "Playlists", value: "12", icon: ListMusic },
  { label: "Following", value: "156", icon: Music },
];

const favoriteSongs = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Rivers",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
  {
    id: 2,
    title: "Electric Hearts",
    artist: "The Neon Waves",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Coastal Dreams",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
  },
  {
    id: 4,
    title: "City Lights",
    artist: "Urban Echo",
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
  },
];

export const ProfilePage = () => {
  return (
    <div className="h-screen w-full overflow-y-auto pb-24 bg-background">
      {/* Profile Header */}
      <div className="relative">
        {/* Background Gradient */}
        <div
          className="h-48 w-full"
          style={{ background: 'var(--gradient-primary)' }}
        />
        
        {/* Profile Content */}
        <div className="relative px-6 -mt-16">
          {/* Avatar */}
          <div className="flex items-end justify-between mb-6">
            <div className="glass rounded-full p-1 animate-pulse-glow">
              <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center text-4xl font-bold gradient-text">
                MU
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="glass rounded-full h-10 w-10 border-border hover:bg-muted"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="space-y-2 mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground">Music User</h1>
            <p className="text-muted-foreground">@musiclover</p>
            <p className="text-foreground/80 max-w-md">
              Passionate about discovering new sounds and sharing great music 🎵
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {userStats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 text-center hover:bg-muted/50 transition-all cursor-pointer"
              >
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Favorite Songs */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Recent Favorites
              </h2>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                See All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {favoriteSongs.map((song, index) => (
                <button
                  key={song.id}
                  className="glass rounded-xl overflow-hidden hover:scale-105 transition-transform"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="aspect-square relative">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3 text-left">
                    <h3 className="font-semibold text-foreground truncate">
                      {song.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artist}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Playlists Section */}
          <div className="space-y-4 mt-8 mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-bold text-foreground">
              My Playlists
            </h2>
            <div className="glass rounded-xl p-8 text-center">
              <ListMusic className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                Create your first playlist
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
