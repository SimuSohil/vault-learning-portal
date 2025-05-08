
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SubjectTabs from "@/components/subjects/SubjectTabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MaterialProps } from "@/components/subjects/MaterialItem";

const SubjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock subject data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API fetch
    setTimeout(() => {
      // Get mock subject by ID
      const allSubjects = [
        {
          id: "math101",
          name: "Mathematics 101",
          description: "Introduction to basic mathematics concepts including algebra, geometry, and calculus fundamentals. This course provides a strong foundation for students pursuing degrees in science, engineering, or mathematics.",
          materialsCount: 12,
          lastUpdated: "2 days ago",
          image: "https://images.unsplash.com/photo-1635372722656-389fb7bd0823?q=80&w=2160&auto=format&fit=crop"
        },
        {
          id: "phys201",
          name: "Physics 201",
          description: "Advanced physics concepts covering quantum mechanics, relativity theory, and particle physics. Prerequisites include Physics 101 and Mathematics 201.",
          materialsCount: 8,
          lastUpdated: "1 week ago",
          image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=3174&auto=format&fit=crop"
        },
        // ... add other subjects here
      ];
      
      const foundSubject = allSubjects.find(s => s.id === id);
      
      if (foundSubject) {
        setSubject(foundSubject);
      } else {
        navigate("/subjects");
      }
      
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);

  // Mock materials data
  const materials = {
    lectures: [
      {
        id: "l1",
        title: "Introduction to the Course",
        type: "video",
        description: "First lecture introducing the course structure and key concepts",
        uploadDate: "Jan 15, 2023",
        downloadUrl: "#",
        previewUrl: "#"
      },
      {
        id: "l2",
        title: "Week 2 Lecture: Core Principles",
        type: "video",
        description: "Detailed explanation of the core principles and formulas",
        uploadDate: "Jan 22, 2023",
        fileSize: "250 MB",
        downloadUrl: "#",
        previewUrl: "#"
      },
      {
        id: "l3",
        title: "Week 3 Lecture: Advanced Concepts",
        type: "video",
        description: "Exploring more advanced concepts and their applications",
        uploadDate: "Jan 29, 2023",
        fileSize: "275 MB",
        downloadUrl: "#"
      }
    ] as MaterialProps[],
    
    pdfs: [
      {
        id: "p1",
        title: "Course Textbook Chapter 1-3",
        type: "pdf",
        description: "Complete course textbook covering the first three chapters",
        uploadDate: "Jan 10, 2023",
        fileSize: "15 MB",
        downloadUrl: "#",
        previewUrl: "#"
      },
      {
        id: "p2",
        title: "Formula Sheet",
        type: "pdf",
        description: "Comprehensive formula sheet for quick reference",
        uploadDate: "Jan 12, 2023",
        fileSize: "2 MB",
        downloadUrl: "#",
        previewUrl: "#"
      },
      {
        id: "p3",
        title: "Study Guide",
        type: "pdf",
        description: "Study guide with practice problems and example solutions",
        uploadDate: "Feb 5, 2023",
        fileSize: "8 MB",
        downloadUrl: "#",
        previewUrl: "#"
      }
    ] as MaterialProps[],
    
    assignments: [
      {
        id: "a1",
        title: "Assignment 1: Fundamentals",
        type: "assignment",
        description: "First assignment covering fundamental concepts from weeks 1-2",
        uploadDate: "Jan 20, 2023",
        fileSize: "1.5 MB",
        downloadUrl: "#"
      },
      {
        id: "a2",
        title: "Assignment 2: Applications",
        type: "assignment",
        description: "Second assignment focusing on practical applications",
        uploadDate: "Feb 10, 2023",
        fileSize: "2.2 MB",
        downloadUrl: "#"
      }
    ] as MaterialProps[]
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {subject && (
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
          
          <div className="relative mb-10">
            <div className="h-48 md:h-64 w-full rounded-lg overflow-hidden">
              {subject.image ? (
                <img 
                  src={subject.image} 
                  alt={subject.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-studyvault-accent2 to-studyvault-primary"></div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{subject.name}</h1>
                <p className="text-white text-opacity-90">{subject.materialsCount} materials • Last updated {subject.lastUpdated}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{subject.description}</p>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">Materials</h2>
          <SubjectTabs materials={materials} />
        </div>
      )}
    </Layout>
  );
};

export default SubjectView;
