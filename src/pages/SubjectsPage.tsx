
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SubjectCard, { SubjectProps } from "@/components/dashboard/SubjectCard";
import SearchBar from "@/components/dashboard/SearchBar";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock subjects data
  const allSubjects: SubjectProps[] = [
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
    },
    {
      id: "hist301",
      name: "History 301",
      description: "Advanced study of world history, examining key events, figures, and sociopolitical movements.",
      materialsCount: 14,
      lastUpdated: "4 days ago",
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2974&auto=format&fit=crop"
    },
    {
      id: "psych101",
      name: "Psychology 101",
      description: "Introduction to the study of human behavior, cognitive processes, and psychological theories.",
      materialsCount: 9,
      lastUpdated: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=2952&auto=format&fit=crop"
    },
    {
      id: "econ202",
      name: "Economics 202",
      description: "Intermediate economics covering microeconomic theory, market structures, and economic policy.",
      materialsCount: 11,
      lastUpdated: "6 days ago",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2970&auto=format&fit=crop"
    }
  ];

  // Filter subjects based on search query
  const filteredSubjects = searchQuery
    ? allSubjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSubjects;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold text-studyvault-dark mb-4">
            All Subjects
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse our comprehensive collection of subjects and find the materials you need
          </p>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search by subject name or keywords..."
          />
        </div>

        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((subject, index) => (
              <SubjectCard 
                key={subject.id} 
                subject={subject}
                delay={(index % 4) + 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">
              No subjects found matching "{searchQuery}". Please try another search term.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubjectsPage;
