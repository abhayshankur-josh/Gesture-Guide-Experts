import { ROUTES } from "../constants/routesConstants";
import DashboardContainer from "../features/Dashboard/containers";
import LoginContainer from "../features/Login/containers";

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
        path: ROUTES.DASHBOARD,
        element: DashboardContainer,
        isProtected: true
    },
]
