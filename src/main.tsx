import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import SignUp from './routes/SignUp.tsx'
import SignIn from './routes/SignIn.tsx'
import Home from './routes/Home.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/home",
    element:
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
