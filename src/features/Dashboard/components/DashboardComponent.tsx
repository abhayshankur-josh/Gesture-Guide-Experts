
import React from 'react';

interface DashboardStats {
  submissions: number;
  signs: number;
  pendingApprovals: number;
  completedTasks: number;
}

interface DashboardComponentProps {
  stats: DashboardStats;
  isLoading: boolean;
  onRefresh: () => void;
  onCreateNew: () => void;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  stats,
  isLoading,
  onRefresh,
  onCreateNew
}) => {
  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-4">Dashboard Overview</h2>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {/* Submissions Card */}
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Total Submissions</h6>
                        <h3 className="mb-0">{stats.submissions}</h3>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <i className="bi bi-file-earmark-text text-primary fs-3"></i>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="badge bg-success">
                        <i className="bi bi-arrow-up me-1"></i>12% 
                      </span>
                      <span className="text-muted ms-2">Since last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signs Card */}
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Total Signs</h6>
                        <h3 className="mb-0">{stats.signs}</h3>
                      </div>
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <i className="bi bi-pen text-success fs-3"></i>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="badge bg-success">
                        <i className="bi bi-arrow-up me-1"></i>8% 
                      </span>
                      <span className="text-muted ms-2">Since last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Approvals Card */}
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Pending Approvals</h6>
                        <h3 className="mb-0">{stats.pendingApprovals}</h3>
                      </div>
                      <div className="bg-warning bg-opacity-10 p-3 rounded">
                        <i className="bi bi-hourglass-split text-warning fs-3"></i>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="badge bg-danger">
                        <i className="bi bi-arrow-up me-1"></i>5% 
                      </span>
                      <span className="text-muted ms-2">Since yesterday</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed Tasks Card */}
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Completed Tasks</h6>
                        <h3 className="mb-0">{stats.completedTasks}</h3>
                      </div>
                      <div className="bg-info bg-opacity-10 p-3 rounded">
                        <i className="bi bi-check-circle text-info fs-3"></i>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="badge bg-success">
                        <i className="bi bi-arrow-up me-1"></i>18% 
                      </span>
                      <span className="text-muted ms-2">Since last week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#12345</td>
                      <td>Submission</td>
                      <td>Q1 Financial Report</td>
                      <td><span className="badge bg-success">Approved</span></td>
                      <td>Today, 10:30 AM</td>
                    </tr>
                    <tr>
                      <td>#12344</td>
                      <td>Document</td>
                      <td>Partnership Agreement</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                      <td>Today, 9:15 AM</td>
                    </tr>
                    <tr>
                      <td>#12343</td>
                      <td>Contract</td>
                      <td>Vendor Contract Renewal</td>
                      <td><span className="badge bg-info">Signed</span></td>
                      <td>Yesterday, 3:45 PM</td>
                    </tr>
                    <tr>
                      <td>#12342</td>
                      <td>Request</td>
                      <td>Budget Increase Request</td>
                      <td><span className="badge bg-danger">Rejected</span></td>
                      <td>Yesterday, 1:30 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        className="btn btn-primary rounded-circle position-fixed"
        style={{ 
          bottom: "2rem", 
          right: "2rem", 
          width: "60px", 
          height: "60px", 
          fontSize: "24px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
        onClick={onCreateNew}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};

export default DashboardComponent;