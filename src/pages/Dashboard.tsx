
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/dashboard/SearchBar";
import SubjectCard, { SubjectProps } from "@/components/dashboard/SubjectCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // Mock subjects data
  const subjects: SubjectProps[] = [
    {
      id: "math101",
      name: "Mathematics 101",
      description: "Introduction to basic mathematics concepts including algebra, geometry, and calculus fundamentals.",
      materialsCount: 12,
      lastUpdated: "2 days ago",
      image: "https://images.unsplash.com/photo-1635372722656-389fb7bd0823?q=80&w=2160&auto=format&fit=crop"
    },
    {
      id: "phys201",
      name: "Physics 201",
      description: "Advanced physics concepts covering quantum mechanics, relativity theory, and particle physics.",
      materialsCount: 8,
      lastUpdated: "1 week ago",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=3174&auto=format&fit=crop"
    },
    {
      id: "chem101",
      name: "Chemistry 101",
      description: "Introduction to chemistry and chemical reactions, covering atomic structure and periodic table basics.",
      materialsCount: 15,
      lastUpdated: "3 days ago",
      image: "https://images.unsplash.com/photo-1616661636564-6eddc3854226?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: "bio202",
      name: "Biology 202",
      description: "Intermediate biology course focusing on cellular processes, genetics, and evolutionary concepts.",
      materialsCount: 10,
      lastUpdated: "5 days ago",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2787&auto=format&fit=crop"
    },
    {
      id: "cs101",
      name: "Computer Science 101",
      description: "Introduction to programming fundamentals, algorithms, and data structures.",
      materialsCount: 18,
      lastUpdated: "1 day ago",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop"
    },
    {
      id: "eng201",
      name: "English Literature",
      description: "Exploration of classic and contemporary literature, critical analysis, and writing techniques.",
      materialsCount: 7,
      lastUpdated: "1 week ago",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2970&auto=format&fit=crop"
    }
  ];

  // Mock recent activity data
  const activities = [
    {
      id: "1",
      type: "Download",
      subject: "Physics 201",
      title: "Week 3 Lecture Notes",
      date: "Today"
    },
    {
      id: "2",
      type: "View",
      subject: "Mathematics 101",
      title: "Practice Problems PDF",
      date: "Yesterday"
    },
    {
      id: "3",
      type: "Contribution",
      subject: "Chemistry 101",
      title: "Lab Report Template",
      date: "3 days ago"
    }
  ];

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // In a real app, this would filter subjects or navigate to search results
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-studyvault-dark mb-4">
            Welcome to Study Vault
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your central hub for accessing and sharing educational materials across various subjects
          </p>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-studyvault-dark">
                Available Subjects
              </h2>
              <Button 
                variant="outline" 
                onClick={() => navigate("/subjects")}
                className="border-studyvault-primary text-studyvault-primary hover:bg-studyvault-accent1"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject}
                  delay={(index % 4) + 1} 
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-studyvault-dark mb-6">
              Recent Activity
            </h2>
            <RecentActivity activities={activities} />
            
            <div className="bg-studyvault-accent1 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-studyvault-secondary mb-2">Have study materials to share?</h3>
              <p className="text-gray-600 text-sm mb-4">Help your peers by contributing your notes, assignments, or lecture recordings.</p>
              <Button 
                onClick={() => navigate("/contribute")}
                className="w-full bg-studyvault-primary hover:bg-studyvault-secondary"
              >
                Contribute Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
