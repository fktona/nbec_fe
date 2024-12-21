import { getBlogs } from "@/actions/actions";
import { Suspense } from "react";
import BlogPage from "./blogs";

export const revalidate = 60; // revalidate this page every 60 seconds

async function BlogList() {
  const blogs = await getBlogs();

  return <BlogPage initialBlogs={blogs} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogList />
    </Suspense>
  );
}
