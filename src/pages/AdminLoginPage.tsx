
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import Layout from "@/components/layout/Layout";

const AdminLoginPage: React.FC = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-gradient-to-b from-studyvault-accent1 to-white flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-studyvault-dark mb-2">
              Admin Login
            </h1>
            <p className="text-gray-500">
              Sign in to manage the Study Vault platform
            </p>
          </div>
          
          <LoginForm isAdmin />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Not an administrator?{" "}
              <Link to="/login" className="text-studyvault-secondary font-medium hover:text-studyvault-primary">
                Student Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;
