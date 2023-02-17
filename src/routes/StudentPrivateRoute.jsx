import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// cannot enter the student router when not login
const StudentPrivateRoute = ({ children }) => {
    const { currentUser } = useAuth()
    
    return currentUser ? children : <Navigate to="/login" />;
  }

  export default StudentPrivateRoute;

  