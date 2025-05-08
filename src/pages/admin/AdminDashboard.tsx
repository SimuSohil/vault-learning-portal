
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, FileText, Calendar } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "admin") {
        setUser(parsedUser);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
  
  // Mock statistics data
  const stats = {
    totalSubjects: 9,
    totalUsers: 124,
    totalMaterials: 217,
    newUploads: 17
  };
  
  // Mock recent activity data
  const recentActivity = [
    {
      id: "1",
      type: "material_upload",
      user: "admin@study.com",
      subject: "Physics 201",
      title: "Week 4 Lecture",
      date: "2 hours ago"
    },
    {
      id: "2",
      type: "new_subject",
      user: "admin@study.com",
      subject: "History 301",
      title: "",
      date: "1 day ago"
    },
    {
      id: "3",
      type: "contribution_approved",
      user: "student@study.com",
      subject: "Chemistry 101",
      title: "Lab Report Template",
      date: "2 days ago"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-studyvault-dark mb-8">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Subjects</CardTitle>
              <Book className="h-5 w-5 text-studyvault-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalSubjects}</div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-500">+2</span> new this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Users</CardTitle>
              <Users className="h-5 w-5 text-studyvault-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-500">+15</span> new this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Study Materials</CardTitle>
              <FileText className="h-5 w-5 text-studyvault-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalMaterials}</div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-500">+34</span> new this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Recent Uploads</CardTitle>
              <Calendar className="h-5 w-5 text-studyvault-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.newUploads}</div>
              <p className="text-xs text-gray-500 mt-1">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start">
                    <div className="mr-4">
                      {activity.type === "material_upload" ? (
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                      ) : activity.type === "new_subject" ? (
                        <div className="bg-green-100 p-2 rounded-full">
                          <Book className="h-5 w-5 text-green-500" />
                        </div>
                      ) : (
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-purple-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {activity.type === "material_upload"
                          ? "New material uploaded"
                          : activity.type === "new_subject"
                          ? "New subject created"
                          : "Contribution approved"}
                      </p>
                      <div className="text-sm text-gray-500">
                        {activity.type !== "new_subject" && (
                          <span>{activity.title} in </span>
                        )}
                        <span className="font-medium text-studyvault-secondary">{activity.subject}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <span>{activity.date}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button 
                  className="w-full p-4 rounded-lg bg-studyvault-accent1 hover:bg-studyvault-accent1/80 text-left"
                  onClick={() => navigate("/admin/subjects/new")}
                >
                  <h3 className="font-semibold text-studyvault-secondary">Add New Subject</h3>
                  <p className="text-sm text-gray-600">Create a new subject category</p>
                </button>
                
                <button 
                  className="w-full p-4 rounded-lg bg-studyvault-accent1 hover:bg-studyvault-accent1/80 text-left"
                  onClick={() => navigate("/admin/uploads/new")}
                >
                  <h3 className="font-semibold text-studyvault-secondary">Upload Materials</h3>
                  <p className="text-sm text-gray-600">Add new study materials</p>
                </button>
                
                <button 
                  className="w-full p-4 rounded-lg bg-studyvault-accent1 hover:bg-studyvault-accent1/80 text-left"
                  onClick={() => navigate("/admin/users")}
                >
                  <h3 className="font-semibold text-studyvault-secondary">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and edit user permissions</p>
                </button>
                
                <button 
                  className="w-full p-4 rounded-lg bg-gray-100 hover:bg-gray-100/80 text-left"
                  onClick={() => navigate("/admin/contributions")}
                >
                  <h3 className="font-semibold text-gray-700">Review Contributions</h3>
                  <p className="text-sm text-gray-600">Approve or decline student contributions</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
