
import { FilterOptions, Submission, SubmissionView } from '../types/approvalTypes';
import ApprovalFilters from './ApprovalFilters';
import ApprovalSearch from './ApprovalSearch';
import ApprovalTable from './ApprovalTable';

interface ApprovalComponentProps {
    errorMessage: string | null;
    clearError: () => void;
    publishers: string[];
    handleFilterChange: (newFilters: FilterOptions) => void;
    handleSearch: (term: string) => void;
    refreshData: () => void;
    loading: boolean;
    submissions: SubmissionView[] | undefined;
    handleApprove: (submissionId: string) => Promise<void>;
    handleReject: (submissionId: string, reason?: string) => Promise<void>;
}


const ApprovalComponent: React.FC<ApprovalComponentProps> = ({errorMessage, clearError, publishers, handleFilterChange, handleSearch, refreshData, loading, submissions, handleApprove, handleReject}) => {
    return(
        <div className="approval-container">
            {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <p className="mb-0">{errorMessage}</p>
                <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="alert" 
                    aria-label="Close"
                    onClick={clearError}
                ></button>
                </div>
            )}
            
            <div className="navbar bg-light px-3 py-2 rounded mb-3">
                <div className="container-fluid d-flex flex-row align-items-center">
                    <div className="d-flex flex-grow-1 gap-3 align-items-center">
                        <ApprovalFilters 
                            publishers={publishers}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                        <div className="ms-auto">
                            <ApprovalSearch
                            onSearch={handleSearch}
                            />
                        </div>
                        <button
                            className="btn btn-outline-secondary ms-2"
                            onClick={refreshData}
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i>
                        </button>
                </div>
            </div>
            
            <ApprovalTable
                submissions={submissions}
                loading={loading}
                onApprove={handleApprove}
                onReject={handleReject}
            />
            
            {loading && <div className="loading-overlay">Loading submissions...</div>}
        </div>
    );
}

export default ApprovalComponent;