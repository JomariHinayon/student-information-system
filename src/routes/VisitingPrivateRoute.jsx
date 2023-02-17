import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VisitingPrivateRoute = ({ children }) => {
    const { currentUser } = useAuth()

    return !currentUser ? children : <Navigate to="student/profile" />;
}

export default VisitingPrivateRoute