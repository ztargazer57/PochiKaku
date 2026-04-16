"use client";

import Image from "next/image";

type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
};

type EventSubmissionPost = {
  id: string;
  imageUrl: string;
  title: string | null;
  description: string | null;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  comments: CommentItem[];
};

type EventSubmissionCardProps = {
  submission: {
    id: string;
    caption: string | null;
    createdAt: string;
    user: {
      id: string;
      username: string;
      avatarUrl?: string | null;
    };
    post: EventSubmissionPost;
  };
  onClick: () => void;
};

export default function EventSubmissionCard({
  submission,
  onClick,
}: EventSubmissionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full overflow-hidden rounded-2xl bg-white text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative w-full overflow-hidden bg-[#111]">
        <Image
          src={submission.post.imageUrl}
          alt={submission.post.title || submission.caption || "Submission"}
          width={1600}
          height={1600}
          className="h-auto w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="border-t border-[#e8dfd3] px-4 py-3 flex">
        <p className="line-clamp-2 text-sm font-semibold text-[#3e2c23] sm:text-base">
          {submission.post.title || "Untitled Submission"}
        </p>
        <p className="ml-auto text-xs text-[#8a6f5a] sm:text-sm">
            {submission.user.username || "Unknown User"}
        </p>
      </div>
    </button>
  );
}
