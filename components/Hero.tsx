"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const buttons = buttonsRef.current;
    const image = imageRef.current;

    // Clear any existing ScrollTriggers or animations
    gsap.killTweensOf([heading, paragraph, buttons, image]);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(heading, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        paragraph,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        buttons,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        image,
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

    // Parallax effect on image
    gsap.to(image, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      // Cleanup on unmount or navigation
      gsap.killTweensOf([heading, paragraph, buttons, image]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Runs only on mount and unmount

  return (
    <section
      ref={sectionRef}
      className="relative pt-16 md:pt-20 overflow-hidden"
    >
      <div className="container px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="text-center sm:text-left">
            <h1 className="font-bold inline-block lg:hidden text-[26px]">
              New Breed Educational Centre
            </h1>
            <h1
              ref={headingRef}
              className="lg:text-3xl mb-10 lg:mb-0 font-bold tracking-tight"
            >
              Unlock Your{" "}
              <span className="text-primary relative inline-block">
                Academic Potential
              </span>
            </h1>
            <p
              ref={paragraphRef}
              className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground md:text-xl"
            >
              New Breed Educational Centre is your gateway to academic
              excellence. We provide comprehensive UTME preparation and
              personalized tutoring to help you achieve your educational goals.
            </p>
            <div
              ref={buttonsRef}
              className="mt-6 sm:mt-8 flex flex-wrap gap-4 justify-center sm:justify-start"
            >
              <Button size="lg" asChild>
                <Link href="/about">Discover More</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/registration">Get Started</Link>
              </Button>
            </div>
          </div>
          <div ref={imageRef} className="relative order-first lg:order-last">
            <Image
              src="/assets/hero.png"
              alt="Students learning"
              width={500}
              height={200}
              className="rounded-lg hidden lg:block shadow-2xl w-full relative h-[80svh] object-cover object-top max-w-xs sm:max-w-md lg:max-w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
