import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../constants/routesConstants";
import { AppRootState } from "../../../store/store";
import { useLogoutMutation } from "../../Auth/api";
// import { useGetProfileQuery } from "../../Profile/api";
import SidebarComponent from "../components/SidebarComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IMenuItemProps {
  id: string;
  title: string;
  icon: string;
  path: string;
  isCurrent: boolean;
}

const SidebarContainer: React.FC = () => {
  
  // const { data, isLoading } = useGetProfileQuery();

  const menuItemsInitialState: Array<IMenuItemProps> = [
    { id: 'dashboard', title: 'Dashboard', icon: 'bi-speedometer2', path: ROUTES.DASHBOARD, isCurrent: true },
    { id: 'submissions', title: 'Submissions', icon: 'bi-file-earmark-text', path: ROUTES.SUBMISSIONS, isCurrent: false },
  ];

  const [menuItems, setMenuItems] = useState(menuItemsInitialState);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const [ logout ] = useLogoutMutation();
      await logout().unwrap();
      alert("You have logged out successfully!");
    } catch (error) {
      alert("Logged out failed!");
      console.log(error);
    }
  };

  const handleMenuItemClick = (itemId: string) => {
    alert(`Navigating to ${itemId}`);
    setMenuItems(prevItems => prevItems.map(
      item => ({
        ...item,
        isCurrent: item.id === itemId
      })
    ));
    // navigate(`/${itemId}`);
    // In a real app, you would use React Router: navigate(`/${itemId}`);
  };

  const username = useSelector((state: AppRootState) => state.profileSlice.full_name);

  return (
    <SidebarComponent 
      menuItems={menuItems} 
      onMenuItemClick={handleMenuItemClick} 
      username={username} 
      onLogout={handleLogout} 
    />
  );
};

export default SidebarContainer;

