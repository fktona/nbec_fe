"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useAdmin } from "@/context/admin-ctx";
import { login } from "@/actions/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAdmin } = useAdmin();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(username, password);
      setAdmin(user);
      toast.success("Login successful");
      router.push(callbackUrl);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl rounded-lg overflow-hidden border border-gray-300">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <CardTitle className="text-3xl font-extrabold text-center">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-sm mt-2 text-white font-light">
            Welcome to the New Breed Educational Admin Portal. Please sign in to
            continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="font-semibold text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="font-semibold text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center px-8 py-4 bg-gray-100 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            Forgot Password?&nbsp;
            <Link
              href="/admin/reset-password"
              className="text-blue-600 hover:underline"
            >
              Reset here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Not an admin?&nbsp;
            <Link href="/" className="text-blue-600 hover:underline">
              Go back to home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return <AdminLogin />;
}
