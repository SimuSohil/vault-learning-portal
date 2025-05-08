
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  type: string;
  subject: string;
  title: string;
  date: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center border-b border-gray-100 pb-3 last:border-b-0"
              >
                <div className="w-3 h-3 rounded-full bg-studyvault-primary mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.title}{" "}
                    <span className="font-normal text-gray-500">in {activity.subject}</span>
                  </p>
                  <p className="text-xs text-gray-400">{activity.date}</p>
                </div>
                <div className="rounded-full bg-studyvault-accent1 px-3 py-1 text-xs text-studyvault-secondary">
                  {activity.type}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activity.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
