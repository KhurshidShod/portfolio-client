import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import UserPageLayout from "./components/UserPageLayout";
import LoginPage from "./pages/client/LoginPage";
import RegisterPage from "./pages/client/RegisterPage";
import AccountPage from "./pages/client/AccountPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import UserPage from "./pages/client/UserPage";

function App(): JSX.Element {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPageLayout />}>
          <Route path="" element={<HomePage />} />
          <Route
            path="account"
            element={isAuth ? <AccountPage /> : <Navigate to="/login" />}
          />
        <Route path="user/:id" element={<UserPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
