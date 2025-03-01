
import React, { useEffect, useState } from 'react';
import DashboardComponent from '../components/DashboardComponent';
import SidebarContainer from '../../Sidebar/containers';
import { FormikHelpers } from 'formik';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubmissionModal from '../components/SubmissionModal';
import { useCreateSubmissionMutation } from '../../Approval/api';
import { AppRootState } from '../../../store/store';
import { useAppSelector } from '../../../store/storeHooks';

interface DashboardStats {
  submissions: number;
  signs: number;
  pendingApprovals: number;
  completedTasks: number;
}

const DashboardContainer: React.FC = () => {
  // SubmissionModal logic start -->
  const profile = useAppSelector((state: AppRootState) => state.profileSlice);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setOpen(true);
  };

  const handleCloseModal = (): void => {
    setOpen(false);
  };

  const [ createSubmission ] = useCreateSubmissionMutation();

  const handleSubmitModal = async (
    values: IFormValues, 
    { resetForm }: FormikHelpers<IFormValues>
  ): Promise<void> => {
    setSubmitting(true);
    
    // TODO: Unable to send file to rails server.
    try {
      // const req = {
      //   publisherEmail: profile.email,
      //   videoTitle: values.title,
      //   videoDescription: values.description,
      //   thumbnailFile: values.videoThumbnail,
      //   videoFile: values.videoFile,
      // };
      // console.log(req)


      const formData = new FormData();
      formData.append('publisherEmail', profile.email);
      formData.append('videoTitle', values.title);
      formData.append('videoDescription', values.description);
      if (values.videoThumbnail) {
        console.log("in th")
        formData.append('thumbnailFile', values.videoThumbnail, values.videoThumbnail.name);
      }
      if (values.videoFile) {
        console.log("in fi")

        formData.append('videoFile', values.videoFile, values.videoFile.name);
      }
      console.log(formData)

      await createSubmission(formData).unwrap();
      
      // Reset form and close modal
      resetForm();
      setOpen(false);
      
      // You could show a success message here
    } catch (error) {
      console.error('Error submitting form:', error);
      // You could show an error message here
    } finally {
      setSubmitting(false);
    }
  };

  // DashboardComponent logic start -->
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
          // onRefresh={handleRefresh}
          // onCreateNew={handleCreateNew}
        />
        <Fab
          color="primary"
          aria-label="upload"
          sx={{ position: 'fixed', bottom: 20, right: 20 }}
          onClick={handleOpenModal}
        >
          <AddIcon />
        </Fab>
        <SubmissionModal 
          isOpen={isOpen}
          submitting={submitting}
          handleClose={handleCloseModal} 
          handleSubmit={handleSubmitModal} />
      </div>
    </div>
  );
};

export default DashboardContainer;
