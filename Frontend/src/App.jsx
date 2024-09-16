import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  const user = true;
  return (
    <>
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
         <Toaster postition="bottom-center" />
      </Router>
    </>
  );
}

export default App;
