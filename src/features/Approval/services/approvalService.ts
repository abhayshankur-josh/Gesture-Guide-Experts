import { useSubmissionsQuery } from '../api';
import { Submission, FilterOptions, SubmissionStatus } from '../types/approvalTypes';

const API_URL = '/api/submissions'; // Replace with your actual API endpoint

export const fetchSubmissions = async (filters?: FilterOptions): Promise<Submission[]> => {
  try {
    // Building query parameters
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        queryParams.append('status', filters.status);
      }
      
      if (filters.publisher) {
        queryParams.append('publisher', filters.publisher);
      }
      
      if (filters.dateRange.start) {
        queryParams.append('startDate', filters.dateRange.start.toISOString());
      }
      
      if (filters.dateRange.end) {
        queryParams.append('endDate', filters.dateRange.end.toISOString());
      }
    }
    
    const url = `${API_URL}?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }));
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

// export const searchSubmissions = async (searchTerm: string): Promise<Submission[]> => {
//   try {
//     const url = `${API_URL}/search?term=${encodeURIComponent(searchTerm)}`;
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`Search failed: ${response.statusText}`);
//     }
    
//     const data = await response.json();
//     return data.map((item: any) => ({
//       ...item,
//       createdAt: new Date(item.createdAt)
//     }));
//   } catch (error) {
//     console.error('Error searching submissions:', error);
//     throw error;
//   }
// };

// export const updateSubmissionStatus = async (
//   submissionId: string, 
//   status: SubmissionStatus, 
//   reason?: string
// ): Promise<Submission> => {
//   try {
//     const response = await fetch(`${API_URL}/${submissionId}/status`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         status,
//         reason,
//       }),
//     });
    
//     if (!response.ok) {
//       throw new Error(`Failed to update status: ${response.statusText}`);
//     }
    
//     const updatedSubmission = await response.json();
//     return {
//       ...updatedSubmission,
//       createdAt: new Date(updatedSubmission.createdAt)
//     };
//   } catch (error) {
//     console.error('Error updating submission status:', error);
//     throw error;
//   }
// };
