// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { SectionHeading } from "@/components/section-heading";
// import { TestimonialCard } from "@/components/testimonial-card";
// import {
//   BookOpen,
//   GraduationCap,
//   Users,
//   Clock,
//   MapPin,
//   Phone,
//   Mail,
//   ArrowRight,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   CheckCircle2,
//   Calendar,
//   Award,
// } from "lucide-react";

// const features = [
//   {
//     icon: BookOpen,
//     title: "Expert Instructors",
//     description: "Learn from experienced educators dedicated to your success",
//   },
//   {
//     icon: GraduationCap,
//     title: "UTME Preparation",
//     description: "Comprehensive preparation for your UTME exams",
//   },
//   {
//     icon: Users,
//     title: "Small Class Sizes",
//     description: "Personal attention and interactive learning environment",
//   },
//   {
//     icon: Clock,
//     title: "Flexible Schedule",
//     description: "Choose from multiple time slots that fit your schedule",
//   },
// ];

// const offerings = [
//   {
//     icon: GraduationCap,
//     title: "UTME Preparation",
//     description:
//       "Comprehensive courses covering all UTME subjects, with practice tests and exam strategies.",
//   },
//   {
//     icon: Users,
//     title: "One-on-One Tutoring",
//     description:
//       "Personalized tutoring sessions tailored to your specific needs and learning style.",
//   },
//   {
//     icon: BookOpen,
//     title: "Study Materials",
//     description:
//       "Access to a wide range of study materials, including textbooks, practice papers, and online resources.",
//   },
//   {
//     icon: Calendar,
//     title: "Mock Exams",
//     description:
//       "Regular mock exams to assess your progress and familiarize you with the actual test environment.",
//   },
//   {
//     icon: CheckCircle2,
//     title: "Performance Tracking",
//     description:
//       "Detailed analysis of your performance to identify strengths and areas for improvement.",
//   },
//   {
//     icon: Award,
//     title: "Exam Registration Assistance",
//     description: "Guidance and support for the UTME registration process.",
//   },
// ];

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "UTME Student",
//     content:
//       "The preparation I received here was invaluable. I achieved my target score and got into my dream university.",
//     image: "/placeholder.svg",
//     rating: 5,
//   },
//   {
//     name: "Michael Chen",
//     role: "Parent",
//     content:
//       "The dedication of the teachers and the quality of education is outstanding. My child's grades have improved significantly.",
//     image: "/placeholder.svg",
//     rating: 5,
//   },
//   {
//     name: "Amina Okafor",
//     role: "UTME Student",
//     content:
//       "The mock exams and performance tracking really helped me understand my weak areas and focus my studies effectively.",
//     image: "/placeholder.svg",
//     rating: 5,
//   },
// ];

// const blogPosts = [
//   {
//     title: "How to Prepare for UTME",
//     excerpt:
//       "Essential tips and strategies for achieving your best score in the Unified Tertiary Matriculation Examination.",
//     image: "/placeholder.svg",
//     date: "June 15, 2023",
//   },
//   {
//     title: "The Importance of Mock Exams",
//     excerpt:
//       "Why taking practice tests is crucial for exam success and how to make the most of them.",
//     image: "/placeholder.svg",
//     date: "June 10, 2023",
//   },
//   {
//     title: "Time Management Skills",
//     excerpt:
//       "Master the art of balancing studies and personal life for optimal academic performance.",
//     image: "/placeholder.svg",
//     date: "June 5, 2023",
//   },
// ];

// export default function Home() {
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-b from-primary/10 to-white pt-16 pb-24 sm:pt-20 sm:pb-32 md:pt-32 md:pb-44">
//         <div className="container px-4 sm:px-6">
//           <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
//             {/* Text Content */}
//             <motion.div className="text-center sm:text-left" {...fadeIn}>
//               <h1 className="text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
//                 Unlock Your{" "}
//                 <span className="text-primary">Academic Potential</span>
//               </h1>
//               <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground md:text-xl">
//                 New Breed Educational Centre is your gateway to academic
//                 excellence. We provide comprehensive UTME preparation and
//                 personalized tutoring to help you achieve your educational
//                 goals.
//               </p>
//               <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
//                 <Button size="lg" asChild>
//                   <Link href="/about">Discover More</Link>
//                 </Button>
//                 <Button size="lg" variant="outline" asChild>
//                   <Link href="/contact">Get Started</Link>
//                 </Button>
//               </div>
//             </motion.div>

