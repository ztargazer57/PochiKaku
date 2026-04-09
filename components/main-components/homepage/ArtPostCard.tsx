import Image from "next/image";
import { FaHeart, FaComment, FaEllipsisH } from "react-icons/fa";

type Post = {
  image: string;
  title: string;
  artist: string;
  avatar: string;
  likes: number;
  comments: number;
  time: string;
  isFollowed?: boolean;
};

export default function ArtCard({ post }: { post: Post }) {
  return (
    <div className="relative w-235 h-125 bg-[#f5efe6] rounded-2xl shadow-md hover:shadow-lg overflow-hidden flex flex-col">

      {/* TOP: Artist Info + Title/Caption + Follow/Menu */}
      <div className="flex flex-col p-3 flex-none border-b border-[#e8dfd3]">

        {/* Artist Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src={post.avatar} alt={post.artist} fill className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="text-[#3e2c23] font-medium text-sm">{post.artist}</p>
              <p className="text-[#5a4636] text-xs">{post.time}</p>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            <button className={`px-2 py-1 text-xs rounded-full font-medium border ${
              post.isFollowed ? 'bg-[#5a4636] text-white border-[#5a4636]' : 'bg-white text-[#5a4636] border-[#5a4636]'
            }`}>
              {post.isFollowed ? 'Following' : 'Follow'}
            </button>
            <button className="p-1 rounded-full hover:bg-gray-200">
              <FaEllipsisH size={16} />
            </button>
          </div>
        </div>

        {/* Title / Caption */}
        <p className="text-[#3e2c23] font-semibold text-base">{post.title}</p>
      </div>

      {/* IMAGE */}
      <div className="relative flex-1 w-full border-b border-[#e8dfd3]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-contain"
        />
      </div>

      {/* BOTTOM: Actions */}
      <div className="p-3 flex-none">
        <div className="flex gap-5 text-[#3e2c23] text-base mb-2">
          <span className="flex items-center gap-1">
            <FaHeart size={18} /> {post.likes} Likes
          </span>
          <span className="flex items-center gap-1">
            <FaComment size={18} /> {post.comments} Comments
          </span>
        </div>
      </div>
    </div>
  );
}