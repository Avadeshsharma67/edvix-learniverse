
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-10 max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4 text-secondary">404</h1>
        <p className="text-xl text-secondary/70 mb-6">
          Oops! The page you're looking for cannot be found
        </p>
        <p className="text-sm text-secondary/60 mb-8">
          The page at <span className="font-medium">{location.pathname}</span> does not exist or has been moved
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
