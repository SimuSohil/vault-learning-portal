
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface User {
  role: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (location.pathname === "/login" || 
      location.pathname === "/admin-login" || 
      location.pathname === "/register" || 
      location.pathname === "/forgot-password") {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-studyvault-primary" />
              <span className="text-xl font-semibold text-studyvault-dark">Study Vault</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                {user.role === "admin" ? (
                  // Admin navigation
                  <div className="flex items-center space-x-4">
                    <Link to="/admin/dashboard" className="text-gray-600 hover:text-studyvault-primary">
                      Dashboard
                    </Link>
                    <Link to="/admin/subjects" className="text-gray-600 hover:text-studyvault-primary">
                      Subjects
                    </Link>
                    <Link to="/admin/users" className="text-gray-600 hover:text-studyvault-primary">
                      Users
                    </Link>
                  </div>
                ) : (
                  // Student navigation
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard" className="text-gray-600 hover:text-studyvault-primary">
                      Dashboard
                    </Link>
                    <Link to="/subjects" className="text-gray-600 hover:text-studyvault-primary">
                      All Subjects
                    </Link>
                    <Link to="/contribute" className="text-gray-600 hover:text-studyvault-primary">
                      Contribute
                    </Link>
                  </div>
                )}

                {/* Search bar */}
                {user.role === "student" && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input 
                      placeholder="Search subjects..." 
                      className="pl-10 w-80 bg-gray-50"
                    />
                  </div>
                )}

                {/* User dropdown */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {user.email}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-studyvault-primary">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-studyvault-primary hover:bg-studyvault-secondary text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mt-2 py-2 border-t md:hidden">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2">
                  <User className="h-5 w-5 text-studyvault-secondary" />
                  <span className="text-sm">{user.email}</span>
                </div>
                
                {user.role === "admin" ? (
                  // Admin mobile navigation
                  <>
                    <Link 
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/admin/subjects"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      Subjects
                    </Link>
                    <Link 
                      to="/admin/users"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      Users
                    </Link>
                  </>
                ) : (
                  // Student mobile navigation
                  <>
                    <Link 
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/subjects"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      All Subjects
                    </Link>
                    <Link 
                      to="/contribute"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      Contribute
                    </Link>
                    
                    {/* Mobile search */}
                    <div className="px-4 py-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Search className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input 
                          placeholder="Search subjects..." 
                          className="pl-10 w-full bg-gray-50"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={toggleMobileMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
