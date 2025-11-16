import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/UserContext";

const RoleRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

 
  let rol = user?.member_role || user?.user?.member_role;
  if (!rol) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    rol = storedUser?.member_role; 
  }


  if (!rol || !allowedRoles.includes(rol)) {
    console.log("❌ Rol no autorizado");
    return <Navigate to="/404" replace />;
  }

  console.log("✔ Rol autorizado, mostrando contenido");
  return <Outlet />;
};

export default RoleRoute;
