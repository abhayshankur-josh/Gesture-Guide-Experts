import React, { useState } from 'react';

interface ApprovalSearchProps {
  onSearch: (searchTerm: string) => void;
}

const ApprovalSearch: React.FC<ApprovalSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID, title, publisher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search submissions"
        />
        <button className="btn btn-outline-secondary" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default ApprovalSearch;