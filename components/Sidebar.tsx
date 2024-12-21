"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      enabled: true,
    },
    {
      href: "/admin/students",
      label: "Students",
      icon: <Users className="h-5 w-5" />,
      enabled: true,
    },
    {
      href: "/admin/blog",
      label: "Blog",
      icon: <FileText className="h-5 w-5" />,
      enabled: true,
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
      icon: <MessageSquare className="h-5 w-5" />,
      enabled: true,
    },
    {
      href: "/admin/calendar",
      label: "Calendar (Add Soon)",
      icon: <Calendar className="h-5 w-5" />,
      enabled: false,
    },
    {
      href: "/admin/courses",
      label: "Courses (Add Soon)",
      icon: <BookOpen className="h-5 w-5" />,
      enabled: false,
    },
    {
      href: "/admin/settings",
      label: "Settings (Add Soon)",
      icon: <Settings className="h-5 w-5" />,
      enabled: false,
    },
    {
      href: "/admin/logout",
      label: "Logout (Add Soon)",
      icon: <LogOut className="h-5 w-5" />,
      enabled: false,
    },
  ];

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`bg-blue-800 h-dvh text-blue-100 w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform transition-all duration-300 ease-in-out fixed md:relative ${
          isOpen
            ? "translate-x-0 md:translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav>
          {/* Map through navItems array and render each item */}
          {navItems.map((item) => (
            <Link
              href={item.enabled ? item.href : "#"}
              key={item.href}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md ${
                item.enabled
                  ? "hover:bg-blue-700 cursor-pointer"
                  : "cursor-not-allowed text-gray-400"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="text-white bg-blue-800 p-2 rounded-md"
          onClick={toggleSidebar} // Toggle sidebar visibility on click
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
