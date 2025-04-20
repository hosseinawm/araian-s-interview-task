import Register from "./components/RegistrationPage/Register";
import Login from "./components/LoginPage/Login";
import Dashboard from "./components/DashboardPage/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route
            path="/dashboard/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
