
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface MaterialProps {
  id: string;
  title: string;
  type: "pdf" | "video" | "assignment";
  description: string;
  uploadDate: string;
  fileSize?: string;
  downloadUrl: string;
  previewUrl?: string;
}

const MaterialItem: React.FC<{ material: MaterialProps }> = ({ material }) => {
  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    // In a real app, this would trigger a download
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg mb-4 bg-white hover:shadow-sm transition-shadow animate-fade-in">
      <div className="flex items-center mb-3 md:mb-0">
        <div className="mr-4">
          <FileText className="h-10 w-10 text-studyvault-secondary" />
        </div>
        <div>
          <h3 className="font-medium">{material.title}</h3>
          <div className="text-sm text-gray-500 line-clamp-1">{material.description}</div>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-400 mr-3">Added: {material.uploadDate}</span>
            {material.fileSize && (
              <span className="text-xs text-gray-400">{material.fileSize}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center w-full md:w-auto">
        {material.previewUrl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(material.previewUrl, "_blank");
                  }}
                >
                  Preview
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview this document</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <Button 
          className="bg-studyvault-primary hover:bg-studyvault-secondary w-full md:w-auto"
          size="sm"
          onClick={(e) => handleDownload(e, material.downloadUrl)}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default MaterialItem;
