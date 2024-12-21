import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Offerings } from "@/components/Offerings";
import { SuccessStories } from "@/components/SuccessStories";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <Hero /> */}
      {/* <Features /> */}
      {/* <Offerings /> */}
      {/* <SuccessStories /> */}
      {/* <Blog /> */}
      {/* <Testimonials /> */}
      <CallToAction />
      <Contact />
    </div>
  );
}
