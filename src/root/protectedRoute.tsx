import { useSelector } from "react-redux";
import { Navigate, RouteProps, useLocation } from "react-router-dom";
import { AppRootState } from "../store/store";
import { ROUTES } from "../constants/routesConstants";

const ProtectedRoute: React.FC<RouteProps> = ({element}) => {
    const location = useLocation();
    const localToken = useSelector((state: AppRootState) => state.authSlice.token)

    if (!localToken) {
        return <Navigate to={ROUTES.LOGIN}  state={{ from: location}} replace />
    }
    return element;
};

export default ProtectedRoute;