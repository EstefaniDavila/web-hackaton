import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import GeneralError from './../pages/general/errors/general-error'
import NotFoundError from './../pages/general/errors/not-found-error'
import MaintenanceError from './../pages/general/errors/maintenance-error'
import adminRoutes from '../routes/AdminRoutes'
import Login from '../pages/general/login/Login'
import ForgotPassword from '@/pages/general/login/ForgotPassword'
import ResetPassword from '@/pages/general/login/ResetPassword'
import { useAuth } from './../providers/UserContext'
import memberRoutes from './MemberRoutes'

const Routes = () => {
  const {  user, authTokens } = useAuth('')

  const roleRouter = {
    Admin: adminRoutes,
    Member: memberRoutes
  }

  const routesForPublic = [

    { path: "/500", Component: GeneralError },
    { path: "/404", Component: NotFoundError },
    { path: "/503", Component: MaintenanceError },
    { path: "*", Component: NotFoundError },
  ]

  const routesForAuthenticatedOnly = roleRouter[user?.user?.roleable_type] || []

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:operation_code/:expires_at",
      element: <ResetPassword />,
    },
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "/sign-in",
      element: <Login />,
    },
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!authTokens ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]
  )

  return <RouterProvider router={router} />
}
export default Routes

