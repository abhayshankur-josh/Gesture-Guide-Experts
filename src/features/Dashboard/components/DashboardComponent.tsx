
import React from 'react';
import { useAppSelector } from '../../../store/storeHooks';
import LoadingComponent from './LoadingComponent';


const DashboardComponent: React.FC<IDashboardComponentProps> = ({
  stats,
  isLoading,
  recentActivity,
  isRecentLoading
}) => {
  const userId = useAppSelector((state) => state.profileSlice.id);

  function getClassName(status: TSubmissionStatus) {
    switch (status) {
      case 'approved': {
        return 'badge bg-success px-4 py-2';
      }
      case 'pending': {
        return 'badge bg-warning px-4 py-2';
      }
      case 'rejected': {
        return 'badge bg-danger px-4 py-2';
      }
      default: {
        return 'badge bg-info px-4 py-2';
      }
    }
  }

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-4">Dashboard Overview</h2>
          {isLoading ? (
            <LoadingComponent />
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
      {isRecentLoading ? (
        <LoadingComponent />
      ) : (
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
                        <th>Submission ID</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map(
                        (activity: ISubmissionView | ISubmission) => {
                          // Convert updated_at to a Date object
                          const updatedAt = new Date(activity.updated_at);

                          // Format the date into a readable format (e.g., "March 3, 2025")
                          const formattedDate = updatedAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          });

                          if ('approver_name' in activity) {
                            // Handle the ISubmissionView type
                            return (
                              <tr key={activity.id}>
                                <td>{activity.id}</td>
                                <td>{activity.approver_id === userId ? 'Approved' : 'Created'}</td>
                                <td>{activity.sign_title}</td>
                                <td><span className={getClassName(activity.sign_status)}>{activity.sign_status.toUpperCase()}</span></td>
                                <td>{formattedDate}</td>
                              </tr>
                            );
                          } else {
                            // Handle the ISubmission type
                            return (
                              <tr key={activity.id}>
                                <td>{activity.id}</td>
                                <td>{activity.approved_by_id === userId ? 'Approved' : ''}</td>
                                <td>Partnership Agreement</td>
                                <td><span className={getClassName('pending')}>{activity.sign_id}</span></td>
                                <td>{formattedDate}</td>
                              </tr>
                            );
                          }
                        }
                      )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardComponent;