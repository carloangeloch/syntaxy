import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface AuthStore {
  authUser: object;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  isCheckingAuth: boolean;
  checkAuth(): void;
  signup(data: object): void;
  login(data: object): void;
  logout(): void;
}

export const userAuthStore = create<AuthStore>((set) => ({
  authUser: {},
  isSigningUp: false,
  isLoggingIn: false,
  isUpdating: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.post("/auth/check");
      set({ authUser: res.data });
      console.log(res.data);
    } catch (error) {
      console.log("Error on checkAuth", error);
      set({ authUser: {} });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    set({ isSigningUp: true });
    console.log(data);
    try {
      const res = await axiosInstance.post("/auth/signup", {
        email: data.email,
        password: data.password,
        username: data.username,
      });
      console.log(res.data);
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Error upon signing up. Please try again later.");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data: object) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data);
      set({ authUser: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          toast.error("Invalid Credentials");
        } else {
          console.error("Request error:", AxiosError);
          toast.error("Error upon signing up. Please try again later.");
        }
      } else {
        console.log("An unexpected error occured:", error);
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      console.log(res.data);
      set({ authUser: {} });
    } catch (error) {
      console.log("Error on logout", error);
    }
  },
}));
