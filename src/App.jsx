import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./App.css";

// pages & components
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Create from "./pages/create/Create.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Project from "./pages/project/Project.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import OnlineUsers from "./components/OnlineUsers.jsx";

function App() {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) {
    // Add a loading indicator or fallback while authentication is being checked
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<Create />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
        {user && <OnlineUsers />}
      </BrowserRouter>
    </div>
  );
}

export default App;
