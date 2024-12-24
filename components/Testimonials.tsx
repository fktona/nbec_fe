"use client";

import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { Testimonial } from "@/actions/actions";
import { useState } from "react";

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export function Testimonials({ initialTestimonials }: TestimonialsClientProps) {
  const [scrollDirection, setScrollDirection] = useState(1); // 1: right-to-left, -1: left-to-right
  const controls = useAnimationControls();

  const scrollVariants = {
    animate: (direction: number) => ({
      x: [0, direction * -100 + "%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    }),
    stop: {
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const handlePause = () => controls.start("stop");
  const handleResume = () => controls.start("animate");

  const handleDirectionChange = (direction: number) => {
    setScrollDirection(direction);
    controls.start("animate");
  };

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container px-4 md:px-6 overflow-hidden">
        <SectionHeading
          title="What Our Students Say"
          subtitle="Hear from our successful students and parents"
          className="mb-12 md:mb-16"
        />

        <motion.div
          className="flex mx-auto gap-6 relative"
          initial="animate"
          animate={controls}
          variants={scrollVariants}
          custom={scrollDirection}
          onHoverStart={handlePause}
          onHoverEnd={handleResume}
        >
          {[...initialTestimonials, ...initialTestimonials].map(
            (testimonial: Testimonial, index) => (
              <motion.div
                key={index}
                className="relative mx-auto"
                whileHover={{ scale: 1.05 }}
              >
                <TestimonialCard {...testimonial} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100 blur-md pointer-events-none" />
              </motion.div>
            )
          )}
        </motion.div>

        {initialTestimonials.length > 5 && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleDirectionChange(-1)}
              className="px-6"
            >
              Previous
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleDirectionChange(1)}
              className="px-6"
            >
              Next
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          {/* <Button size="lg" variant="outline" asChild>
            <Link href="/testimonials">View All Testimonials</Link>
          </Button> */}
        </div>
      </div>
    </section>
  );
}
