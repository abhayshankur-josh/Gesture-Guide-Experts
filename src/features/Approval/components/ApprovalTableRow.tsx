import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Button } from 'react-bootstrap';
import PreviewVideoComponent from './PreviewVideo';
import RejectModalComponent from './RejectModalComponent';

interface ApprovalTableRowProps {
  submission: ISubmissionView | undefined;
  onApprove: (submissionId: string) => Promise<void>;
  onReject: (submissionId: string, reason?: string) => Promise<void>;
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
        await onApprove(submission.id.toString());
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
        await onReject(submission.id.toString(), rejectReason);
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


  // TODO: Redesign the view
  // return (
  //   <>
  //     <tr className={isExpanded ? 'table-active' : ''}>
  //       <td>
  //         <button 
  //           className="btn btn-sm btn-link text-decoration-none p-0"
  //           onClick={() => setIsExpanded(!isExpanded)}
  //         >
  //           <i className={`bi bi-chevron-${isExpanded ? 'down' : 'right'} me-1`}></i>
  //           {submission?.id}
  //         </button>
  //       </td>
  //       <td>{submission?.sign_title}</td>
  //       <td>{submission?.sign_id}</td>
  //       <td>{submission?.publisher_name}</td>
  //       <td>{formatDate(new Date(submission!.created_at))}</td>
  //       <td>
  //         {/* TODO: Status */}
  //         <StatusBadge status={'pending'} />
  //       </td>
  //       <td>
  //         {/* {submission.status === 'pending' && ( */}
  //         {(
  //           <div className="btn-group">
  //             <button 
  //               className="btn btn-sm btn-outline-success"
  //               onClick={handleApprove}
  //               disabled={isActioning}
  //             >
  //               <i className="bi bi-check-circle me-1"></i>
  //               Approve
  //             </button>
  //             <button 
  //               className="btn btn-sm btn-outline-danger"
  //               onClick={() => setShowRejectModal(true)}
  //               disabled={isActioning}
  //             >
  //               <i className="bi bi-x-circle me-1"></i>
  //               Reject
  //             </button>
  //           </div>
  //         )}
  //         {/* {submission.status !== 'pending' && ( */}
  //         {(
  //           <button className="btn btn-sm btn-outline-secondary" disabled>
  //             <i className="bi bi-lock me-1"></i>
  //             Processed
  //           </button>
  //         )}
  //       </td>
  //     </tr>
      
  //     {/* Expanded details row */}
  //     {isExpanded && (
  //       <tr>
  //         <td colSpan={7} className="border-0 pb-3">
  //           <div className="card">
  //             <div className="card-body">
  //               <div className="row">
  //                 <div className="col-md-6">
  //                   <h6 className="text-muted mb-3">Sign Details</h6>
  //                   <p className="mb-1"><strong>Title:</strong> {submission?.sign_id}</p>
  //                   <p className="mb-1"><strong>ID:</strong> {submission?.id}</p>
  //                   <p className="mb-3"><strong>Description:</strong> {submission?.sign_id}</p>
                    
  //                   <h6 className="text-muted mb-2">Submission Info</h6>
  //                   <p className="mb-1"><strong>Publisher:</strong> {submission?.sign_id}</p>
  //                   <p className="mb-1"><strong>Status:</strong> <StatusBadge status='pending' /></p>
  //                   <p className="mb-1"><strong>Submitted:</strong> {formatDate(new Date(submission!.created_at))}</p>
  //                 </div>submission.status === 'pending' &&
  //                 <div className="col-md-6">
  //                   <h6 className="text-muted mb-3">Video Preview</h6>
  //                   {/* {submission.videoPath ? (
  //                     <div className="ratio ratio-16x9">
  //                       <video controls>
  //                         <source src={submission.videoPath} type="video/mp4" />
  //                         Your browser does not support the video tag.
  //                       </video>
  //                     </div>
  //                   ) : ( */}
  //                   {(
  //                     <div className="alert alert-warning">
  //                       <i className="bi bi-exclamation-triangle me-2"></i>
  //                       Video not available
  //                     </div>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </td>
  //       </tr>
  //     )}

  //     {/* Reject Modal */}
  //     {showRejectModal && (
  //       <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
  //         <div className="modal-dialog">
  //           <div className="modal-content">
  //             <div className="modal-header">
  //               <h5 className="modal-title">Reject Submission</h5>
  //               <button 
  //                 type="button" 
  //                 className="btn-close" 
  //                 onClick={() => setShowRejectModal(false)}
  //                 disabled={isActioning}
  //               ></button>
  //             </div>
  //             <div className="modal-body">
  //               <p>Are you sure you want to reject this submission?</p>
  //               <div className="mb-3">
  //                 <label htmlFor="reject-reason" className="form-label">Reason (Optional)</label>
  //                 <textarea
  //                   id="reject-reason"
  //                   className="form-control"
  //                   rows={3}
  //                   value={rejectReason}
  //                   onChange={(e) => setRejectReason(e.target.value)}
  //                   placeholder="Provide a reason for rejection..."
  //                 ></textarea>
  //               </div>
  //             </div>
  //             <div className="modal-footer">
  //               <button 
  //                 type="button" 
  //                 className="btn btn-secondary"
  //                 onClick={() => setShowRejectModal(false)}
  //                 disabled={isActioning}
  //               >
  //                 Cancel
  //               </button>
  //               <button 
  //                 type="button" 
  //                 className="btn btn-danger"
  //                 onClick={handleReject}
  //                 disabled={isActioning}
  //               >
  //                 {isActioning ? (
  //                   <>
  //                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
  //                     Processing...
  //                   </>
  //                 ) : (
  //                   <>Confirm Rejection</>
  //                 )}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
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
            disabled={isActioning}
            title="Approve"
          >
            <i className="bi bi-check-circle"></i>
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => setShowRejectModal(true)}
            disabled={isActioning}
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