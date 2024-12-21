"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-white pt-16 pb-24 sm:pt-20 sm:pb-32 md:pt-32 md:pb-44">
      <div className="container px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div className="text-center sm:text-left" {...fadeIn}>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Unlock Your{" "}
              <span className="text-primary">Academic Potential</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground md:text-xl">
              New Breed Educational Centre is your gateway to academic
              excellence. We provide comprehensive UTME preparation and
              personalized tutoring to help you achieve your educational goals.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
              <Button size="lg" asChild>
                <Link href="/about">Discover More</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative order-last lg:order-last"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/assets/hero.png"
              alt="Students learning"
              width={500}
              height={200}
              className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
