"use client";

import { useState } from "react";
import {
  createTestimonial,
  createTestimonialExternal,
} from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ClientTestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    isError: boolean;
    message: string;
  }>({
    isOpen: false,
    isError: false,
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      const res = await createTestimonialExternal(formData);
      console.log("Testimonial:", res);
      setFeedbackModal({
        isOpen: true,
        isError: false,
        message: "Your testimonial has been submitted successfully.",
      });
    } catch (error) {
      setFeedbackModal({
        isOpen: true,
        isError: true,
        message:
          "An error occurred while submitting your testimonial. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeFeedbackModal = () => {
    setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Submit Your Testimonial
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input type="text" id="firstName" name="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input type="text" id="lastName" name="lastName" required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input type="text" id="role" name="role" required />
          </div>
          <div>
            <Label htmlFor="company">Company/Institution</Label>
            <Input type="text" id="company" name="company" required />
          </div>
          <div>
            <Label htmlFor="content">Your Testimonial</Label>
            <Textarea id="content" name="content" rows={4} required />
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </div>
      </form>

      <Dialog open={feedbackModal.isOpen} onOpenChange={closeFeedbackModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {feedbackModal.isError ? "Error" : "Success"}
            </DialogTitle>
            <DialogDescription>{feedbackModal.message}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={closeFeedbackModal}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
