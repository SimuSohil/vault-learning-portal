
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search subjects..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full md:max-w-lg mx-auto animate-fade-in"
    >
      <div className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-20 py-6 rounded-r-none shadow-sm"
            placeholder={placeholder}
          />
        </div>
        <Button 
          type="submit" 
          className="bg-studyvault-primary hover:bg-studyvault-secondary shrink-0 rounded-l-none"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
