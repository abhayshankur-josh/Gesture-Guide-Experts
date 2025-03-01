
import { ROUTES } from "../../../constants/routesConstants";
import { AppRootState } from "../../../store/store";
import { useLogoutMutation } from "../../Auth/api";
import SidebarComponent from "../components/SidebarComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { clearAuthToken } from "../../Auth/slice";
import { removeProfileDetails } from "../../Profile/slice";

export interface IMenuItemProps {
  id: string;
  title: string;
  icon: string;
  path: string;
  isCurrent: boolean;
}

const SidebarContainer: React.FC = () => {
  const menuItemsInitialState: Array<IMenuItemProps> = [
    { id: 'dashboard', title: 'Dashboard', icon: 'bi-speedometer2', path: ROUTES.DASHBOARD, isCurrent: true },
    { id: 'submissions', title: 'Submissions', icon: 'bi-file-earmark-text', path: ROUTES.SUBMISSIONS, isCurrent: false },
  ];
  const [menuItems, setMenuItems] = useState(menuItemsInitialState);
  
  const [ logout ] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      alert("You have logged out successfully!");
      dispatch(removeProfileDetails());
      dispatch(clearAuthToken());
      console.log('Logout successful, token cleared!');
    } catch (error) {
      alert("Logged out failed!");
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleMenuItemClick = (itemId: string) => {
    setMenuItems(prevItems => prevItems.map(
      item => ({
        ...item,
        isCurrent: item.id === itemId
      })
    ));
    const selectedTab = menuItemsInitialState.find( item => item.id===itemId )
    navigate(selectedTab!.path);
  };

  
  const username = useAppSelector((state: AppRootState) => state.profileSlice.full_name)
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

