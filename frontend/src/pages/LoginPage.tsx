import Input from "../components/Input";
import { motion } from "framer-motion";
import { userAuthStore } from "../store/authStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const defaultUserData = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { isLoggingIn, login, authUser } = userAuthStore();
  const [userData, setUserData] = useState(defaultUserData);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") login(userData);
  };

  useEffect(() => {
    if (Object.keys(authUser).length !== 0) navigate("/");
  }, [authUser, navigate]);

  return (
    <div className="p-3 bg-slate-100 text-slate-800">
      <div id="login-card" className="p-8">
        <form onKeyDown={handleKeyDown}>
          <Input
            text="Email Address"
            name="email"
            onchange={(e) =>
              setUserData((u) => ({ ...u, email: e.target.value }))
            }
          />
          <Input
            text="Password"
            name="password"
            onchange={(e) =>
              setUserData((u) => ({ ...u, password: e.target.value }))
            }
          />

          <div id="sumbit-box" className="w-full h-12 relative">
            <div className="absolute bg-slate-300 text-slate-400 w-full h-full top-0 left-0 rounded-md text-center p-3 z-0 opacity-50">
              <strong>Submit</strong>
            </div>
            {isLoggingIn ? (
              <div className="w-full h-12 text-slate-200 p-3 text-center drop-shadow-md bg-gradient-to-r from-blue-500 to-purple-800 rounded-md">
                <span className="loading loading-dots loading-md"></span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, width: 0, display: "hidden" }}
                animate={
                  userData.email && userData.password
                    ? { opacity: 1, width: "100%", display: "block" }
                    : { opacity: 0, width: 0, display: "hidden" }
                }
                exit={{ opacity: 0, width: 0, display: "hidden" }}
                whileHover={
                  userData.email && userData.password
                    ? { opacity: 0.8, cursor: "pointer" }
                    : { opacity: 0, cursor: "default" }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-12 text-center text-slate-200 p-3 rounded-md drop-shadow-md bg-gradient-to-r from-blue-500 to-purple-800 mx-auto relative"
                onClick={(e) => {
                  e.preventDefault();
                  login(userData);
                }}
              >
                <strong>Submit</strong>
              </motion.div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
