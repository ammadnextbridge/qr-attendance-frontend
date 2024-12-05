import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Router } from "./routes/sections";
import { AuthProvider } from "./auth/context/jwt";
import { ProgressBar } from "./components/progress-bar";
import { useScrollToTop } from "./hooks/use-scroll-to-top";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  useScrollToTop();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <ProgressBar />
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
