import { Navigate } from "react-router-dom";
import SessionService from "./SessionService";

function AuthRoute({ children }) {
  const valid = SessionService.isSessionValid();
  if (!valid) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default AuthRoute;