import { ROUTES } from "../../../constants/routesConstants";
import SidebarComponent from "../components/SidebarComponent";

export interface MenuItemProps {
  id: string;
  title: string;
  icon: string;
  path: string;
  isCurrent: boolean;
}

const SidebarContainer: React.FC = () => {
  
  const menuItems: Array<MenuItemProps> = [
    { id: 'dashboard', title: 'Dashboard', icon: 'bi-speedometer2', path: ROUTES.DASHBOARD, isCurrent: true },
    { id: 'submissions', title: 'Submissions', icon: 'bi-file-earmark-text', path: ROUTES.SUBMISSIONS, isCurrent: false },
    // { id: 'approvals', title: 'Approvals', icon: 'bi-check-circle', path: '/approvals', active: false },
    // { id: 'reports', title: 'Reports', icon: 'bi-bar-chart', path: '/reports', active: false },
    // { id: 'settings', title: 'Settings', icon: 'bi-gear', path: '/settings', active: false }
  ];

  const handleLogout = () => {
    alert('Logout functionality would trigger here');
    // In a real app: authService.logout();
  };

  const handleMenuItemClick = (itemId: string) => {
    alert(`Navigating to ${itemId}`);
    // In a real app, you would use React Router: navigate(`/${itemId}`);
  };

  return (
    <SidebarComponent 
      menuItems={menuItems} 
      onMenuItemClick={handleMenuItemClick} 
      username="John Doe" 
      onLogout={handleLogout} 
    />
  );
};

export default SidebarContainer;