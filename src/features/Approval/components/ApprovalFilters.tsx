import React, { useState } from 'react';
import { FilterOptions, SubmissionStatus } from '../types/approvalTypes';

interface ApprovalFiltersProps {
  publishers: string[];
  onFilterChange: (filters: FilterOptions) => void;
}

const ApprovalFilters: React.FC<ApprovalFiltersProps> = ({ publishers, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    publisher: null,
    dateRange: {
      start: null,
      end: null
    }
  });

  const handleStatusChange = (status: SubmissionStatus | 'all') => {
    const updatedFilters = { ...filters, status };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePublisherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const publisher = e.target.value || null;
    const updatedFilters = { ...filters, publisher };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const dateValue = value ? new Date(value) : null;
    const updatedFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: dateValue
      }
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterOptions = {
      status: 'all',
      publisher: null,
      dateRange: {
        start: null,
        end: null
      }
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="card mb-3 border-light bg-light">
      <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filters
        </h5>
        <button 
          className="btn btn-sm btn-link text-muted" 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
      </div>
      
      {isExpanded && (
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <div className="d-flex">
                <div className="btn-group" role="group">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="status" 
                    id="status-all" 
                    checked={filters.status === 'all'} 
                    onChange={() => handleStatusChange('all')}
                  />
                  <label className="btn btn-outline-secondary btn-sm" htmlFor="status-all">All</label>
                  
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="status" 
                    id="status-pending" 
                    checked={filters.status === 'pending'} 
                    onChange={() => handleStatusChange('pending')}
                  />
                  <label className="btn btn-outline-warning btn-sm" htmlFor="status-pending">Pending</label>
                  
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="status" 
                    id="status-approved" 
                    checked={filters.status === 'approved'} 
                    onChange={() => handleStatusChange('approved')}
                  />
                  <label className="btn btn-outline-success btn-sm" htmlFor="status-approved">Approved</label>
                  
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="status" 
                    id="status-rejected" 
                    checked={filters.status === 'rejected'} 
                    onChange={() => handleStatusChange('rejected')}
                  />
                  <label className="btn btn-outline-danger btn-sm" htmlFor="status-rejected">Rejected</label>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <label htmlFor="publisher-filter" className="form-label">Publisher</label>
              <select 
                id="publisher-filter" 
                className="form-select" 
                value={filters.publisher || ''} 
                onChange={handlePublisherChange}
              >
                <option value="">All Publishers</option>
                {publishers.map(pub => (
                  <option key={pub} value={pub}>{pub}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3">
              <label htmlFor="start-date" className="form-label">From Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="start-date" 
                value={filters.dateRange.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </div>
            
            <div className="col-md-3">
              <label htmlFor="end-date" className="form-label">To Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="end-date" 
                value={filters.dateRange.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </div>
          </div>
          
          <div className="d-flex justify-content-end mt-3">
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm"
              onClick={clearFilters}
            >
              <i className="bi bi-x-circle me-1"></i>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalFilters;