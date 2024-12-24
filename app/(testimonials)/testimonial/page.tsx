"use client";

import { useState } from "react";
import { createTestimonial } from "@/actions/actions";
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
      await createTestimonial(formData);
      setFeedbackModal({
        isOpen: true,
        isError: false,
        message:
          "Your testimonial has been submitted successfully. Thank you for your feedback!",
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
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">
          Share Your Success Story!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Your journey inspires others. Let your experience light the way for
          future learners!
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Newbre Educational Centre Testimonial
        </h3>
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
            <Input
              type="text"
              id="role"
              name="role"
              placeholder="e.g., Student, Parent, Professional"
              required
            />
          </div>
          <div>
            <Label htmlFor="company">Company/Institution</Label>
            <Input type="text" id="company" name="company" />
          </div>
          <div>
            <Label htmlFor="content">Your Testimonial</Label>
            <Textarea
              id="content"
              name="content"
              rows={4}
              placeholder="Share how Newbre Educational Centre has impacted your learning journey..."
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Your Story"}
          </Button>
        </div>
      </form>

      <Dialog open={feedbackModal.isOpen} onOpenChange={closeFeedbackModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {feedbackModal.isError ? "Error" : "Thank You!"}
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
