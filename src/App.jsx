import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Notfound from './Components/NotFound/Notfound'
import UserTokenProvider from './Context/UserTokenProvider'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
function App() {
  const routing = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        {
          index: true, element: <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        },
        {
          path: "login", element: <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        },
        {
          path: "register", element: <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        },
        { path: "*", element: <Notfound /> }
      ]
    }
  ])
  return (
    <>
      <UserTokenProvider>
        <RouterProvider router={routing}></RouterProvider>
      </UserTokenProvider>
    </>
  )
}

export default App
