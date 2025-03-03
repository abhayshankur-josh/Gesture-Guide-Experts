
// Define form values interface
interface IFormValues {
    title: string;
    description: string;
    videoFile?: File;
    videoThumbnail?: File;
}
  
// File input props interface
interface IFileInputProps {
    field: {
        name: string;
        value: File | null;
        onChange: (e: React.ChangeEvent<any>) => void;
        onBlur: (e: React.FocusEvent<any>) => void;
    };
    form: {
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
        setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
        errors: Record<string, string>;
        touched: Record<string, boolean>;
    };
    label: string;
    accept: string;
    icon: React.ElementType;
    previewType: 'image' | 'video';
}

// Submission Modal props interface
interface ISubmissionModalProps {
    isOpen: boolean;
    submitting: boolean;
    handleSubmit: ( 
        values: IFormValues, 
        { resetForm }: FormikHelpers<IFormValues>
    )=>Promise<void>;
    handleClose: ()=>void;
}

// Dashboard Stats interface
interface IDashboardStats {
  submissions: number;
  signs: number;
  pendingApprovals: number;
  completedTasks: number;
}

// Dashboard Component props interface
interface IDashboardComponentProps {
  stats: IDashboardStats;
  isLoading: boolean;
  recentActivity: ISubmissionView[] | ISubmission[];
  isRecentLoading: boolean;
}