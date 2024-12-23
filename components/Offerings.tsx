"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/section-heading";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;

    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="What We Offer"
          subtitle="Comprehensive educational services to help you succeed"
          className="mb-12 md:mb-16 text-center"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                <offering.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{offering.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {offering.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
