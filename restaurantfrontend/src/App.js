import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import LoginPage from "./screens/superadmin/LoginPage";
import AdminLogin from "./screens/admin/AdminLogin";
import Dashboard from "./screens/superadmin/Dashboard";
import AdminDashboard from "./screens/admin/AdminDashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<LoginPage/>} path='/loginpage'/>
          <Route element={<AdminLogin/>} path='/adminlogin'/>  
          <Route element={<Dashboard/>} path='/dashboard/*'/>
          <Route element={<AdminDashboard/>} path='/admindashboard/*'/>    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
