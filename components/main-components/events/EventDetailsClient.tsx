"use client";

import { useMemo, useState } from "react";
import EventSubmissionsSection from "./EventSubmissionsSection";
import EventSubmissionModal from "./EventSubmissionModal";

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

type EventDetailsClientProps = {
  eventId: string;
  initialSubmissions: Submission[];
  canSubmit?: boolean;
  hasSubmitted?: boolean;
  status: "Ongoing" | "Upcoming" | "Ended";
};

export default function EventDetailsClient({
  eventId,
  initialSubmissions,
  canSubmit = false,
  hasSubmitted = false,
  status,
}: EventDetailsClientProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(hasSubmitted);

  const submitDisabledReason = useMemo(() => {
    if (!canSubmit) return "Join this event first to submit.";
    if (status === "Upcoming") return "This event has not started yet.";
    if (status === "Ended") return "This event has already ended.";
    if (alreadySubmitted) return "You already submitted to this event.";
    return null;
  }, [canSubmit, status, alreadySubmitted]);

  const handleSubmitted = (submission: Submission) => {
    setSubmissions((prev) => [submission, ...prev]);
    setAlreadySubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#3e2c23]">Submissions</h2>
          <p className="text-sm text-[#8a6f5a]">
            {submissions.length} entr{submissions.length === 1 ? "y" : "ies"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          disabled={Boolean(submitDisabledReason)}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            submitDisabledReason
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "bg-[#3e2c23] text-[#f5efe6] hover:bg-[#5a4636]"
          }`}
          title={submitDisabledReason || "Submit your work"}
        >
          Submit Work
        </button>
      </div>

      {submitDisabledReason ? (
        <div className="rounded-2xl border border-dashed border-[#d7c8b8] bg-[#f8f2ea] p-4 text-sm text-[#8a6f5a]">
          {submitDisabledReason}
        </div>
      ) : null}

      <EventSubmissionsSection submissions={submissions} />

      <EventSubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        eventId={eventId}
        onSubmitted={handleSubmitted}
      />
    </div>
  );
}
