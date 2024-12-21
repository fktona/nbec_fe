"use server";
import config from "@/app/config/config";
import { cookies } from "next/headers";

export async function login(username: string, password: string) {
  const response = await fetch(`${config.API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  (await cookies()).set("token", data.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600,
    path: "/",
  });

  return data.data;
}

export async function verifyToken() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const response = await fetch(`${config.API_URL}/admin/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    (await cookies()).delete("token");
    return null;
  }

  const data = await response.json();
  return data.data;
}
