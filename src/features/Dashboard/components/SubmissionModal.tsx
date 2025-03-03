import React from 'react';
import { Formik, Form, Field, ErrorMessage }
from 'formik';import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Grid,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import FileInput from './FileInput';
// import FileInput from './FileField';

// Initial values
const initialValues: IFormValues = {
    title: '',
    description: '',
};

// Validation schema
const validationSchema = Yup.object({
    title: Yup.string()
    .required('Title is required')
    .max(100, 'Title must be less than 100 characters'),
    description: Yup.string()
    .required('Description is required')
    .max(500, 'Description must be less than 500 characters'),
    videoFile: Yup.mixed<File>()
    .required('Video file is required')
    .test(
        'fileFormat',
        'Unsupported video format',
        (value) => {
        if (!value) return false;
        return ['video/mp4', 'video/webm', 'video/ogg'].includes(value.type);
        }
    )
    .test(
        'fileSize',
        'File too large, max size is 100MB',
        (value) => {
        if (!value) return false;
        return value.size <= 100 * 1024 * 1024; // 100MB
        }
    ),
    videoThumbnail: Yup.mixed<File>()
    .required('Thumbnail is required')
    .test(
        'fileFormat',
        'Unsupported image format',
        (value) => {
        if (!value) return false;
        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
        }
    )
    .test(
        'fileSize',
        'File too large, max size is 5MB',
        (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024; // 5MB
        }
    ),
});

const SubmissionModal: React.FC<ISubmissionModalProps> = ({isOpen, submitting, handleSubmit, handleClose}) => {
  
  return (
    <>    
      <Dialog
        open={isOpen}
        onClose={submitting ? undefined : handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Upload Sign Submission
          <IconButton
            aria-label="close"
            onClick={handleClose}
            disabled={submitting}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty }) => (
            <Form>
              <DialogContent>
                <DialogContentText sx={{ mb: 3 }}>
                  Please fill out the form below to upload your sign submission. All fields are required.
                </DialogContentText>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="title"
                      label="Title"
                      variant="outlined"
                      helperText={<ErrorMessage name="title" />}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      helperText={<ErrorMessage name="description" />}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Video File (MP4, WebM, Ogg)
                    </Typography>
                    <Field
                      name="videoFile"
                      component={FileInput}
                      label="Upload Video"
                      accept="video/*"
                      icon={VideoFileIcon}
                      previewType="video"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Video Thumbnail (JPEG, PNG)
                    </Typography>
                    <Field
                      name="videoThumbnail"
                      component={FileInput}
                      label="Upload Thumbnail"
                      accept="image/*"
                      icon={ImageIcon}
                      previewType="image"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button 
                  onClick={handleClose}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={submitting ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                  disabled={submitting || !isValid || !dirty}
                >
                  {submitting ? 'Uploading...' : 'Upload'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default SubmissionModal;