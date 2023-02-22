import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitingLayout from "./layouts/VisitingLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import RegisterStudent from "./pages/admin-dashboard/RegisterStudent";
import { AuthProvider } from "./context/AuthContext";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import StudentProfile from "./pages/student-dashboard/StudentProfile";
import StudentCourses from "./pages/student-dashboard/StudentCourses";
import StudentPayments from "./pages/student-dashboard/StudentPayments";
import StudentGrades from "./pages/student-dashboard/StudentGrades";
import StudentSchedule from "./pages/student-dashboard/StudentSchedule";
import LoginPrivateRoute from "./routes/LoginPrivateRoute";
import VisitingPrivateRoute from "./routes/VisitingPrivateRoute";
import Page404 from "./pages/Page404";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import StudentList from "./pages/admin-dashboard/StudentList";
import EditStudentData from "./pages/admin-dashboard/EditStudentData";
import RegisterTeacher from "./pages/admin-dashboard/RegisterTeacher";
import Teacherlist from "./pages/admin-dashboard/TeacherList"
import EditTeacherData from "./pages/admin-dashboard/EditTeacherData";
// import { useAuth } from "./context/AuthContext";

function App() {
  // const { currentUser } = useAuth();
  // const navigate = useNavigate();

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Visiting Route */}
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

            {/* Student Route*/}
            <Route
              path="/student"
              element={
                <LoginPrivateRoute>
                  <StudentDashboardLayout />
                </LoginPrivateRoute>
              }
            >
              <Route path="profile" element={<StudentProfile />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="payments" element={<StudentPayments />} />
              <Route path="grades" element={<StudentGrades />} />
              <Route path="schedule" element={<StudentSchedule />} />
            </Route>

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <LoginPrivateRoute>
                  <AdminDashboardLayout />
                </LoginPrivateRoute>
              }
            >
              <Route path="student-list" element={<StudentList />} />
              <Route path="register-student" element={<RegisterStudent />} />
              <Route path="edit-student-data" element={<EditStudentData />} />
              <Route path="edit-teacher-data" element={<EditTeacherData />} />
              <Route path="register-teacher" element={<RegisterTeacher />} />
              <Route path="teacher-list" element={<Teacherlist />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
