import React, { useState } from 'react';
import { FilterOptions } from '../types/approvalTypes';
// import { fetchSubmissions, searchSubmissions, updateSubmissionStatus } from '../services/approvalService';
import SidebarContainer from '../../Sidebar/containers';
import ApprovalComponent from '../components/ApprovalComponent';
import { useSubmissionsQuery, useSubmissionsViewQuery } from '../api';

const ApprovalContainer: React.FC = () => {
  // const [submissions, setSubmissions] = useState<Submission[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    publisher: null,
    dateRange: {
      start: null,
      end: null
    }
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [publishers, setPublishers] = useState<string[]>([]);

  // Fetch submissions based on filters or search term
  
  const { data, isLoading } = useSubmissionsViewQuery();
  // const [ submissions, { isLoading }] = useSubmissionsQuery();
  
  // const loadSubmissions = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
    
  //   try {
  //     let data: Submission[];
      
  //     if (searchTerm) {
  //       data = await searchSubmissions(searchTerm);
  //     } else {
  //       data = await fetchSubmissions(filters);
  //     }
      
  //     setSubmissions(data);
      
  //     // Extract unique publishers for filter dropdown
  //     const uniquePublishers = Array.from(
  //       new Set(data.map(item => item.publisher))
  //     ).sort();
      
  //     setPublishers(uniquePublishers);
  //   } catch (err) {
  //     setError('Failed to load submissions. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [filters, searchTerm]);

  // Initial load
  // useEffect(() => {
  //   loadSubmissions();
  // }, [loadSubmissions]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setSearchTerm(''); // Clear search when applying filters
    setFilters(newFilters);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle approval
  const handleApprove = async (submissionId: string) => {
    try {
      // await updateSubmissionStatus(submissionId, 'approved');
      // Update local state
      // setSubmissions(prev => 
      //   prev.map(sub => 
      //     sub.submissionId === submissionId 
      //       ? { ...sub, status: 'approved' } 
      //       : sub
      //   )
      // );
    } catch (err) {
      setError('Failed to approve submission. Please try again.');
      console.error(err);
    }
  };

  // Handle rejection
  const handleReject = async (submissionId: string, reason?: string) => {
    try {
      // await updateSubmissionStatus(submissionId, 'rejected', reason);
      // Update local state
      // setSubmissions(prev => 
      //   prev.map(sub => 
      //     sub.submissionId === submissionId 
      //       ? { ...sub, status: 'rejected', rejectionReason: reason } 
      //       : sub
      //   )
      // );
    } catch (err) {
      setError('Failed to reject submission. Please try again.');
      console.error(err);
    }
  };

  // // Handle requesting changes
  // const handleRequestChanges = async (submissionId: string, comments: string) => {
  //   try {
  //     await updateSubmissionStatus(submissionId, 'approved', comments);
  //     // Update local state
  //     setSubmissions(prev => 
  //       prev.map(sub => 
  //         sub.submissionId === submissionId 
  //           ? { ...sub, status: 'approved', comments } 
  //           : sub
  //       )
  //     );
  //   } catch (err) {
  //     setError('Failed to request changes. Please try again.');
  //     console.error(err);
  //   }
  // };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  // Refresh data
  const refreshData = () => {
    // loadSubmissions();
  };

  return (
    <div className="d-flex">
      <SidebarContainer />
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <ApprovalComponent 
          errorMessage={error}
          clearError={clearError}
          publishers={publishers}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          refreshData={refreshData}
          loading={isLoading}
          submissions={data}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      </div>
    </div>
    
  );
};

export default ApprovalContainer;