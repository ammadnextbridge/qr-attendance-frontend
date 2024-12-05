import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function View403() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container max-w-[640px] mx-auto pt-16 pb-8 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">No permission</h1>

          <p className="text-muted-foreground text-lg">
            The page you're trying to access has restricted access. Please refer
            to your system administrator.
          </p>

          <Button asChild size="lg">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
