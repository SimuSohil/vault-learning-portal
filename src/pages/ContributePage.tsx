
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContributeForm from "@/components/contribute/ContributeForm";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

const ContributePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    // If needed, navigate or show a different view
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="bg-studyvault-accent1 inline-flex p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-studyvault-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-studyvault-dark mb-4">
              Contribute Study Materials
            </h1>
            <p className="text-lg text-gray-600">
              Share your notes, assignments, or other resources to help your peers succeed
            </p>
          </div>
          
          <Card className="p-6">
            <ContributeForm onSuccess={handleSuccess} />
          </Card>
          
          <div className="mt-10 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contribution Guidelines</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Make sure the material is relevant to the subject you select</li>
              <li>• Only upload content you have permission to share</li>
              <li>• Provide clear titles and descriptions to help others find your contribution</li>
              <li>• Materials will be reviewed by administrators before being published</li>
              <li>• Supported file formats: PDF, DOC, DOCX, PPT, PPTX, ZIP (max 100MB)</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContributePage;
