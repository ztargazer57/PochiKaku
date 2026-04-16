"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MainLayout from "@/components/main-components/layout/MainLayout";

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  comments: number;
  createdAt: string;
};

type Profile = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
};

type Stats = {
  posts: number;
  followers: number;
  following: number;
};

type ProfileResponse = {
  profile: Profile;
  stats: Stats;
  artworks: Artwork[];
  error?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/auth/me", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      const text = await res.text();

      let data: ProfileResponse;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`API did not return JSON. Status: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load profile.");
      }

      setProfile(data.profile);
      setStats(data.stats);
      setArtworks(data.artworks);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <MainLayout>
      <div className="m-3 mt-4">
        {isLoading ? (
          <div className="rounded-xl border border-[#d7cab9] bg-[#f5efe6] p-6 text-[#5a4636]">
            Loading profile...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : profile && stats ? (
          <>
            <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="relative h-28 w-28">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.username}
                  fill
                  className="rounded-full border-4 border-[#d6c3a3] object-cover"
                />
              </div>

              <div className="mt-2 flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-[#3b2f2f]">
                  {profile.username}
                </h1>

                <p className="mt-2 max-w-md text-sm text-[#5a4636]">
                  {profile.bio || "No bio yet."}
                </p>

                <div className="mt-4 flex justify-center gap-6 text-sm text-[#3b2f2f] md:justify-start">
                  <span><b>{stats.posts}</b> Posts</span>
                  <span><b>{stats.followers}</b> Followers</span>
                  <span><b>{stats.following}</b> Following</span>
                </div>
              </div>

              <button className="rounded-lg bg-[#8b6b4f] px-5 py-2 text-white transition hover:bg-[#6f533d]">
                Edit Profile
              </button>
            </div>

            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#3b2f2f]">
                  Art Gallery
                </h2>
                <p className="text-sm text-[#5a4636]">
                  Works by this artist
                </p>
              </div>
            </div>

            {artworks.length === 0 ? (
              <div className="rounded-xl border border-[#d7cab9] bg-[#f5efe6] p-6 text-center text-[#5a4636]">
                No artworks uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {artworks.map((art) => (
                  <div
                    key={art.id}
                    className="relative aspect-square overflow-hidden rounded-xl group"
                  >
                    <Image
                      src={art.imageUrl}
                      alt={art.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-end bg-black/30 p-3 opacity-0 transition group-hover:opacity-100">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {art.title}
                        </p>
                        <p className="text-xs text-gray-200">
                          ❤️ {art.likes} · 💬 {art.comments}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {artworks.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="rounded-lg bg-[#e6d3b3] px-6 py-2 text-[#3b2f2f] transition hover:bg-[#d6c3a3]"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </MainLayout>
  );
}