
import React, { useState } from "react";
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

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock password reset - in a real app, this would send a reset email
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success("Reset link sent to your email!");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      {!submitted ? (
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-studyvault-primary hover:bg-studyvault-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="text-center text-sm">
              <a 
                href="/login" 
                className="text-studyvault-secondary hover:text-studyvault-primary font-medium"
              >
                Back to login
              </a>
            </div>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="space-y-4">
          <div className="text-center text-sm py-4">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your email and follow the instructions.
          </div>
          <div className="text-center">
            <a 
              href="/login" 
              className="text-studyvault-secondary hover:text-studyvault-primary font-medium"
            >
              Return to login
            </a>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ForgotPasswordForm;
