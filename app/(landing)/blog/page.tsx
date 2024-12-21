import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getBlogs } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/section-heading";
import { Search } from "lucide-react";

export const revalidate = 60; // revalidate this page every 60 seconds

const categories = [
  "All",
  "Exam Preparation",
  "Study Tips",
  "Student Life",
  "Mathematics",
  "Parenting",
  "Technology",
];

async function BlogList() {
  const blogPosts = await getBlogs();

  return (
    <div
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      //   variants={{
      //     animate: { transition: { staggerChildren: 0.1 } },
      //   }}
      //   initial="initial"
      //   animate="animate"
    >
      {blogPosts.data.map((post) => (
        <div key={post.id}>
          <Card className="overflow-hidden h-full flex flex-col">
            <Image
              src={post.blogImage || "/placeholder.svg"}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <div
                className="ProseMirror max-w-none text-muted-foreground mb-4 flex-grow"
                dangerouslySetInnerHTML={{
                  __html: post.content.substring(0, 150) + "...",
                }}
              />

              <div className="flex items-center justify-between mt-4">
                <Button variant="link" className="p-0" asChild>
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary text-white py-20">
        <div className="container">
          <SectionHeading
            title="Our Blog"
            subtitle="Insights and tips from our educational experts"
            className="text-white [&>p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-2/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input className="pl-10" placeholder="Search articles..." />
              </div>
            </div>
            <div className="md:w-1/3">
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                <option value="">Filter by Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <BlogList />
          </Suspense>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
