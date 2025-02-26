
import React, { useEffect, useState } from 'react';
import DashboardComponent from '../components/DashboardComponent';
import SidebarContainer from '../../Sidebar/containers';

interface DashboardStats {
  submissions: number;
  signs: number;
  pendingApprovals: number;
  completedTasks: number;
}

const DashboardContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<DashboardStats>({
    submissions: 0,
    signs: 0,
    pendingApprovals: 0,
    completedTasks: 0
  });

  // Simulating API call to fetch dashboard stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await apiService.getDashboardStats();
        
        // Simulating API delay
        setTimeout(() => {
          setStats({
            submissions: 245,
            signs: 182,
            pendingApprovals: 32,
            completedTasks: 156
          });
          setIsLoading(false);
        }, 1200);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    // Re-fetch the data
    setTimeout(() => {
      setStats({
        submissions: Math.floor(Math.random() * 300) + 200,
        signs: Math.floor(Math.random() * 200) + 150,
        pendingApprovals: Math.floor(Math.random() * 50) + 10,
        completedTasks: Math.floor(Math.random() * 200) + 100
      });
      setIsLoading(false);
    }, 800);
  };

  const handleCreateNew = () => {
    alert('Create new document/submission modal would open here');
    // In a real app, you might open a modal or navigate to a creation page
  };

  return (
    <div className="d-flex">
      <SidebarContainer />
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <DashboardComponent
          stats={stats}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          onCreateNew={handleCreateNew}
        />
      </div>
    </div>
  );
};

export default DashboardContainer;
