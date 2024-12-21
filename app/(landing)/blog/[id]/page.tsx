import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "@/actions/actions";

export const revalidate = 60;

async function BlogPostContent({ id }: { id: string }) {
  try {
    const post = await getBlogPost(id);

    return (
      <article className="max-w-6xl mx-auto">
        <div className="relative w-full aspect-video mb-8">
          {" "}
          {/* Set a height */}
          <Image
            src={post.blogImage || "/placeholder.svg"}
            alt={post.title}
            fill
            priority
            objectPosition="center"
            className="object-cover rounded-lg shadow-md"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div
          className="ProseMirror max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogPostContent id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
