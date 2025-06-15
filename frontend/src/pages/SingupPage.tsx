import { useEffect, useState } from "react";
import Input from "../components/Input";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const SingupPage = () => {
  const defaultUserData = {
    email: "",
    username: "",
    password1: "",
    password2: "",
  };
  const { signup, isSigningUp, authUser } = userAuthStore();
  const [userData, setUserData] = useState(defaultUserData);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    try {
      const validEmail = validateEmail(userData.email);
      if (!validEmail) toast.error("Email not valid");
      if (userData.password1.length < 8)
        toast.error("Password is less than 8 characters");
      if (userData.password1 != userData.password2)
        toast.error("Password do not match");
      if (validEmail && userData.password1 === userData.password2) {
        signup({
          email: userData.email,
          password: userData.password1,
          username: userData.username,
        });
        setUserData(defaultUserData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(authUser).length !== 0) navigate("/");
  }, [authUser, navigate]);

  return (
    <div
      id="signup"
      className="w-full min-h-full flex flex-col items-center justify-center px-5"
    >
      <div
        id="signup-card"
        className="p-6 lg:p-12 rounded-md bg-slate-200 text-slate-900 drop-shadow-md w-full md:w-2/3 lg:w-2/5"
      >
        <div className="text-center text-2xl text-purple-900 my-4">
          <strong>Create an Account</strong>
        </div>
        <div className="text-center mb-4">
          <p>Let us start your new article in dev life.</p>
        </div>
        <div className="w-3/4 border-t-1 mx-auto mb-8"></div>
        <div>
          <form className="flex flex-col gap-y-8">
            <Input
              text="Email Address"
              name="email"
              onchange={(e) =>
                setUserData((u) => ({ ...u, email: e.target.value }))
              }
            />
            <Input
              text="Username"
              name="username"
              onchange={(e) =>
                setUserData((u) => ({ ...u, username: e.target.value }))
              }
            />
            <Input
              text="Password"
              name="password1"
              onchange={(e) =>
                setUserData((u) => ({ ...u, password1: e.target.value }))
              }
            />
            <Input
              text="Confirm Password"
              name="password2"
              onchange={(e) =>
                setUserData((u) => ({ ...u, password2: e.target.value }))
              }
            />
            <div id="sumbit-box" className="w-full h-12 relative">
              <div className="absolute bg-slate-300 text-slate-400 w-full h-full top-0 left-0 rounded-md text-center p-3 z-0 opacity-50">
                <strong>Submit</strong>
              </div>
              {isSigningUp ? (
                <div className="w-full h-12 text-slate-200 p-3 text-center drop-shadow-md bg-gradient-to-r from-blue-500 to-purple-800 rounded-md">
                  <span className="loading loading-dots loading-md"></span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, width: 0, display: "hidden" }}
                  animate={
                    userData.email && userData.password1 && userData.password2
                      ? { opacity: 1, width: "100%", display: "block" }
                      : { opacity: 0, width: 0, display: "hidden" }
                  }
                  exit={{ opacity: 0, width: 0, display: "hidden" }}
                  whileHover={
                    userData.email && userData.password1 && userData.password2
                      ? { opacity: 0.8, cursor: "pointer" }
                      : { opacity: 0, cursor: "default" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-12 text-center text-slate-200 p-3 rounded-md drop-shadow-md bg-gradient-to-r from-blue-500 to-purple-800 mx-auto relative"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      userData.email &&
                      userData.password1 &&
                      userData.password2
                    )
                      handleSubmit();
                  }}
                >
                  <strong>Submit</strong>
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingupPage;
