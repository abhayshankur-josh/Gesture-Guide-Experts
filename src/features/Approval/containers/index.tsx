
import React, { useState } from 'react';
import ApprovalComponent from '../components/ApprovalComponent';
import { useActionSubmissionMutation, useSubmissionsViewQuery } from '../api';
import { IResponse } from '../../../constants/apiDataTypes';
import { useGetProfileQuery } from '../../Profile/api';

const ApprovalContainer: React.FC = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: submissions, isLoading: isLoadingSubmissions, refetch: refetchSubmissions } = useSubmissionsViewQuery();

  // const [submissions, setSubmissions] = useState<Submission[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IFilterOptions>({
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
  // const loadSubmissions = useCallback(async () => {
  //   // setLoading(true);
  //   setError(null);
    
  //   try {
            
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

  // // Initial load
  // useEffect(() => {
  //   loadSubmissions();
  // }, [loadSubmissions]);

  // Handle filter changes
  const handleFilterChange = (newFilters: IFilterOptions) => {
    setSearchTerm(''); // Clear search when applying filters
    setFilters(newFilters);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Action to handle approval and rejection.
  const [ action ] = useActionSubmissionMutation();
  const handleAction = async (submissionId: number, submissionStatus: TSubmissionStatus, rejectionReason?: string) => {
    if (submissions && !isLoadingSubmissions) {
      const record = submissions.find(submission => submission.id === submissionId);
      const requestBody: IActionSubmissionRequest = {
        submissionId: submissionId,
        approverId: profile!.id,
        signId: record!.sign_id,
        signStatus: submissionStatus,
        rejectionReason: rejectionReason
      }
      const response: IResponse = await action(requestBody).unwrap()
      response.message && alert(response.message)
      console.log(response.message || response.error)
    }
  }
  // Handle approval
  const handleApprove = async (submissionId: number) => {
    try {
      await handleAction(submissionId, 'approved');
    } catch (err) {
      setError('Failed to approve submission. Please try again.');
      console.error(err);
    }
  };

  // Handle rejection
  const handleReject = async (submissionId: number, reason?: string) => {
    try {
      await handleAction(submissionId, 'rejected', reason);
    } catch (err) {
      setError('Failed to reject submission. Please try again.');
      console.error(err);
    }
  };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  // Refresh data
  const refreshData = () => {
    // loadSubmissions();
    refetchSubmissions();
  };

  return (
    <ApprovalComponent 
      errorMessage={error}
      clearError={clearError}
      publishers={publishers}
      handleFilterChange={handleFilterChange}
      handleSearch={handleSearch}
      refreshData={refreshData}
      loading={isLoadingSubmissions}
      submissions={submissions}
      handleApprove={handleApprove}
      handleReject={handleReject}
    />
  );
};

export default ApprovalContainer;