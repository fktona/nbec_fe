"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { BookOpen, GraduationCap, Users, Clock } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert Instructors",
    description: "Learn from experienced educators dedicated to your success",
  },
  {
    icon: GraduationCap,
    title: "UTME Preparation",
    description: "Comprehensive preparation for your UTME exams",
  },
  // {
  //   icon: Users,
  //   title: "Small Class Sizes",
  //   description: "Personal attention and interactive learning environment",
  // },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Choose from multiple time slots that fit your schedule",
  },
];

export function Features() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Why Choose Us"
          subtitle="Discover what makes our educational center stand out"
          className="mb-12 md:mb-16"
        />
        <motion.div
          className="  flex flex-col md:flex-row  gap-8 max-w-[80%] items-center  justify-center w-full mx-auto self-center"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
          initial="initial"
          animate="animate"
        >
          {features.map((feature, index) => (
            <motion.div key={index} {...fadeIn}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
