import { useDispatch } from "react-redux";
import { MenuItemProps } from "../containers";
import { clearToken } from "../../Login/slice";

interface SidebarProps {
  menuItems: MenuItemProps[];
  username?: string;
  onLogout?: () => void;
  onMenuItemClick?: (itemId: string) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({ menuItems, onMenuItemClick }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(clearToken());
      console.log('Logout successful, token cleared!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px', height: '100vh' }}>
      {/* <a href="#" className="d-flex justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="bi bi-speedometer2 fs-4 me-2"></i>
        <span className="fs-4">Dashboard</span>
      </a> */}
      <div className="d-flex justify-content-center fs-4 text-white">WELCOME!</div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto justify-content-center">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.id}>
            <a 
              href={item.path}
              className={`nav-link text-white ${item.isCurrent ? 'active' : ''}`}
            //   onClick={(e) => {
            //     e.preventDefault();
            //     onMenuItemClick && onMenuItemClick(item.id);
            //   }}
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
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>User</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" onClick={handleLogout}>Sign out</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;