//             {/* Image Content */}
//             <motion.div
//               className="relative order-last lg:order-last"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Image
//                 src="/placeholder.svg"
//                 alt="Students learning"
//                 width={500}
//                 height={300}
//                 className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-full"
//                 priority
//               />
//               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 md:py-32 bg-gray-50">
//         <div className="container px-4 md:px-6">
//           <SectionHeading
//             title="Why Choose Us"
//             subtitle="Discover what makes our educational center stand out"
//             className="mb-12 md:mb-16"
//           />
//           <motion.div
//             className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
//             variants={{
//               animate: { transition: { staggerChildren: 0.1 } },
//             }}
//             initial="initial"
//             animate="animate"
//           >
//             {features.map((feature, index) => (
//               <motion.div key={index} {...fadeIn}>
//                 <Card className="h-full">
//                   <CardContent className="pt-6">
//                     <feature.icon className="h-12 w-12 text-primary mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-muted-foreground">
//                       {feature.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Our Offerings Section */}
//       <section className="py-20 md:py-32">
//         <div className="container px-4 md:px-6">
//           <SectionHeading
//             title="What We Offer"
//             subtitle="Comprehensive educational services to help you succeed"
//             className="mb-12 md:mb-16"
//           />
//           <motion.div
//             className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
//             variants={{
//               animate: { transition: { staggerChildren: 0.1 } },
//             }}
//             initial="initial"
//             animate="animate"
//           >
//             {offerings.map((offering, index) => (
//               <motion.div key={index} {...fadeIn}>
//                 <Card className="h-full">
//                   <CardHeader>
//                     <offering.icon className="h-8 w-8 text-primary mb-2" />
//                     <CardTitle>{offering.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-muted-foreground">
//                       {offering.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Success Stories Section */}
//       <section className="py-20 md:py-32 bg-gray-50">
//         <div className="container px-4 md:px-6">
//           <SectionHeading
//             title="Success Stories"
//             subtitle="See how our students have achieved their goals"
//             className="mb-12 md:mb-16"
//           />
//           <motion.div
//             className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
//             variants={{
//               animate: { transition: { staggerChildren: 0.1 } },
//             }}
//             initial="initial"
//             animate="animate"
//           >
//             {[
//               {
//                 name: "Chidi Okonkwo",
//                 score: 320,
//                 university: "University of Lagos",
//               },
//               {
//                 name: "Fatima Bello",
//                 score: 315,
//                 university: "Ahmadu Bello University",
//               },
//               {
//                 name: "Oluwaseun Adeleke",
//                 score: 330,
//                 university: "University of Ibadan",
//               },
//             ].map((story, index) => (
//               <motion.div key={index} {...fadeIn}>
//                 <Card className="h-full">
//                   <CardContent className="pt-6">
//                     <Image
//                       src="/placeholder.svg"
//                       alt={story.name}
//                       width={100}
//                       height={100}
//                       className="rounded-full mx-auto mb-4"
//                     />
//                     <h3 className="text-xl font-semibold text-center mb-2">
//                       {story.name}
//                     </h3>
//                     <p className="text-center text-muted-foreground mb-2">
//                       UTME Score: {story.score}
//                     </p>
//                     <p className="text-center text-primary font-semibold">
//                       Admitted to {story.university}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Blog Section */}
//       <section className="py-20 md:py-32">
//         <div className="container px-4 md:px-6">
//           <SectionHeading
//             title="Latest from Our Blog"
//             subtitle="Stay updated with educational insights and tips"
//             className="mb-12 md:mb-16"
//           />
//           <motion.div
//             className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
//             variants={{
//               animate: { transition: { staggerChildren: 0.1 } },
//             }}
//             initial="initial"
//             animate="animate"
//           >
//             {blogPosts.map((post, index) => (
//               <motion.div key={index} {...fadeIn}>
//                 <Card className="overflow-hidden h-full">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     width={400}
//                     height={200}
//                     className="w-full h-48 object-cover"
//                   />
//                   <CardContent className="p-6">
//                     <p className="text-sm text-muted-foreground mb-2">
//                       {post.date}
//                     </p>
//                     <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
//                     <p className="text-muted-foreground mb-4">{post.excerpt}</p>
//                     <Button variant="link" className="p-0" asChild>
//                       <Link href="/blog">
//                         Read More <ArrowRight className="ml-2 h-4 w-4" />
//                       </Link>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//           <div className="text-center mt-12">
//             <Button size="lg" variant="outline" asChild>
//               <Link href="/blog">View All Posts</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 md:py-32 bg-gray-50">
//         <div className="container px-4 md:px-6">
//           <SectionHeading
//             title="What Our Students Say"
//             subtitle="Hear from our successful students and parents"
//             className="mb-12 md:mb-16"
//           />
//           <motion.div
//             className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
//             variants={{
//               animate: { transition: { staggerChildren: 0.1 } },
//             }}
//             initial="initial"
//             animate="animate"
//           >
//             {testimonials.map((testimonial, index) => (
//               <motion.div key={index} {...fadeIn}>
//                 <TestimonialCard {...testimonial} />
//               </motion.div>
//             ))}
//           </motion.div>
//           <div className="text-center mt-12">
//             <Button size="lg" variant="outline" asChild>
//               <Link href="/testimonials">View All Testimonials</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-20 md:py-32 bg-primary text-primary-foreground">
//         <div className="container px-4 md:px-6">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//               Ready to Start Your Journey?
//             </h2>
//             <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
//               Join New Breed Educational Centre and take the first step towards
//               your academic success.
//             </p>
//             <div className="mt-8">
//               <Button size="lg" variant="secondary" asChild>
//                 <Link href="/contact">Enroll Now</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20 md:py-32">
//         <div className="container px-4 md:px-6">
//           <SectionHeading
//             title="Get in Touch"
//             subtitle="Have questions? We're here to help"
//             className="mb-12 md:mb-16"
//           />
//           <div className="grid gap-12 lg:grid-cols-2">
//             <motion.div {...fadeIn}>
//               <Card>
//                 <CardContent className="p-6">
//                   <form className="space-y-4">
//                     <div>
//                       <Input placeholder="Your Name" />
//                     </div>
//                     <div>
//                       <Input type="email" placeholder="Your Email" />
//                     </div>
//                     <div>
//                       <Textarea placeholder="Your Message" rows={4} />
//                     </div>
//                     <Button type="submit" className="w-full">
//                       Send Message
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </motion.div>
//             <motion.div className="space-y-6" {...fadeIn}>
//               <div className="flex items-start space-x-4">
//                 <MapPin className="h-6 w-6 text-primary shrink-0" />
//                 <div>
//                   <h3 className="font-semibold">Address</h3>
//                   <p className="text-muted-foreground">
//                     No 9, Magistrate Court Rd, Igboora
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <Phone className="h-6 w-6 text-primary shrink-0" />
//                 <div>
//                   <h3 className="font-semibold">Phone</h3>
//                   <p className="text-muted-foreground">+2349069561604</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <Mail className="h-6 w-6 text-primary shrink-0" />
//                 <div>
//                   <h3 className="font-semibold">Email</h3>
//                   <p className="text-muted-foreground">
//                     newbreededucationalcentre@gmail.com
//                   </p>
//                 </div>
//               </div>
//               <div className="pt-6">
//                 <h3 className="font-semibold mb-4">Follow Us</h3>
//                 <div className="flex space-x-4">
//                   <Button variant="ghost" size="icon">
//                     <Facebook className="h-5 w-5" />
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <Twitter className="h-5 w-5" />
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <Instagram className="h-5 w-5" />
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <Linkedin className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import Hero from "@/components/Hero";
import { Features } from "@/components/Features";
import { Offerings } from "@/components/Offerings";
import { SuccessStories } from "@/components/SuccessStories";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Contact } from "@/components/Contact";
import { fetchTestimonials, getBlogs } from "../../actions/actions";

export default async function Home() {
  const testimonials = await fetchTestimonials();
  const initialBlogs = await getBlogs({
    limit: 3,
  });

  console.log("gooopsaihsa", initialBlogs);
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Offerings />
      <SuccessStories />
      <Blog initialBlogs={initialBlogs} />
      <Testimonials initialTestimonials={testimonials} />
      <CallToAction />
      <Contact />
    </div>
  );
}
