"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

interface ServiceCard {
  title: string;
  subtitle: string;
  price: number;
  features: string[];
  tag: string;
}

const tutorialServices: ServiceCard[] = [
  {
    title: "O LEVEL",
    tag: "o-level",
    subtitle: "Registration fee ₦1,000",
    price: 4000,
    features: [
      "Intensive Coaching",
      "Pleasant Learning Experience",
      "Experienced Tutors",
      "Supportive Environment",
    ],
  },
  {
    title: "JAMB/UTME",
    tag: "utme",
    subtitle: "Registration fee ₦2,000",
    price: 10000,
    features: [
      "Intensive Coaching",
      "Pleasant Learning Experience",
      "Experienced Tutors",
      "Supportive Environment",
    ],
  },
  {
    title: "POST UTME",
    tag: "putme",
    subtitle: "Registration fee ₦2,000",
    price: 10000,
    features: [
      "Intensive Coaching",
      "Adequate Learning Environment",
      "Experienced Tutors",
      "Experienced Tutors",
    ],
  },
];

export default function Register() {
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">
            Register With Us Today
            <span className="block h-1 w-16 bg-[#f6c400] mx-auto mt-2" />
          </h2>
          <p className="text-muted-foreground">
            At New Breed Educational Centre, we offer a wide range of services
            to help you achieve your academic goals. Register with us today and
            let's help you achieve your dreams.
          </p>
        </div>

        <Tabs defaultValue="tutorials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="hostel">Hostel</TabsTrigger>
          </TabsList>
          <TabsContent value="tutorials" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorialServices.map((service, index) => (
                <Card key={index} className="bg-[#2A1B5C] text-white">
                  <CardHeader>
                    <CardTitle>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="text-sm font-normal opacity-80">
                          {service.subtitle}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-2xl font-bold">
                      ₦ {service.price.toLocaleString()}
                      <span className="text-sm font-normal opacity-80">
                        {" "}
                        per month
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#f6c400]/70" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/register/form?${service.tag}`} key={index}>
                      <Button className="w-full mt-10 bg-[#f6c400] hover:bg-[#f6c400ef]/80">
                        Register
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hostel" className="mt-8">
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-muted-foreground">
                Available Soon
              </h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
