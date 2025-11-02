import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from '@/components/Footer';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="page-shell">
      <RelativityFieldLines />
      <div className="page-surface">
        <TopControls />
        <div className="flex items-center justify-center min-h-[80vh] pt-40 pb-24">
          <div className="glass-card px-12 py-16 text-center">
            <span className="section-eyebrow mx-auto">Not found</span>
            <h1 className="mt-6 text-6xl font-semibold text-slate-900 dark:text-white">404</h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-200/80">
              Looks like that page drifted off the map. Let&apos;s get you back to the home base.
            </p>
            <Button 
              className="mx-auto mt-8"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
