"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { Testimonial } from "@/actions/actions";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "UTME Student",
    content:
      "The preparation I received here was invaluable. I achieved my target score and got into my dream university.",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Parent",
    content:
      "The dedication of the teachers and the quality of education is outstanding. My child's grades have improved significantly.",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Amina Okafor",
    role: "UTME Student",
    content:
      "The mock exams and performance tracking really helped me understand my weak areas and focus my studies effectively.",
    image: "/placeholder.svg",
    rating: 5,
  },
];
interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}
export function Testimonials({ initialTestimonials }: TestimonialsClientProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="What Our Students Say"
          subtitle="Hear from our successful students and parents"
          className="mb-12 md:mb-16"
        />
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
          initial="initial"
          animate="animate"
        >
          {initialTestimonials.map((testimonial: Testimonial, index) => (
            <motion.div key={index} {...fadeIn}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
