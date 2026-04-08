// pages/index.js
import { FaPlus, FaPalette, FaUsers, FaCalendar, FaBell } from "react-icons/fa";

const quickActions = [
  { title: "Upload Art", icon: FaPlus, link: "#" },
  { title: "View Gallery", icon: FaPalette, link: "#" },
  { title: "Community Forum", icon: FaUsers, link: "#" },
  { title: "Upcoming Events", icon: FaCalendar, link: "#" },
];

const recentArtworks = [
  { title: "Sunset Dreams", artist: "Alice", img: "/art1.jpg" },
  { title: "City Vibes", artist: "Bob", img: "/art2.jpg" },
  { title: "Mystic Forest", artist: "Cara", img: "/art3.jpg" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5efe6] text-[#3e2c23]">

      {/* Sidebar */}
      <aside className="w-64 bg-[#3e2c23] text-[#f5efe6] flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">PochiKaku</h1>
        <nav className="flex flex-col space-y-4">
          {["Home","Gallery","Events","Settings"].map((link) => (
            <a key={link} href="#" className="hover:text-[#e8dfd3]">{link}</a>
          ))}
          <a href="#" className="hover:text-[#e8dfd3] mt-auto">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">

       {/* Top Bar */}
        <div className="flex justify-end items-center p-4">
        {/* Notification Bell */}
        <button className="relative p-1 hover:text-[#5a4636] transition">
            <FaBell size={24} className="text-[#3e2c23]" />
            {/* Optional red badge */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar + Name */}
        <div className="flex items-center space-x-2 ml-4 cursor-pointer">
            <img
            src="/avatar.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#5a4636]"
            />
            <span className="font-medium text-[#3e2c23]">ArtistName</span>
        </div>
        </div>

        {/* Welcome Message */}
        <div className="ml-8">
          <h2 className="text-3xl font-bold">Welcome back, <span className="text-[#5a4636]">Artist</span>!</h2>
          <p className="text-[#5a4636] mt-1">Here’s what’s happening in your community today.</p>
        </div>

        {/* Quick Actions */}
        <section className="p-4 ml-4 mt-4 mr-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {quickActions.map(({title, icon: Icon, link}, idx) => (
            <a
              key={idx}
              href={link}
              className="flex flex-col items-center justify-center p-6 bg-[#e8dfd3] rounded-lg shadow hover:bg-[#5a4636] hover:text-[#f5efe6] transition"
            >
              <Icon size={24} />
              <span className="mt-2 font-semibold text-center">{title}</span>
            </a>
          ))}
        </section>

        {/* Recent Artworks */}
        <section className="p-4 ml-4 mr-4">
          <h3 className="text-2xl font-bold mb-6">Recent Uploads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentArtworks.map(({title, artist, img}, idx) => (
              <div key={idx} className="bg-[#e8dfd3] rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img src={img} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold">{title}</h4>
                  <p className="text-sm text-[#5a4636]">by {artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}