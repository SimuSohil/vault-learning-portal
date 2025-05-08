
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Layout from "@/components/layout/Layout";
import { BookOpen } from "lucide-react";

const RegisterPage: React.FC = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-gradient-to-b from-studyvault-accent1 to-white flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <BookOpen className="h-12 w-12 text-studyvault-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-studyvault-dark mb-2">
              Join Study Vault
            </h1>
            <p className="text-gray-500">
              Create an account to access study materials and contribute to the community
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
