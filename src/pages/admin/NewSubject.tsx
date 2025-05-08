
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import SubjectForm from "@/components/admin/SubjectForm";
import { toast } from "sonner";

const NewSubject: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || JSON.parse(storedUser).role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (data: { name: string; description: string; image?: string }) => {
    setIsLoading(true);
    
    // Mock API call - in a real app, this would create a new subject in the backend
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Subject created successfully!");
      navigate("/admin/subjects");
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/admin/subjects")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Subjects
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <SubjectForm 
              onSubmit={handleSubmit}
              isLoading={isLoading}
              buttonText="Create Subject"
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewSubject;
