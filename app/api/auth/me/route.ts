import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromToken } from "@/lib/auth/auth";

export async function GET() {
  try {
    const currentUser = await getCurrentUserFromToken();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            likes: true,
            comments: true,
          },
        },
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const cloudinaryBaseUrl = "https://res.cloudinary.com/dh8rpbwxq/";

    const artworks = user.posts
      .filter((post) => post.imageUrl.startsWith(cloudinaryBaseUrl))
      .map((post) => ({
        id: post.id,
        title: post.title || "Untitled",
        imageUrl: post.imageUrl,
        likes: post.likes.length,
        comments: post.comments.length,
        createdAt: post.createdAt.toISOString(),
      }));

    return NextResponse.json({
      profile: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl || "/avatar.jpg",
        bio: user.bio || "",
      },
      stats: {
        posts: artworks.length,
        followers: user.followers.length,
        following: user.following.length,
      },
      artworks,
    });
  } catch (error) {
    console.error("GET /api/profile/me error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load profile",
      },
      { status: 500 }
    );
  }
}