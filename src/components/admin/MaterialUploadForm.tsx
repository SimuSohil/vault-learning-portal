
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface MaterialUploadFormProps {
  subjectId: string;
  onSuccess?: () => void;
}

const MaterialUploadForm: React.FC<MaterialUploadFormProps> = ({ 
  subjectId, 
  onSuccess 
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [driveLink, setDriveLink] = useState("");
  const [isGoogleDrive, setIsGoogleDrive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type) {
      toast.error("Please select a material type");
      return;
    }
    
    if (!isGoogleDrive && !file) {
      toast.error("Please upload a file");
      return;
    }
    
    if (isGoogleDrive && !driveLink) {
      toast.error("Please provide a Google Drive link");
      return;
    }
    
    setIsUploading(true);
    
    // Mock upload - in a real app, this would upload the file to a server
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Material uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setType(undefined);
      setFile(null);
      setDriveLink("");
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="title">Material Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description"
          rows={3}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Material Type</Label>
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lecture">Lecture</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isGoogleDrive"
            checked={isGoogleDrive}
            onChange={() => setIsGoogleDrive(!isGoogleDrive)}
            className="mr-2"
          />
          <Label htmlFor="isGoogleDrive">Google Drive Link</Label>
        </div>
      </div>
      
      {isGoogleDrive ? (
        <div className="space-y-2">
          <Label htmlFor="driveLink">Google Drive Link</Label>
          <Input
            id="driveLink"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="Paste Google Drive link"
            required={isGoogleDrive}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="file">Upload File</Label>
          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to select</p>
              <Input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                required={!isGoogleDrive}
              />
              <Label 
                htmlFor="file" 
                className="bg-studyvault-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-studyvault-secondary"
              >
                Choose File
              </Label>
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-md p-3 bg-gray-50">
              <div className="flex items-center">
                <FileIcon className="h-6 w-6 text-studyvault-secondary mr-2" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="bg-studyvault-primary hover:bg-studyvault-secondary w-full"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Material"}
      </Button>
    </form>
  );
};

// Simple file icon component
const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);

export default MaterialUploadForm;
