"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStatus } from "react-dom";
import { registerStudent } from "@/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  sex: z.enum(["male", "female"], { required_error: "Please select your sex" }),
  email: z.string().email("Invalid email address"),
  desiredCourse: z.string().min(2, "Desired course is required"),
  preferredInstitution: z.string().min(2, "Preferred institution is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  subjectCombination: z
    .array(z.string())
    .min(3, "Select at least three subject"),
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Register"}
    </Button>
  );
}

export default function RegistrationForm() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      sex: undefined,
      email: "",
      desiredCourse: "",
      preferredInstitution: "",
      mobileNumber: "",
      subjectCombination: [],
      parentsPhoneNumber: "",
      desiredUTMEScore: undefined,
      doneUTMEBefore: false,
      previousScore: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setServerErrors(null);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const result = await registerStudent(formData);

    if (result.error) {
      setServerErrors(result.error);
      setShowErrorModal(true);
    } else if (result.success) {
      setShowSuccessModal(true);
    }
  }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-blue-600 mb-2">
              New Breed Educational Centre
            </h1>
            <p className="text-gray-600 mb-6">Registration Form</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredCourse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Course</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredInstitution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Institution</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjectCombination"
                  render={() => (
                    <FormItem>
                      <FormLabel>Subject Combination</FormLabel>
                      <div className="space-y-2 flex flex-wrap gap-3">
                        {[
                          "Mathematics",
                          "English",
                          "Physics",
                          "Chemistry",
                          "Biology",
                          "Economics",
                          "Government",
                          "Literature",
                          "Commerce",
                          "CRS",
                          "Geography",
                          "Accounting",
                          "Agricultural Science",
                          "Further Mathematics",
                        ].map((subject) => (
                          <FormField
                            key={subject}
                            control={form.control}
                            name="subjectCombination"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={subject}
                                  className="flex flex-row items-start w-44 space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(subject)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              subject,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== subject
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {subject}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parentsPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent's Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredUTMEScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired UTME Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          min={0}
                          max={400}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doneUTMEBefore"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Have you taken UTME before?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {form.watch("doneUTMEBefore") && (
                  <FormField
                    control={form.control}
                    name="previousScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous UTME Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            min={0}
                            max={400}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <SubmitButton />
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>
              Congratulations! Your registration has been successfully
              submitted. We look forward to helping you achieve your educational
              goals.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              router.push("/");
            }}
          >
            Back to Homepage
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Error</DialogTitle>
            <DialogDescription>
              We're sorry, but there was an error processing your registration.
              Please try again or contact support if the problem persists.
            </DialogDescription>
          </DialogHeader>
          <p className="text-red-500">{serverErrors}</p>
          <Button onClick={() => setShowErrorModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
