"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const navItems = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/courses", label: "Courses" },
  { href: "/student/assignments", label: "Assignments" },
  { href: "/student/grades", label: "Grades" },
  { href: "/student/schedule", label: "Schedule" },
  { href: "/student/resources", label: "Resources" },
  { href: "/student/forum", label: "Forum" },
  { href: "/student/profile", label: "Profile" },
];

export function StudentNav() {
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className="w-full">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
        {navItems.map((item) => (
          <TabsTrigger key={item.href} value={item.href} asChild>
            <Link
              href={item.href}
              className="w-full text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
