import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitingLayout from "./layouts/VisitingLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import RegisterStudent from "./pages/RegisterStudent";
import { AuthProvider } from "./context/AuthContext";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import StudentProfile from "./pages/student-dashboard/StudentProfile";
import StudentCourses from "./pages/student-dashboard/StudentCourses";
import StudentPayments from "./pages/student-dashboard/StudentPayments";
import StudentGrades from "./pages/student-dashboard/StudentGrades";
import StudentSchedule from "./pages/student-dashboard/StudentSchedule";
import StudentPrivateRoute from "./routes/StudentPrivateRoute";
import VisitingPrivateRoute from "./routes/VisitingPrivateRoute";
import Page404 from "./pages/Page404";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import StudentList from "./pages/admin-dashboard/StudentList";
// import { useAuth } from "./context/AuthContext";

function App() {
  // const { currentUser } = useAuth();
  // const navigate = useNavigate();

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Visiting Layout */}
            <Route path="*" element={<Page404 />} />
            <Route
              path="/"
              element={
                <VisitingPrivateRoute>
                  <VisitingLayout />
                </VisitingPrivateRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
            </Route>
            {/* Student Dashboard Layout */}
            <Route
              path="/student"
              element={
                <StudentPrivateRoute>
                  <StudentDashboardLayout />
                </StudentPrivateRoute>
              }
            >
              <Route path="profile" element={<StudentProfile />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="payments" element={<StudentPayments />} />
              <Route path="grades" element={<StudentGrades />} />
              <Route path="schedule" element={<StudentSchedule />} />
            </Route>
            {/* Admin Dashboard Layout */}
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route path="student-list" element={<StudentList />}/>
              <Route path="register-student" element={<RegisterStudent />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
