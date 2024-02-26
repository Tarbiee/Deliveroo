import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ accessToken, children }) => {
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;