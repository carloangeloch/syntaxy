import { Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { userAuthStore } from "./store/authStore";
import PrivateRouter from "./lib/PrivateRouter";
import Profile from "./pages/Profile";

const HomePage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SingupPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const Landing = lazy(() => import("./pages/Landing"));
const Header = lazy(() => import("./components/Header"));

const App = () => {
  const { authUser, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Header />
      <div className="w-full h-screen pt-12">
        <Routes>
          <Route
            path="/"
            element={
              Object.keys(authUser).length === 0 ? <Landing /> : <HomePage />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="" element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
};

export default App;
