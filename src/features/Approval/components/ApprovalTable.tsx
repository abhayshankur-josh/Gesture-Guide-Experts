import React from 'react';
import ApprovalTableRow from './ApprovalTableRow';

interface ApprovalTableProps {
  submissions: ISubmissionView[] | undefined;
  loading: boolean;
  onApprove: (submissionId: number) => Promise<void>;
  onReject: (submissionId: number, reason?: string) => Promise<void>;
}

const ApprovalTable: React.FC<ApprovalTableProps> = ({ 
  submissions, 
  loading, 
  onApprove, 
  onReject 
}) => {
  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading submissions...</p>
      </div>
    );
  }

  if (submissions?.length === 0) {
    return (
      <div className="text-center p-5 bg-light rounded">
        <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
        <h5 className="mt-3">No submissions found</h5>
        <p className="text-muted">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Submission ID</th>
            <th>Sign Title</th>
            <th>Sign ID</th>
            <th>Publisher</th>
            <th>Created</th>
            <th>Status</th>
            <th>Video Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map(submission => (
            <ApprovalTableRow
              key={submission.id}
              submission={submission}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalTable;
