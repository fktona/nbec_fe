import { Testimonial, fetchTestimonials } from "@/actions/actions";
import TestimonialsClient from "./testimonials-client";

export default async function TestimonialsPage() {
  const testimonials = await fetchTestimonials();

  return <TestimonialsClient initialTestimonials={testimonials} />;
}

export const revalidate = 0;
