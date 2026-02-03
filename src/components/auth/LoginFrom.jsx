"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Chrome,
  LogIn,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const LoginFrom = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result.error) {
        setErrorMessage("Invalid email or password");
        toast.error("Login failed. Please check your credentials.");
      } else {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  const handleAdminFill = () => {
    setFormData({
      ...formData,
      email: "admin@gmail.com",
      password: "123",
    });
    toast.success("Admin credentials auto-filled");
  };

  return (
    <div className="min-h-screen pt-30 flex flex-col justify-center py-12 px-4 lg:px-8 relative overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-rose-950/20 dark:to-gray-900">
      {/* Quick Admin Access Button */}
      <motion.button
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleAdminFill}
        className="fixed right-0 top-1/4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 pl-4 rounded-l-2xl shadow-xl border-y border-l border-gray-200 dark:border-gray-700 flex items-center gap-3 group hover:pl-6 transition-all duration-300 cursor-pointer"
        title="Click to fill Admin Credentials"
      >
        <span className="text-sm font-bold text-gray-600 dark:text-gray-300 hidden group-hover:block animate-in slide-in-from-right-2">
          Admin Demo
        </span>
        <div className="bg-gradient-to-tr from-rose-500 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-rose-500/30 transition-all">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
      </motion.button>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-rose-300/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-300/20 blur-[100px]"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 blur-lg opacity-70"
            />
            <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-xl">
              <Sparkles className="h-8 w-8 text-rose-600" />
            </div>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Welcome Back
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-rose-600 hover:text-rose-500 transition-colors"
          >
            Create one now
          </a>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl py-10 px-6 shadow-2xl rounded-[2.5rem] sm:px-12 border border-white/50 dark:border-gray-700/50"
        >
          <div className="space-y-6">
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm text-center font-medium"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-rose-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <a
                href="#"
                className="text-sm font-medium text-rose-600 hover:text-rose-500 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full relative overflow-hidden py-3.5 px-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-all"
            >
              <img src="/google.png" className="h-5 w-5" alt="Google"></img>
              Continue with Google
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400"
        >
          Protected by enterprise-grade security
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginFrom;
