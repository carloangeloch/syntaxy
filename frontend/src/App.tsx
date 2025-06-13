import { Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { userAuthStore } from "./store/authStore";

const HomePage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SingupPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const Header = lazy(() => import("./components/Header"));

const App = () => {
  const { authUser, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route
          path="/signup"
          element={authUser ? <HomePage /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={authUser ? <HomePage /> : <LoginPage />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
};

export default App;
