"use client";
import { FaPlus, FaPalette, FaUsers, FaCalendar, FaUser } from "react-icons/fa";
import MainLayout from "@/components/main-components/layout/MainLayout";
import QuickActionCard from "@/components/main-components/dashboard/QuickActionCard";
import ArtPostCard from "@/components/main-components/homepage/ArtPostCard";
import RecentUploadCard from "@/components/main-components/dashboard/RecentUploadCard";
import UploadArtModal from "@/components/main-components/dashboard/UploadArtModal";
import { useState } from "react";


const recentArtworks = [
  {
    image: "/featured/lost-city.jpg",
    title: "Golden Hour",
    artist: "Frank",
    avatar: "/avatar.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/featured/warm-coffee.jpg",
    title: "City Vibes",
    artist: "Bob",
    avatar: "/avatar.jpg",
    likes: 15,
    comments: 1,
  },
  {
    image: "/featured/sketch-vibes  .jpg",
    title: "Mystic Forest",
    artist: "Cara",
    avatar: "/avatar.jpg",
    likes: 25,
    comments: 4,
  },
];

const posts = [
  {
    image: "/featured/golden-hour.jpg",
    title: "Golden Hour",
    artist: "Frank",
    avatar: "/avatar.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/featured/forest-dream.jpg",
    title: "Mystic Forest",
    artist: "Cara",
    avatar: "/avatar.jpg",
    likes: 20,
    comments: 3,
  },
];


export default function HomePage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const quickActions = [
  { title: "Upload Art", icon: FaPlus, onClick: () => setIsUploadModalOpen(true) },
  { title: "View Gallery", icon: FaPalette, link: "/gallery" },
  { title: "My Arts", icon: FaUser, link: "#" },
  { title: "Upcoming Events", icon: FaCalendar, link: "/events" },
  ];
  return (
    <MainLayout>
      {/* Welcome Message */}
      <div className="ml-8">
        <h2 className="text-3xl font-bold">
          Welcome back, <span className="text-[#5a4636]">Artist</span>!
        </h2>
        <p className="text-[#5a4636] mt-1">
          Here’s what’s happening in your community today.
        </p>
      </div>



       {/* Quick Actions */}
      <section className="p-4 ml-4 mt-4 mr-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {quickActions.map(({ title, icon, link, onClick }, idx) => (
          <QuickActionCard
            key={idx}
            title={title}
            Icon={icon}
            link={link}
            onClick={onClick}
          />
        ))}
      </section>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadArtModal
          isOpen={isUploadModalOpen}            
          onClose={() => setIsUploadModalOpen(false)} 
/>
      )}




      {/* Recent Artworks */}
      <section className="p-4 ml-4 mr-4">
        <h3 className="text-2xl font-bold mb-6">Recent Uploads</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentArtworks.map((post, index) => (
            <RecentUploadCard key={index} post={post} />
          ))}
        </div>
      </section>

      <section className="p-4 ml-4 mr-4 items-center">
        <h3 className="text-2xl font-bold mb-6">Discover Others</h3>
        <div className="flex flex-wrap gap-6">
          {posts.map((post, index) => (
            <ArtPostCard key={index} post={post} />
          ))}
        </div>
      </section>

    </MainLayout>
  );
}