"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart, FaComment, FaTimes } from "react-icons/fa";

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

type Submission = {
  id: string;
  caption: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  };
  post: {
    id: string;
    imageUrl: string;
    title: string | null;
    description: string | null;
    likesCount: number;
    commentsCount: number;
    isLiked?: boolean;
    comments: CommentItem[];
  };
};

type EventSubmissionDetailsModalProps = {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
};

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

export default function EventSubmissionDetailsModal({
  submission,
  isOpen,
  onClose,
}: EventSubmissionDetailsModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (!submission) return;

    setIsLiked(!!submission.post.isLiked);
    setLikes(submission.post.likesCount);
    setComments(submission.post.comments || []);
    setCommentCount(submission.post.commentsCount);
  }, [submission]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !submission) return null;

  const handleLikeToggle = async () => {
    try {
      const res = await fetch(`/api/posts/${submission.post.id}/like`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to toggle like");
      }

      setIsLiked(data.isLiked);
      setLikes(data.likes);
    } catch (error) {
      console.error("Like toggle error:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentInput.trim()) return;

    try {
      setIsSubmittingComment(true);

      const res = await fetch(`/api/posts/${submission.post.id}/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to comment");
      }

      setComments((prev) => [...prev, data.comment]);
      setCommentCount(data.comments);
      setCommentInput("");
    } catch (error) {
      console.error("Comment submit error:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="relative flex h-[95vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70"
            aria-label="Close modal"
          >
            <FaTimes size={18} />
          </button>

          <div className="flex h-full w-full flex-col lg:flex-row">
            <div className="relative flex min-h-[280px] flex-1 items-center justify-center bg-black lg:min-h-full">
              <Image
                src={submission.post.imageUrl}
                alt={submission.post.title || submission.caption || "Submission"}
                width={1800}
                height={1800}
                className="h-full max-h-[95vh] w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
            </div>

            <div className="flex w-full flex-col border-t border-[#e8dfd3] lg:w-[420px] lg:border-l lg:border-t-0">
              <div className="border-b border-[#e8dfd3] p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={submission.user.avatarUrl || "/avatar.jpg"}
                      alt={submission.user.username}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#3e2c23]">
                      {submission.user.username}
                    </p>
                    <p className="text-xs text-[#6b5a4d]">
                      Submitted {formatTimeAgo(submission.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#e8dfd3] px-4 py-4">
                <h3 className="text-lg font-bold text-[#3e2c23]">
                  {submission.post.title || "Untitled Submission"}
                </h3>

                {submission.caption ? (
                  <p className="mt-2 text-sm leading-6 text-[#5a4636]">
                    {submission.caption}
                  </p>
                ) : null}

                {submission.post.description ? (
                  <p className="mt-2 text-sm leading-6 text-[#6b5a4d]">
                    {submission.post.description}
                  </p>
                ) : null}
              </div>

              <div className="border-b border-[#e8dfd3] px-4 py-3">
                <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-[#3e2c23]">
                  <button
                    onClick={handleLikeToggle}
                    className="flex items-center gap-2 transition hover:opacity-80"
                    type="button"
                  >
                    <FaHeart
                      size={18}
                      className={isLiked ? "text-red-500" : "text-[#3e2c23]"}
                    />
                    <span>{likes} Likes</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <FaComment size={18} />
                    <span>{commentCount} Comments</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-3">
                  {comments.length === 0 ? (
                    <p className="text-sm text-[#6b5a4d]">No comments yet.</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={comment.user.avatarUrl || "/avatar.jpg"}
                            alt={comment.user.username}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>

                        <div className="max-w-[85%] rounded-2xl bg-[#f7f3ee] px-3 py-2">
                          <p className="text-sm font-semibold text-[#3e2c23]">
                            {comment.user.username}
                          </p>
                          <p className="break-words text-sm text-[#5a4636]">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-[#e8dfd3] p-4">
                <form onSubmit={handleCommentSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 rounded-full border border-[#d9cfc3] bg-white px-4 py-2 text-sm text-[#3e2c23] outline-none placeholder:text-[#9a8878] focus:border-[#5a4636]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingComment}
                    className="rounded-full bg-[#5a4636] px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingComment ? "Posting..." : "Post"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
