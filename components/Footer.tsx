"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  if (pathname.includes("login") || pathname.includes("register")) {
    return null;
  }
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">About Us</h3>
            <p className="text-gray-400">
              New Breed Educational Centre is dedicated to providing quality
              education and exam preparation services.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/registration" className="hover:text-primary">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="" className="hover:text-primary">
                  UTME Preparation
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-primary">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-primary">
                  English
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-primary">
                  Sciences
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on our latest educational content.
            </p>
            <form className="space-y-2">
              <Input
                placeholder="Your email"
                className="bg-gray-800 border-gray-700"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} New Breed Educational Centre. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
