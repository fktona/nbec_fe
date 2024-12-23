"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/section-heading";
import { BookOpen, GraduationCap, Users, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Choose from multiple time slots that fit your schedule",
  },
];

export function Features() {
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
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
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
      className="py-20 md:py-32 bg-gradient-to-tl from-primary/5 to-secondary/5"
    >
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Why Choose Us"
          subtitle="Discover what makes our educational center stand out"
          className="mb-12 md:mb-16 text-center"
        />
        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
