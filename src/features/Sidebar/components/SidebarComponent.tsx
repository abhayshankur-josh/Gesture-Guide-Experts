const SidebarComponent: React.FC<ISidebarProps> = ({ menuItems, username, onLogout, onMenuItemClick, onProfileClick }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px', height: '100vh' }}>
      <div className="d-flex justify-content-center fs-4 text-white">WELCOME!</div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto justify-content-center">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.id}>
            <a 
              href={item.path}
              className={`nav-link text-white ${item.isCurrent ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onMenuItemClick && onMenuItemClick(item.id);
              }}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/src/assets/profile-2.png" alt="Profile Image" width="32" height="32" className="rounded-circle me-2" />
          <strong>{username}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><span className="dropdown-item" onClick={onProfileClick}>Profile</span></li>
          <li><hr className="dropdown-divider" /></li>
          <li><span className="dropdown-item" onClick={onLogout}>Sign out</span></li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;