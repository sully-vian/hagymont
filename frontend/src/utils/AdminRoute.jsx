import { Navigate } from "react-router-dom";
import SessionService from "./SessionService";

function AdminRoute({ children }) {
  const role = SessionService.getRole();
  if (role !== 'admin') {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default AdminRoute;