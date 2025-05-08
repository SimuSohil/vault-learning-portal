
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface SubjectFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    image?: string;
  };
  onSubmit: (data: { name: string; description: string; image?: string }) => void;
  isLoading: boolean;
  buttonText: string;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  initialData = { name: "", description: "" },
  onSubmit,
  isLoading,
  buttonText
}) => {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialData.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd handle the image upload here
    // For demo purposes, we'll just pass the image preview URL
    onSubmit({
      name,
      description,
      image: previewUrl
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">Subject Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter subject name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter subject description"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Subject Image</Label>
        {!previewUrl ? (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">Upload a cover image for this subject</p>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Label 
              htmlFor="image" 
              className="bg-studyvault-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-studyvault-secondary"
            >
              Choose Image
            </Label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Subject cover"
              className="w-full h-40 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="bg-studyvault-primary hover:bg-studyvault-secondary w-full"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : buttonText}
      </Button>
    </form>
  );
};

export default SubjectForm;
