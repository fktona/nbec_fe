"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Award,
} from "lucide-react";

const offerings = [
  {
    icon: GraduationCap,
    title: "UTME Preparation",
    description:
      "Comprehensive courses covering all UTME subjects, with practice tests and exam strategies.",
  },
  {
    icon: Users,
    title: "One-on-One Tutoring",
    description:
      "Personalized tutoring sessions tailored to your specific needs and learning style.",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    description:
      "Access to a wide range of study materials, including textbooks, practice papers, and online resources.",
  },
  {
    icon: Calendar,
    title: "Mock Exams",
    description:
      "Regular mock exams to assess your progress and familiarize you with the actual test environment.",
  },
  {
    icon: CheckCircle2,
    title: "Performance Tracking",
    description:
      "Detailed analysis of your performance to identify strengths and areas for improvement.",
  },
  {
    icon: Award,
    title: "Exam Registration Assistance",
    description: "Guidance and support for the UTME registration process.",
  },
];

export function Offerings() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="What We Offer"
          subtitle="Comprehensive educational services to help you succeed"
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
          {offerings.map((offering, index) => (
            <motion.div key={index} {...fadeIn}>
              <Card className="h-full">
                <CardHeader>
                  <offering.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{offering.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {offering.description}
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
