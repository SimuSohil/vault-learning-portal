
import React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Layout from "@/components/layout/Layout";

const ForgotPasswordPage: React.FC = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-gradient-to-b from-studyvault-accent1 to-white flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-studyvault-dark mb-2">
              Reset Password
            </h1>
            <p className="text-gray-500">
              Enter your email to receive a password reset link
            </p>
          </div>
          
          <ForgotPasswordForm />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
