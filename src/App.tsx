
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Notes from "./pages/Notes";
import FeaturedNotes from "./pages/FeaturedNotes";
import AdditionalContents from "./pages/AdditionalContents";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/About";
import TimelinePage from "./pages/Timeline";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const queryClient = new QueryClient();

const App = () => {
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/featured" element={<FeaturedNotes />} />
            <Route path="/notes/featured/page/:page" element={<FeaturedNotes />} />
            <Route path="/notes/:id" element={<Notes />} />
            <Route path="/additional-contents" element={<AdditionalContents />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectId" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
