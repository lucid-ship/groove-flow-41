import { useState } from "react";
import { MusicFeed } from "@/components/MusicFeed";
import { SearchPage } from "@/components/SearchPage";
import { ProfilePage } from "@/components/ProfilePage";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [activeTab, setActiveTab] = useState("music");

  return (
    <div className="relative h-screen w-full max-w-md mx-auto bg-background overflow-hidden">
      {/* Main Content */}
      <div className="h-full">
        {activeTab === "music" && <MusicFeed />}
        {activeTab === "search" && <SearchPage />}
        {activeTab === "profile" && <ProfilePage />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
