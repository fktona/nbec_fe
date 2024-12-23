"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  const [isHovered, setIsHovered] = useState("");

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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Behind Methodist Grammar School, Sagan-un, Igboora, Oyo state.",
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+2349069561604",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "newbreededucationalcentre@gmail.com",
      action: "Send Email",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      content: "Monday - Friday: 8am - 6pm",
      action: "View Schedule",
    },
  ];

  const faqs = [
    {
      q: "What programs do you offer?",
      a: "We offer comprehensive UTME preparation courses, one-on-one tutoring, and specialized subject classes. Our programs are designed to cater to various learning needs and academic goals.",
    },
    {
      q: "How long are your courses?",
      a: "Our course durations vary. UTME prep typically runs for 3-6 months, while individual tutoring can be scheduled as needed. We also offer intensive short-term courses and long-term comprehensive programs.",
    },
    {
      q: "Do you offer online classes?",
      a: "Yes, we offer both in-person and online classes to accommodate different learning preferences and situations. Our online classes use interactive platforms to ensure an engaging learning experience.",
    },
    {
      q: "What is your teaching methodology?",
      a: "We employ a blend of traditional and modern teaching methods. This includes interactive lectures, practice tests, personalized feedback, and the use of technology to enhance learning. We focus on understanding concepts rather than mere memorization.",
    },
    {
      q: "How do you track student progress?",
      a: "We use a combination of regular assessments, mock exams, and one-on-one feedback sessions to track and communicate student progress. Parents and students receive detailed progress reports periodically.",
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-primary/10 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div {...fadeInUp} className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-12">
          We're here to help and answer any question you might have.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            variants={staggerChildren}
            className="lg:col-span-2 space-y-8"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={staggerChildren} className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={hoverEffect}
                onHoverStart={() => setIsHovered(info.title)}
                onHoverEnd={() => setIsHovered("")}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <info.icon className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold">{info.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-2">{info.content}</p>
                    {isHovered === info.title && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center text-primary"
                      >
                        <span className="text-sm mr-1">{info.action}</span>
                        <ExternalLink className="h-4 w-4" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
          <p className="text-muted-foreground mb-6">
            Follow us on social media for updates, tips, and educational
            content.
          </p>
          <div className="flex justify-center space-x-4">
            {[
              { name: "Facebook", icon: Facebook },
              { name: "Twitter", icon: Twitter },
              { name: "Instagram", icon: Instagram },
              { name: "LinkedIn", icon: Linkedin },
            ].map((social, index) => (
              <Button key={index} variant="outline" size="icon">
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
