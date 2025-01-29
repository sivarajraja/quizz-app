import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.users.userData);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
