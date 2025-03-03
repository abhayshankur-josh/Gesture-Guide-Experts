import { ROUTES } from "../constants/routesConstants";
import ApprovalContainer from "../features/Approval/containers";
import DashboardContainer from "../features/Dashboard/containers";
import LoginContainer from "../features/Auth/Login/containers";
import SignupContainer from "../features/Auth/Signup/containers";


import {
    DashboardOutlined,
    DesktopOutlined,
    FileOutlined,
    FileSyncOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

export interface RouteComponents {
    path: string;
    label?: string;
    element: React.ComponentType;
    isProtected: boolean;
    icon?: React.ReactNode;
}

export const configRoutes: RouteComponents[]= [
    {
        label: "Home",
        path: ROUTES.HOME,
        element: DashboardContainer,
        isProtected: true,
        icon: <DashboardOutlined />,
    },
    {
        label: "Login",
        path: ROUTES.LOGIN,
        element: LoginContainer,
        isProtected: false
    },
    {
        label: "Signup",
        path: ROUTES.SIGNUP,
        element: SignupContainer,
        isProtected: false
    },
    {
        label: "Dashboard",
        path: ROUTES.DASHBOARD,
        element: DashboardContainer,
        isProtected: true,
        icon: <DashboardOutlined />,
    },
    {
        label: "Submissions",
        path: ROUTES.SUBMISSIONS,
        element: ApprovalContainer,
        isProtected: true,
        icon: <FileSyncOutlined />
    },
]
