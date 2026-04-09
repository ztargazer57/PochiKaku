"use client";

import Image from "next/image";
import { useState } from "react";

type UploadArtModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UploadArtModal({ isOpen, onClose }: UploadArtModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;
    console.log({ title, description, tags, file });
    onClose();
    setFile(null);
    setTitle("");
    setDescription("");
    setTags("");
  };

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#f5efe6] rounded-xl p-6 w-96 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-[#3e2c23] text-lg font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-[#3e2c23]">
          Upload Your Art
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-[#5a4636] rounded-lg p-2"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-[#5a4636] rounded-lg p-2 resize-none h-20"
          />

          {/* Tags */}
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border border-[#5a4636] rounded-lg p-2"
          />

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-[#5a4636] rounded-lg p-2"
            required
          />

          {/* Preview */}
          {file && (
            <div className="relative w-full h-48 border border-[#5a4636] rounded-lg overflow-hidden">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#3e2c23] text-[#f5efe6] rounded-xl py-2 font-semibold hover:bg-[#5a4636] transition"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}