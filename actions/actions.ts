"use server";

import config from "@/app/config/config";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  sex: z.enum(["male", "female"], { required_error: "Please select your sex" }),
  email: z.string().email("Invalid email address"),
  desiredCourse: z.string().min(2, "Desired course is required"),
  preferredInstitution: z.string().min(2, "Preferred institution is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  subjectCombination: z.array(z.string()).min(1, "Select at least one subject"),
  parentsPhoneNumber: z
    .string()
    .min(10, "Valid parent's phone number is required"),
  desiredUTMEScore: z
    .number()
    .int()
    .min(0)
    .max(400, "UTME score must be between 0 and 400"),
  doneUTMEBefore: z.boolean(),
  previousScore: z
    .number()
    .int()
    .min(0)
    .max(400, "UTME score must be between 0 and 400")
    .optional(),
});

const STUDENT_API_URL = `${config.API_URL}/students`;

export async function registerStudent(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    sex: formData.get("sex"),
    email: formData.get("email"),
    desiredCourse: formData.get("desiredCourse"),
    preferredInstitution: formData.get("preferredInstitution"),
    mobileNumber: formData.get("mobileNumber"),
    subjectCombination: formData.getAll("subjectCombination"),
    parentsPhoneNumber: formData.get("parentsPhoneNumber"),
    desiredUTMEScore: Number(formData.get("desiredUTMEScore")),
    doneUTMEBefore: formData.get("doneUTMEBefore") === "true",
    previousScore: formData.get("previousScore")
      ? Number(formData.get("previousScore"))
      : undefined,
  });

  if (!validatedFields.success) {
    return { error: "Invalid form data. Please check your inputs." };
  }

  const data = validatedFields.data;

  try {
    const response = await fetch(`${STUDENT_API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return { success: true };
  } catch (error) {
    console.error("Registration failed:", error);
    return { error: "Failed to submit form. Please try again." };
  }
}
export async function getStudents() {
  const res = await fetch(`${STUDENT_API_URL}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }
  return res.json();
}

export interface Testimonial {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  content: string;
  company: string;
  picture?: string;
}

const testimonialUrl = `${config.API_URL}/testimonials`;

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(testimonialUrl, {
    next: {
      tags: ["testimonials"],
    },
  });
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  const data = await res.json();
  return data.data;
}

export async function createTestimonial(formData: FormData) {
  console.log("Creating testimonial..."); // Debugging
  const testimonial = Object.fromEntries(formData);
  const res = await fetch(testimonialUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testimonial),
  });

  if (!res.ok) throw new Error("Failed to create testimonial");
  const data = await res.json();

  console.log("Testimonial created:", data);

  revalidateTag("testimonials");
  return data.data;
}

export async function deleteTestimonial(id: string) {
  const res = await fetch(`${testimonialUrl}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete testimonial");
  const data = await res.json();

  console.log("Testimonial deleted:", data);

  revalidateTag("testimonials");
  return data.message;
}

export async function updateTestimonial(id: string, formData: FormData) {
  const testimonial = Object.fromEntries(formData);
  const res = await fetch(`${testimonialUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testimonial),
  });

  if (!res.ok) throw new Error("Failed to update testimonial");
  const data = await res.json();

  console.log("Testimonial updated:", data);

  revalidateTag("testimonials");
  return data.data;
}

const BLOG_API_URL = `${config.API_URL}/blogs`;

export async function getBlogs({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) {
  // Default to an empty object
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  const res = await fetch(`${BLOG_API_URL}?${params}`, {
    next: { tags: ["blogs"] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const result = await res.json();
  console.log("Blogs fetched:", result);
  return result.data;
}

export async function createBlog(data: {
  title: string;
  content: string;
  blogImage?: string;
}) {
  const res = await fetch(BLOG_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  revalidateTag("blogs");
  const result = await res.json();
  return result.data;
}

export async function updateBlog(
  id: string,
  data: { title: string; content: string; blogImage?: string }
) {
  const res = await fetch(`${BLOG_API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update blog");
  }

  revalidateTag("blogs");
  const result = await res.json();
  return result.data;
}

export async function deleteBlog(id: string) {
  const res = await fetch(`${BLOG_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }

  revalidateTag("blogs");
  const result = await res.json();
  return result.message;
}

export async function getBlogPost(id: string) {
  const res = await fetch(`${BLOG_API_URL}/${id}`, {
    next: { tags: ["blog", id] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }
  const result = await res.json();
  return result.data;
}
