
import {
    Button,
    Box,
    Typography,
    IconButton,
    Card,
    CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorMessage } from 'formik';
import { useState } from 'react';

// File input component
const FileInput: React.FC<IFileInputProps> = ({ 
    field, 
    form, 
    label, 
    accept, 
    icon: Icon, 
    previewType 
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (!file) return;
        
        form.setFieldValue(field.name, file);
        
        // Generate preview
        if (previewType === 'image' && file) {
            const reader = new FileReader();
            reader.onload = () => {
            setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else if (previewType === 'video' && file) {
            setPreview(URL.createObjectURL(file));
        }
    };
    
    return (
    <Box sx={{ mb: 3, mt: 1 }}>
        <input
        accept={accept}
        style={{ display: 'none' }}
        id={field.name}
        type="file"
        onChange={handleChange}
        />
        <label htmlFor={field.name}>
        <Button
            variant="outlined"
            component="span"
            startIcon={<Icon />}
            fullWidth
            sx={{ mb: 1 }}
        >
            {label}
        </Button>
        </label>
        
        <ErrorMessage
        name={field.name}
        component={Typography}
        // sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}
        />
        
        {preview && (
        <Card sx={{ mt: 2, position: 'relative' }}>
            {previewType === 'image' ? (
            <CardMedia
                component="img"
                image={preview}
                sx={{ height: 140, objectFit: 'cover' }}
                alt="Thumbnail preview"
            />
            ) : (
            <CardMedia
                component="video"
                src={preview}
                sx={{ height: 160 }}
                controls
            />
            )}
            <IconButton
            size="small"
            sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
            }}
            onClick={() => {
                setPreview(null);
                form.setFieldValue(field.name, null);
            }}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </Card>
        )}
    </Box>
    );
};

export default FileInput;