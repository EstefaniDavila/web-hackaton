import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/providers/UserContext"

const PrivateRoute = () => {
  const { authTokens } = useAuth()

  
  if (!authTokens) {
    return <Navigate to="/sign-in" />
  }
  return <Outlet />
}

export default PrivateRoute
