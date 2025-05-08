
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowLeft, Eye, Trash, Plus } from "lucide-react";
import MaterialUploadForm from "@/components/admin/MaterialUploadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Material {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  size: string;
}

const SubjectMaterials: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<any>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("materials");

  // Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || JSON.parse(storedUser).role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch subject and materials - in a real app, this would be from an API
  useEffect(() => {
    setIsLoading(true);
    
    // Mock data
    const mockSubject = {
      id,
      name: "Mathematics 101",
      description: "Introduction to basic mathematics concepts"
    };
    
    const mockMaterials = [
      {
        id: "m1",
        title: "Introduction to Calculus",
        type: "PDF",
        uploadDate: "Jan 15, 2023",
        size: "2.4 MB"
      },
      {
        id: "m2",
        title: "Algebra Fundamentals",
        type: "PDF",
        uploadDate: "Jan 22, 2023",
        size: "1.8 MB"
      },
      {
        id: "m3",
        title: "Geometry Basics Lecture",
        type: "Video",
        uploadDate: "Feb 5, 2023",
        size: "250 MB"
      },
      {
        id: "m4",
        title: "Practice Problems - Week 1",
        type: "Assignment",
        uploadDate: "Feb 10, 2023",
        size: "1.2 MB"
      },
      {
        id: "m5",
        title: "Trigonometry Overview",
        type: "PDF",
        uploadDate: "Feb 15, 2023",
        size: "3.5 MB"
      }
    ];
    
    setTimeout(() => {
      setSubject(mockSubject);
      setMaterials(mockMaterials);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = (materialId: string) => {
    // Mock deletion - in a real app, this would call an API to delete the material
    setMaterials(materials.filter(material => material.id !== materialId));
    toast.success("Material deleted successfully");
  };

  const handleUploadSuccess = () => {
    setActiveTab("materials");
    toast.success("Material uploaded successfully");
    // In a real app, we would refresh the materials list
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

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
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-studyvault-dark mb-4 md:mb-0">
            {subject.name} - Materials
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="materials" className="data-[state=active]:bg-studyvault-primary data-[state=active]:text-white">
              All Materials
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-studyvault-primary data-[state=active]:text-white">
              Upload New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Materials</CardTitle>
                  <Button 
                    onClick={() => setActiveTab("upload")}
                    className="bg-studyvault-primary hover:bg-studyvault-secondary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {materials.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {materials.map((material) => (
                          <TableRow key={material.id}>
                            <TableCell className="font-medium">{material.title}</TableCell>
                            <TableCell>{material.type}</TableCell>
                            <TableCell>{material.uploadDate}</TableCell>
                            <TableCell>{material.size}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4 text-gray-600" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDelete(material.id)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No materials available. Click "Add Material" to upload some.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Upload Material</CardTitle>
              </CardHeader>
              <CardContent>
                <MaterialUploadForm 
                  subjectId={id || ""} 
                  onSuccess={handleUploadSuccess} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SubjectMaterials;
