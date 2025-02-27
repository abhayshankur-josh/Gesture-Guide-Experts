import React from "react";

interface RejectModalProps {
    isActioning: boolean;
    setShowRejectModal: (value: boolean)=>void;
    rejectReason: string | number | readonly string[] | undefined
    setRejectReason: (reason: string)=>void;
    handleReject: ()=>void;
}

const RejectModalComponent: React.FC<RejectModalProps> = ({isActioning, setShowRejectModal, rejectReason, setRejectReason, handleReject}) => {

    return(
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reject Submission</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowRejectModal(false)}
                disabled={isActioning}
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to reject this submission?</p>
              <div className="mb-3">
                <label htmlFor="reject-reason" className="form-label">Reason (Optional)</label>
                <textarea
                  id="reject-reason"
                  className="form-control"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide a reason for rejection..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowRejectModal(false)}
                disabled={isActioning}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={handleReject}
                disabled={isActioning}
              >
                {isActioning ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  <>Confirm Rejection</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default RejectModalComponent;