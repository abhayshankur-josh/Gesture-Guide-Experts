
import { ROUTES } from "../../../constants/routesConstants";
import { AppRootState } from "../../../store/store";
import { useLogoutMutation } from "../../Auth/api";
import SidebarComponent from "../components/SidebarComponent";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { clearAuthToken } from "../../Auth/slice";
import { removeProfileDetails } from "../../Profile/slice";
import ProfileModal from "../../Profile/containers";

const SidebarContainer: React.FC = () => {
  const location = useLocation();
  const menuItemsInitialState: Array<IMenuItemProps> = [
    { id: 'dashboard', title: 'Dashboard', icon: 'bi-speedometer2', path: ROUTES.DASHBOARD, isCurrent: true },
    { id: 'submissions', title: 'Submissions', icon: 'bi-file-earmark-text', path: ROUTES.SUBMISSIONS, isCurrent: false },
  ];
  const initialMenuItemsState = () => {
    return menuItemsInitialState.map((item) => ({
      ...item,
      isCurrent: item.path === location.pathname,
    }));
  };
  const [menuItems, setMenuItems] = useState(initialMenuItemsState);
  
  const [ logout, { error: logoutError } ] = useLogoutMutation();
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
      console.log(logoutError);
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

  
  const username = useAppSelector((state: AppRootState) => state.profileSlice.username)


  // Modal visibility state
  const [showModal, setShowModal] = useState(false);
  const handleShowProfile = () => setShowModal(true);
  const handleCloseProfile = () => setShowModal(false);

  return (
    
    <>
      <SidebarComponent 
        menuItems={menuItems} 
        onMenuItemClick={handleMenuItemClick} 
        username={username} 
        onLogout={handleLogout} 
        onProfileClick={handleShowProfile}
      />

      <ProfileModal 
        show={showModal} 
        onHide={handleCloseProfile}
      />
    </>
  );
};

export default SidebarContainer;

