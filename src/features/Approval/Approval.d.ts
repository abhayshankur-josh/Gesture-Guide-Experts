type TSubmissionStatus = 'pending' | 'approved' | 'rejected';

interface ISubmission {
  id: number;
  sign_id: number;
  submitted_by_id: number;
  approved_by_id: number | null;
  created_at: string;
  updated_at: string;
}

interface ISubmissionView {
  id: number;
  created_at: string;
  updated_at: string;
  approver_id: number | null;
  approver_name: string | null;
  publisher_id: number;
  publisher_name: string;
  sign_id: number;
  sign_title: string;
  sign_description: string;
  sign_status: TSubmissionStatus;
  video_id: number;
  video_path: string;
}


interface IFilterOptions {
  status: TSubmissionStatus | 'all';
  publisher: string | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface IApprovalAction {
  approve: (submissionId: string) => Promise<void>;
  reject: (submissionId: string, reason?: string) => Promise<void>;
}

interface IActionSubmissionRequest {
  submissionId: number;
  approverId: number;
  signId: number;
  signStatus: TSubmissionStatus;
  rejectionReason? :string;
}

interface ApprovalTableRowProps {
  submission: ISubmissionView | undefined;
  onApprove: (submissionId: number) => Promise<void>;
  onReject: (submissionId: number, reason?: string) => Promise<void>;
}
