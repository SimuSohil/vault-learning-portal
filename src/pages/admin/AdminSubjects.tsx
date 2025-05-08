
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Subject {
  id: string;
  name: string;
  description: string;
  materialsCount: number;
  lastUpdated: string;
}

const AdminSubjects: React.FC = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || JSON.parse(storedUser).role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch subjects - in a real app, this would be from an API
  useEffect(() => {
    // Mock data
    const mockSubjects: Subject[] = [
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
      },
      {
        id: "bio202",
        name: "Biology 202",
        description: "Intermediate biology focusing on cellular processes",
        materialsCount: 10,
        lastUpdated: "5 days ago"
      },
      {
        id: "cs101",
        name: "Computer Science 101",
        description: "Introduction to programming fundamentals",
        materialsCount: 18,
        lastUpdated: "1 day ago"
      },
      {
        id: "eng201",
        name: "English Literature",
        description: "Exploration of classic and contemporary literature",
        materialsCount: 7,
        lastUpdated: "1 week ago"
      },
      {
        id: "hist301",
        name: "History 301",
        description: "Advanced study of world history",
        materialsCount: 14,
        lastUpdated: "4 days ago"
      },
      {
        id: "psych101",
        name: "Psychology 101",
        description: "Introduction to psychological theories",
        materialsCount: 9,
        lastUpdated: "2 weeks ago"
      },
      {
        id: "econ202",
        name: "Economics 202",
        description: "Intermediate microeconomic theory",
        materialsCount: 11,
        lastUpdated: "6 days ago"
      }
    ];
    
    setTimeout(() => {
      setSubjects(mockSubjects);
      setFilteredSubjects(mockSubjects);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter subjects when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = subjects.filter(subject => 
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [searchQuery, subjects]);

  const handleEdit = (id: string) => {
    navigate(`/admin/subjects/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the subject
    toast.success("Subject deleted successfully");
    setSubjects(subjects.filter(subject => subject.id !== id));
    setFilteredSubjects(filteredSubjects.filter(subject => subject.id !== id));
  };

  const handleMaterials = (id: string) => {
    navigate(`/admin/subjects/${id}/materials`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-studyvault-dark mb-4 md:mb-0">
            Manage Subjects
          </h1>
          <Button 
            onClick={() => navigate("/admin/subjects/new")}
            className="bg-studyvault-primary hover:bg-studyvault-secondary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Subject
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search subjects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="p-8 text-center">
              <p>Loading subjects...</p>
            </div>
          ) : filteredSubjects.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Materials</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {subject.description}
                      </TableCell>
                      <TableCell>{subject.materialsCount}</TableCell>
                      <TableCell>{subject.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleMaterials(subject.id)}
                                >
                                  <FileText className="h-4 w-4 text-gray-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Manage Materials</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleEdit(subject.id)}
                                >
                                  <Edit className="h-4 w-4 text-gray-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Subject</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDelete(subject.id)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Subject</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                No subjects found matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminSubjects;
