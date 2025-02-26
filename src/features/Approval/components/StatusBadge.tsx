import React from 'react';
import { SubmissionStatus } from '../types/approvalTypes';

interface StatusBadgeProps {
  status: SubmissionStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let badgeClass = '';
  let iconClass = '';
  
  switch (status) {
    case 'pending':
      badgeClass = 'bg-warning text-dark';
      iconClass = 'bi-hourglass-split';
      break;
    case 'approved':
      badgeClass = 'bg-success';
      iconClass = 'bi-check-circle';
      break;
    case 'rejected':
      badgeClass = 'bg-danger';
      iconClass = 'bi-x-circle';
      break;
    default:
      badgeClass = 'bg-secondary';
      iconClass = 'bi-question-circle';
  }
  
  return (
    <span className={`badge ${badgeClass} d-flex align-items-center`}>
      <i className={`bi ${iconClass} me-1`}></i>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;