export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

// export interface Submission {
//   submissionId: string;
//   signTitle: string;
//   signDescription: string;
//   videoPath: string;
//   signId: string;
//   publisher: string;
//   status: SubmissionStatus;
//   createdAt: Date;
// }

export interface Submission {
  id: number;
  sign_id: number;
  submitted_by_id: number;
  approved_by_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface SubmissionView {
  id: number;
  created_at: string;
  updated_at: string;
  approver_id: number | null;
  approver_name: string | null;
  publisher_id: number;
  publisher_name: string;
  sign_id: number;
  sign_title: string;
  video_id: number;
  video_path: string;
}


export interface FilterOptions {
  status: SubmissionStatus | 'all';
  publisher: string | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface ApprovalAction {
  approve: (submissionId: string) => Promise<void>;
  reject: (submissionId: string, reason?: string) => Promise<void>;
}
