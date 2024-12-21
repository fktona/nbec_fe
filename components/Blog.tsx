"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "How to Prepare for UTME",
    content:
      "Essential tips and strategies for achieving your best score in the Unified Tertiary Matriculation Examination.",
    image: "/placeholder.svg",
    date: "June 15, 2023",
  },
  {
    title: "The Importance of Mock Exams",
    content:
      "Why taking practice tests is crucial for exam success and how to make the most of them.",
    image: "/placeholder.svg",
    date: "June 10, 2023",
  },
  {
    title: "Time Management Skills",
    content:
      "Master the art of balancing studies and personal life for optimal academic performance.",
    image: "/placeholder.svg",
    date: "June 5, 2023",
  },
];

export function Blog({ initialBlogs }) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Latest from Our Blog"
          subtitle="Stay updated with educational insights and tips"
          className="mb-12 md:mb-16"
        />
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
          initial="initial"
          animate="animate"
        >
          {initialBlogs.data.map((post, index) => (
            <motion.div key={index} {...fadeIn}>
              <Card className="overflow-hidden h-full">
                <Image
                  src={post?.blogImage || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>{" "}
                  <div
                    className="ProseMirror max-w-none text-muted-foreground mb-4 flex-grow"
                    dangerouslySetInnerHTML={{
                      __html: post.content.substring(0, 150) + "...",
                    }}
                  />{" "}
                  <Button variant="link" className="p-0" asChild>
                    <Link href="/blog">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
