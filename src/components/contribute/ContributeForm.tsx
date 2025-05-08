
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { SubjectProps } from "../dashboard/SubjectCard";

interface ContributeFormProps {
  onSuccess?: () => void;
}

const ContributeForm: React.FC<ContributeFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState<string | undefined>();
  const [materialType, setMaterialType] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [driveLink, setDriveLink] = useState("");
  const [isGoogleDrive, setIsGoogleDrive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);

  // Fetch subjects - in a real app, this would be from an API
  useEffect(() => {
    // Mock data
    const mockSubjects: SubjectProps[] = [
      {
        id: "math101",
        name: "Mathematics 101",
        description: "Introduction to basic mathematics concepts",
        materialsCount: 12,
        lastUpdated: "2 days ago"
      },
      {
        id: "phys201",
        name: "Physics 201",
        description: "Advanced physics concepts and theories",
        materialsCount: 8,
        lastUpdated: "1 week ago"
      },
      {
        id: "chem101",
        name: "Chemistry 101",
        description: "Introduction to chemistry and chemical reactions",
        materialsCount: 15,
        lastUpdated: "3 days ago"
      }
    ];
    
    setSubjects(mockSubjects);
  }, []);

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
    
    if (!subjectId) {
      toast.error("Please select a subject");
      return;
    }
    
    if (!materialType) {
      toast.error("Please select a material type");
      return;
    }
    
    if (!isGoogleDrive && !file) {
      toast.error("Please upload a file or provide a Google Drive link");
      return;
    }
    
    if (isGoogleDrive && !driveLink) {
      toast.error("Please provide a Google Drive link");
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock submission - in a real app, this would send the contribution to the backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your contribution! It has been submitted for review.");
      
      // Reset form
      setTitle("");
      setDescription("");
      setSubjectId(undefined);
      setMaterialType(undefined);
      setFile(null);
      setDriveLink("");
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Select value={subjectId} onValueChange={setSubjectId} required>
          <SelectTrigger id="subject">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="materialType">Material Type</Label>
        <Select value={materialType} onValueChange={setMaterialType} required>
          <SelectTrigger id="materialType">
            <SelectValue placeholder="Select material type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lecture">Lecture Notes</SelectItem>
            <SelectItem value="pdf">PDF Document</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your contribution"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a brief description of your contribution"
          rows={3}
          required
        />
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
          <Label htmlFor="isGoogleDrive">Use Google Drive Link</Label>
        </div>
      </div>
      
      {isGoogleDrive ? (
        <div className="space-y-2">
          <Label htmlFor="driveLink">Google Drive Link</Label>
          <Input
            id="driveLink"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="Paste the Google Drive link here"
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Contribution"}
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

export default ContributeForm;
