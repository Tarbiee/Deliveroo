import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ accessToken, children }) => {
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;