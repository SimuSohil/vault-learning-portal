
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface LoginFormProps {
  isAdmin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isAdmin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in a real app, this would validate against a backend
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login credentials
      if (isAdmin && email === "admin@study.com" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify({ role: "admin", email }));
        toast.success("Admin login successful!");
        navigate("/admin/dashboard");
      } else if (!isAdmin && email === "student@study.com" && password === "student123") {
        localStorage.setItem("user", JSON.stringify({ role: "student", email }));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again!");
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle>{isAdmin ? "Admin Login" : "Student Login"}</CardTitle>
        <CardDescription>
          Enter your credentials to access your {isAdmin ? "admin" : "student"} account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="/forgot-password" 
                className="text-sm text-studyvault-secondary hover:text-studyvault-primary"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-studyvault-primary hover:bg-studyvault-secondary"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          {!isAdmin && (
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <a 
                href="/register" 
                className="text-studyvault-secondary hover:text-studyvault-primary font-medium"
              >
                Sign up
              </a>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
