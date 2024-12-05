import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function View500() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container max-w-[640px] mx-auto pt-16 pb-8 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            500 Internal Server Error
          </h1>

          <p className="text-muted-foreground text-lg">
            There was an error, please try again later.
          </p>

          {/* <div className="py-8 md:py-12 w-full max-w-sm mx-auto">
            <img
              src={ServerErrorImage}
              alt="Server Error Illustration"
              className="w-full h-auto"
            />
          </div> */}

          <Button asChild size="lg">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
