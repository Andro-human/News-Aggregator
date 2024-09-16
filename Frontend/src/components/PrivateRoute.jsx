
import { Navigate } from "react-router-dom";

const PrivateRoute = ({user, redirect = "/", children }) => {
  console.log("user", user)
  if (!user) return <Navigate to={redirect} />;
  return children;
};

export default PrivateRoute;
