
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Notes = lazy(() => import("./pages/Notes"));
const FeaturedNotes = lazy(() => import("./pages/FeaturedNotes"));
const AdditionalContents = lazy(() => import("./pages/AdditionalContents"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const AboutPage = lazy(() => import("./pages/About"));
const TimelinePage = lazy(() => import("./pages/Timeline"));
const UpdatesPage = lazy(() => import("./pages/Updates"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground text-sm">
    Loading…
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
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
              <Route path="/updates" element={<UpdatesPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
