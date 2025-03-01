import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Button } from 'react-bootstrap';
import PreviewVideoComponent from './PreviewVideo';
import RejectModalComponent from './RejectModalComponent';

interface ApprovalTableRowProps {
  submission: ISubmissionView | undefined;
  onApprove: (submissionId: number) => Promise<void>;
  onReject: (submissionId: number, reason?: string) => Promise<void>;
}

const ApprovalTableRow: React.FC<ApprovalTableRowProps> = ({ 
  submission, 
  onApprove, 
  onReject 
}) => {
  const [isActioning, setIsActioning] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = async () => {
    try {
      setIsActioning(true);
      if (submission !== undefined && submission !== null) {
        await onApprove(submission.id);
      } else {
        console.error("Submission is undefined or null");
      }      
    } finally {
      setIsActioning(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsActioning(true);
      if (submission !== undefined && submission !== null) {
        await onReject(submission.id, rejectReason);
      } else {
        console.error("Submission is undefined or null");
      }    
      setRejectReason('');
      setShowRejectModal(false);
    } finally {
      setIsActioning(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  
  const [show, setShow] = useState(false);
  const [videoPath, setVideoPath] = useState('');

  const handleClose = () => setShow(false);
  function handleShow(videoPath: string | undefined) {
    setShow(true);
    videoPath && setVideoPath(videoPath);
  }


  return (
    <>
    {/* <tr className={submission?.status === 'pending' ? 'table-active' : ''}> */}
    <tr className={'table-active'}>
      <td>{submission?.id || 'ID '}</td>
      <td>{submission?.sign_title || 'Title'}</td>
      <td>{submission?.sign_id}</td>
      <td>{submission?.publisher_name}</td>
      <td>{formatDate(new Date(submission!.created_at))}</td>
      <td>
        {submission?.sign_status && <StatusBadge status={submission?.sign_status} />}
      </td>
      <td>
        <Button variant="info" onClick={()=> handleShow(submission?.video_path)} >
          {submission?.video_path ? 'Watch Video' : 'No Video'}
        </Button>
        <PreviewVideoComponent show={show} handleClose={handleClose} videoPath={videoPath}/>
      </td>
      <td>
        <div className="btn-group">
          <button 
            className="btn btn-sm btn-outline-success"
            onClick={handleApprove}
            disabled={isActioning || (submission?.sign_status == 'approved')}
            title="Approve"
          >
            <i className="bi bi-check-circle"></i>
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => setShowRejectModal(true)}
            disabled={isActioning || (submission?.sign_status == 'rejected')}
            title="Reject"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      </td>
    </tr>
    {/* Reject Modal */}
    {
      showRejectModal && 
        <RejectModalComponent 
          isActioning={isActioning} 
          setShowRejectModal={setShowRejectModal} 
          rejectReason={rejectReason} 
          setRejectReason={setRejectReason} 
          handleReject={handleReject} 
        />}
    </>
  );
  
};

export default ApprovalTableRow;