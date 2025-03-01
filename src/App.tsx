import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { configRoutes, RouteComponents } from './root/routes'
import ProtectedRoute from './root/protectedRoute'

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        { getRoutes() }
      </Routes>
    </BrowserRouter>
  )
}

export default App
