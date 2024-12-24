"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

const successStories = [
  {
    name: "Obisesan Oluwanifemi Speed",
    course: "Medicine and surgery",
    score: 320,
    university: "Ila-Orangun University",
    type: "UTME",
  },
  {
    name: "Aleji Josephine",
    course: "Medicine and surgery ",
    score: 284,
    university: "University of Uyo",
    type: "UTME",
  },
  {
    name: "Adejumo Silas",
    course: "Petroleum Engineering",
    score: 73,
    university: "University of Ibadan",
    type: "Post-UTME",
  },
];

export function SuccessStories() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Success Stories"
          subtitle="See how our students have achieved their goals"
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
          {successStories.map((story, index) => (
            <motion.div key={index} {...fadeIn}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Image
                    src="/placeholder.svg"
                    alt={story.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {story.name}
                  </h3>

                  <p className="text-center font-semibold">
                    Course: {story.course}
                  </p>
                  <p className="text-center text-muted-foreground mb-2">
                    {story.type == "UTME" ? "UTME" : "POST UTME"} SCORE:{" "}
                    {story.score}
                  </p>
                  <p className="text-center text-primary font-semibold">
                    Admitted to {story.university}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
