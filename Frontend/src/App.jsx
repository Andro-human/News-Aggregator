import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "./userContext";
import { useEffect } from "react";
import axios from "axios";

// Create a component to access user from context
const AppContent = () => {
  const { user, logout, login } = useUser();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}api/v1/auth/profile`, {
        withCredentials: true,
      })
      .then(({ data }) => login(data?.user))
      .catch(() => logout());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user} redirect="/login">
              <Header />
              <Articles />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute user={!user} redirect="/">
              <Login />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
