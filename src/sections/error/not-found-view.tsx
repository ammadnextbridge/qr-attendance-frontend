import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundView() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container max-w-[640px] mx-auto pt-16 pb-8 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Sorry, page not found!
          </h1>

          <p className="text-muted-foreground text-lg">
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL? Be sure to check your spelling.
          </p>

          {/* <div className="py-8 md:py-12 w-full max-w-sm mx-auto">
            <img
              src={NotFoundImage}
              alt="404 Illustration"
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
