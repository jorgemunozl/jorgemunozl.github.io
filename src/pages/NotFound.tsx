import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageHeader from '@/components/PageHeader';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black">
      <PageHeader title="Thoughts!" />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-gray-300 mb-8">Oops! The page you're looking for doesn't exist</p>
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
  );
};

export default NotFound;
