import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "./userContext";

// Create a component to access user from context
const AppContent = () => {
  const { user } = useUser();

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
