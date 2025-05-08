
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialItem, { MaterialProps } from "./MaterialItem";

interface SubjectTabsProps {
  materials: {
    lectures: MaterialProps[];
    pdfs: MaterialProps[];
    assignments: MaterialProps[];
  };
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ materials }) => {
  const [activeTab, setActiveTab] = useState("lectures");

  return (
    <Tabs defaultValue="lectures" className="w-full animate-fade-in" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="lectures" className="data-[state=active]:bg-studyvault-primary data-[state=active]:text-white">
          Lectures
          <span className="ml-2 text-xs rounded-full bg-gray-100 text-gray-600 px-2 py-0.5">
            {materials.lectures.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="pdfs" className="data-[state=active]:bg-studyvault-primary data-[state=active]:text-white">
          PDFs
          <span className="ml-2 text-xs rounded-full bg-gray-100 text-gray-600 px-2 py-0.5">
            {materials.pdfs.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="assignments" className="data-[state=active]:bg-studyvault-primary data-[state=active]:text-white">
          Assignments
          <span className="ml-2 text-xs rounded-full bg-gray-100 text-gray-600 px-2 py-0.5">
            {materials.assignments.length}
          </span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="lectures" className="mt-0">
        {materials.lectures.length > 0 ? (
          materials.lectures.map((material) => (
            <MaterialItem key={material.id} material={material} />
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No lecture materials available yet.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="pdfs" className="mt-0">
        {materials.pdfs.length > 0 ? (
          materials.pdfs.map((material) => (
            <MaterialItem key={material.id} material={material} />
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No PDF materials available yet.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="assignments" className="mt-0">
        {materials.assignments.length > 0 ? (
          materials.assignments.map((material) => (
            <MaterialItem key={material.id} material={material} />
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No assignment materials available yet.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default SubjectTabs;
