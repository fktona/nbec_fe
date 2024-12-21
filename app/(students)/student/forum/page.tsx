"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ForumPost = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  replies: number;
};

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    // In a real application, you would fetch forum posts from an API
    setPosts([
      {
        id: 1,
        title: "Tips for UTME preparation",
        content:
          "Hi everyone, I wanted to share some tips that helped me prepare for the UTME...",
        author: "John Doe",
        date: "2023-07-01",
        replies: 5,
      },
      {
        id: 2,
        title: "Struggling with Calculus",
        content:
          "I'm having trouble understanding limits in Calculus. Can anyone help?",
        author: "Jane Smith",
        date: "2023-07-02",
        replies: 3,
      },
      {
        id: 3,
        title: "English Literature study group",
        content:
          "Would anyone be interested in forming a study group for English Literature?",
        author: "Mike Johnson",
        date: "2023-07-03",
        replies: 7,
      },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the new post to an API
    const newForumPost: ForumPost = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "Current User",
      date: new Date().toISOString().split("T")[0],
      replies: 0,
    };
    setPosts([newForumPost, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Forum</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
            />
            <Button type="submit">Create Post</Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                Posted by {post.author} on {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Replies ({post.replies})</Button>
              <Button>Reply</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
