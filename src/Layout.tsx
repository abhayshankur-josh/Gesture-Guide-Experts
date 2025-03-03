import { Route, Routes, useLocation } from "react-router-dom";
import SidebarContainer from "./features/Sidebar/containers";
import { configRoutes, RouteComponents } from "./root/routes";
import ProtectedRoute from "./root/protectedRoute";
import { ROUTES } from "./constants/routesConstants";

const AppLayout = () => {
    const getRoutes = () => {
        return configRoutes.map((route: RouteComponents) => {
          return(
            route.isProtected 
              ? <Route key={route.path} path={route.path} element={
                  <ProtectedRoute element={<route.element/>} />
                }/>
              : <Route key={route.path} path={route.path} element={<route.element />} />
          );
        })
    }
    const location = useLocation();
    return(
        <div className="d-flex">
            {
                (location.pathname !== ROUTES.LOGIN && location.pathname !== ROUTES.SIGNUP) 
                && <SidebarContainer />
            }
            
            <div className="flex-grow-1 d-flex flex-column min-vh-100">
                <Routes>
                    {getRoutes()}
                </Routes>
            </div>
        </div>
    );
}

export default AppLayout;