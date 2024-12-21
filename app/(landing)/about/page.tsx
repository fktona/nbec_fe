"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, BookOpen, Award } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const stats = [
    { icon: Users, value: "1000+", label: "Students Taught" },
    { icon: BookOpen, value: "50+", label: "Courses Offered" },
    { icon: CheckCircle2, value: "95%", label: "Success Rate" },
    { icon: Award, value: "10+", label: "Years of Experience" },
  ];

  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & Lead Instructor",
      image: "/placeholder.svg",
    },
    {
      name: "Jane Smith",
      role: "Mathematics Specialist",
      image: "/placeholder.svg",
    },
    {
      name: "Michael Johnson",
      role: "Science Expert",
      image: "/placeholder.svg",
    },
    {
      name: "Sarah Williams",
      role: "Language Arts Tutor",
      image: "/placeholder.svg",
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-primary/10 lg:px-20 to-white py-12 px-4 sm:px-6 "
    >
      <motion.div {...fadeInUp} className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        <motion.section {...fadeInUp} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At New Breed Educational Centre, our mission is to empower students
            with the knowledge, skills, and confidence they need to excel in
            their academic pursuits. We are dedicated to providing high-quality
            education and personalized support to help every student reach their
            full potential.
          </p>
          <Button size="lg">Learn More</Button>
        </motion.section>

        <motion.section {...fadeInUp} className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Our Impact</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={hoverEffect}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section {...fadeInUp} className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
          >
            {/* {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={hoverEffect}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))} */}
          </motion.div>
        </motion.section>

        <motion.section {...fadeInUp} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Founded in 2010, New Breed Educational Centre began with a vision to
            revolutionize the way students prepare for their UTME exams. Over
            the years, we have grown from a small tutoring service to a
            comprehensive educational center, helping thousands of students
            achieve their academic goals.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Our success is built on our commitment to excellence, personalized
            attention, and innovative teaching methods. We continuously adapt
            our curriculum and techniques to meet the evolving needs of our
            students and the changing landscape of education.
          </p>
        </motion.section>

        <motion.section {...fadeInUp} className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Us Today</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Experience the New Breed difference and take the first step towards
            your academic success.
          </p>
          <Button size="lg">Enroll Now</Button>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
