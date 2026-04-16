"use client";

import { useEffect, useState } from "react";

type EventSubmissionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onSubmitted?: (submission: any) => void;
};

export default function EventSubmissionModal({
  isOpen,
  onClose,
  eventId,
  onSubmitted,
}: EventSubmissionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCaption("");
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("caption", caption);
      formData.append("image", imageFile);

      const res = await fetch(`/api/events/${eventId}/submit`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit artwork.");
      }

      onSubmitted?.(data.submission);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Submit artwork error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to submit artwork.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div className="flex min-h-dvh items-center justify-center p-3 sm:p-4 md:p-6">
        <div
          className="relative w-full max-w-2xl rounded-3xl border border-[#dccfbe] bg-[#f5efe6] shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#dccfbe] px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6f5a]">
                Event Submission
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#3e2c23] sm:text-xl">
                Submit Your Artwork
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7c8b8] bg-[#efe5d8] text-lg text-[#5a4636] transition hover:bg-[#e5d8c8]"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#5a4636]">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Artwork title"
                className="w-full rounded-xl border border-[#d9cfc3] bg-white px-4 py-3 text-sm text-[#3e2c23] outline-none placeholder:text-[#9a8878] focus:border-[#5a4636]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#5a4636]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your artwork"
                rows={4}
                className="w-full rounded-xl border border-[#d9cfc3] bg-white px-4 py-3 text-sm text-[#3e2c23] outline-none placeholder:text-[#9a8878] focus:border-[#5a4636]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#5a4636]">
                Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Short submission caption"
                className="w-full rounded-xl border border-[#d9cfc3] bg-white px-4 py-3 text-sm text-[#3e2c23] outline-none placeholder:text-[#9a8878] focus:border-[#5a4636]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#5a4636]">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required
                className="w-full rounded-xl border border-[#d9cfc3] bg-white px-4 py-3 text-sm text-[#3e2c23] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#5a4636] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#6b5444]"
              />
            </div>

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#b8a28d] px-4 py-2.5 text-sm font-medium text-[#5a4636] transition hover:bg-[#eadfd2]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-[#3e2c23] px-4 py-2.5 text-sm font-medium text-[#f5efe6] transition hover:bg-[#5a4636] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Artwork"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
