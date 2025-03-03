
interface IMenuItemProps {
    id: string;
    title: string;
    icon: string;
    path: string;
    isCurrent: boolean;
}
  
interface ISidebarProps {
    menuItems: IMenuItemProps[];
    username: string;
    onLogout: () => void;
    onMenuItemClick?: (itemId: string) => void;
    onProfileClick: () => void;
}
  