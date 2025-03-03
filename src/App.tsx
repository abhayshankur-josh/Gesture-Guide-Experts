import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import { configRoutes, RouteComponents } from './root/routes'
import ProtectedRoute from './root/protectedRoute'
import AppLayout from './Layout'

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
