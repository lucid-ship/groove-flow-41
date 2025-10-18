import { useState } from "react";
import { Search, TrendingUp, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const trendingSearches = [
  { id: 1, query: "Summer Vibes 2024", count: "2.4M" },
  { id: 2, query: "Chill Beats", count: "1.8M" },
  { id: 3, query: "Electronic Dreams", count: "1.5M" },
  { id: 4, query: "Indie Pop Hits", count: "1.2M" },
  { id: 5, query: "Night Drive Music", count: "980K" },
];

const recentSearches = [
  "Midnight Dreams",
  "Luna Rivers",
  "Electric Hearts",
  "Ocean Waves",
];

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentList, setRecentList] = useState(recentSearches);

  const removeRecent = (query: string) => {
    setRecentList(recentList.filter(item => item !== query));
  };

  const clearAllRecent = () => {
    setRecentList([]);
  };

  return (
    <div className="h-screen w-full overflow-y-auto pb-24 bg-background">
      {/* Search Header */}
      <div className="sticky top-0 z-10 glass p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search songs, artists, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 bg-muted border-border rounded-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Trending Searches */}
        {!searchQuery && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Trending Now
              </h2>
            </div>
            <div className="space-y-2">
              {trendingSearches.map((item, index) => (
                <button
                  key={item.id}
                  className="w-full flex items-center justify-between p-4 glass rounded-xl hover:bg-muted/50 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold gradient-text">
                      {index + 1}
                    </span>
                    <span className="text-foreground font-medium">
                      {item.query}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentList.length > 0 && (
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  Recent Searches
                </h2>
              </div>
              <button
                onClick={clearAllRecent}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {recentList.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 glass rounded-xl hover:bg-muted/50 transition-all group"
                >
                  <button className="flex items-center gap-3 flex-1">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{query}</span>
                  </button>
                  <button
                    onClick={() => removeRecent(query)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Placeholder */}
        {searchQuery && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-foreground">
              Results for "{searchQuery}"
            </h2>
            <div className="flex items-center justify-center h-64 glass rounded-xl">
              <p className="text-muted-foreground">
                Search functionality coming soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
