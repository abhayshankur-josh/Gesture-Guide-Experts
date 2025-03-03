import React, { useState } from 'react';
import { FieldProps } from 'formik';

interface FileInputProps extends FieldProps {
  label: string;
  accept?: string;
  previewType?: 'image' | 'video';
}

const FileInput: React.FC<FileInputProps> = ({
  field,
  form,
  label,
  accept,
  previewType
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    
    if (!file) {
      form.setFieldValue(field.name, null);
      setPreview(null);
      setFileName(null);
      return;
    }
    
    form.setFieldValue(field.name, file);
    setFileName(file.name);
    
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

  const clearFile = () => {
    form.setFieldValue(field.name, null);
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className="file-input-container" style={{ marginBottom: '20px' }}>
      <div className="file-input-label" style={{ marginBottom: '8px' }}>{label}</div>
      
      <div className="file-input-wrapper">
        <input
          type="file"
          id={field.name}
          name={field.name}
          accept={accept}
          onChange={handleChange}
          className="file-input"
        />
      </div>
      
      {/* Display validation error */}
      {form.errors[field.name] && form.touched[field.name] && (
        <div className="error-message" style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px' }}>
          {form.errors[field.name] as string}
        </div>
      )}
      
      {fileName && (
        <div className="file-name" style={{ marginTop: '8px' }}>
          {fileName}
          <button 
            type="button"
            onClick={clearFile}
            className="clear-button"
            style={{ marginLeft: '10px', cursor: 'pointer', background: 'none', border: 'none', color: '#666' }}
          >
            ✕
          </button>
        </div>
      )}
      
      {preview && (
        <div className="preview-container" style={{ marginTop: '10px', position: 'relative' }}>
          {previewType === 'image' ? (
            <img 
              src={preview} 
              alt="Preview" 
              style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }}
            />
          ) : (
            <video 
              src={preview} 
              controls 
              style={{ maxHeight: '160px', maxWidth: '100%' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileInput;