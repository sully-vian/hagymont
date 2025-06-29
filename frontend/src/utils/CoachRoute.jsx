import { Navigate } from "react-router-dom";
import SessionService from "./SessionService";

function CoachRoute({ children }) {
  const role = SessionService.getRole();
  if (role !== 'coach' && role !== 'admin') {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default CoachRoute;