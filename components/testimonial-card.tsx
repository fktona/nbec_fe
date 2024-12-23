import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Testimonial } from "@/actions/actions";
import { AvatarImage } from "@radix-ui/react-avatar";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  picture: string;
  rating: number;
}

export function TestimonialCard({
  firstName,
  lastName,
  role,
  content,
  picture,
}: Testimonial) {
  return (
    <Card className="relative w-[300px] h-[230px]">
      <CardContent className="pt-8 flex flex-col  justify-between h-full">
        <div className="absolute -top-6 left-6">
          <Avatar className="h-12 w-12 border-4 border-white">
            <AvatarImage src={picture} alt={firstName} />
            <AvatarFallback>{firstName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mb-4 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <blockquote className="mb-4 text-gray-600 text-sm line-clamp-4">
          {content}
        </blockquote>
        <div className="relateive">
          <footer>
            <div className="font-semibold">{`${firstName} ${lastName}`}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </footer>
        </div>
      </CardContent>
    </Card>
  );
}
