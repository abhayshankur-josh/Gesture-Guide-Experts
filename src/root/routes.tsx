import { ROUTES } from "../constants/routesConstants";
import ApprovalContainer from "../features/Approval/containers";
import DashboardContainer from "../features/Dashboard/containers";
import LoginContainer from "../features/Login/containers";
import SignupContainer from "../features/Signup/containers";

export interface RouteComponents {
    path: string;
    element: React.ComponentType;
    isProtected: boolean;
}

export const configRoutes: RouteComponents[]= [
    {
        path: ROUTES.LOGIN,
        element: LoginContainer,
        isProtected: false
    },
    {
        path: ROUTES.SIGNUP,
        element: SignupContainer,
        isProtected: false
    },
    {
        path: ROUTES.DASHBOARD,
        element: DashboardContainer,
        isProtected: true
    },
    {
        path: ROUTES.SUBMISSIONS,
        element: ApprovalContainer,
        isProtected: true
    },
]
