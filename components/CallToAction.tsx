"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
            Join New Breed Educational Centre and take the first step towards
            your academic success.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/registration">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
