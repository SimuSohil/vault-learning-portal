
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Remove the redirect to /login since the login page is already configured at "/" in App.tsx
  // This prevents an infinite redirect loop
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-xl text-gray-600">Welcome to Study Vault</p>
      </div>
    </div>
  );
};

export default Index;
