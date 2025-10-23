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
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg flex flex-col">
      <RelativityFieldLines />
      <div className="relative z-10 flex-1">
        <TopControls />
        <div className="flex items-center justify-center min-h-[80vh] pt-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
            <p className="text-xl text-muted-foreground mb-8">Oops! The page you're looking for doesn't exist</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
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
