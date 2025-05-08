
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

export interface SubjectProps {
  id: string;
  name: string;
  description: string;
  materialsCount: number;
  lastUpdated: string;
  image?: string;
}

const SubjectCard: React.FC<{ subject: SubjectProps; delay?: number }> = ({ 
  subject,
  delay = 0
}) => {
  const delayClass = delay ? `delay-${delay}` : "";
  
  return (
    <Link to={`/subjects/${subject.id}`}>
      <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer animate-delayed ${delayClass}`}>
        <div className="h-32 bg-gradient-to-r from-studyvault-accent2 to-studyvault-primary flex items-center justify-center">
          {subject.image ? (
            <img 
              src={subject.image} 
              alt={subject.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Book className="h-12 w-12 text-white" />
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg mb-2">{subject.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{subject.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-gray-500 pt-0">
          <span>{subject.materialsCount} materials</span>
          <span>Updated {subject.lastUpdated}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SubjectCard;
