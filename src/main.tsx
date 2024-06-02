import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import SignUp from './routes/SignUp.tsx'
import SignIn from './routes/SignIn.tsx'
import PiCalculator from './routes/PiCalculator.tsx'
import './index.css'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/picalculator",
    element:
      <ProtectedRoutes>
        <PiCalculator />
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
