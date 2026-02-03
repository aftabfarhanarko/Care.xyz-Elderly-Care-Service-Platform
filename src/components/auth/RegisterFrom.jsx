"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  FileText,
  Eye,
  EyeOff,
  X,
  Upload,
  Sparkles,
  UserPlus,
  ArrowRight,
  Chrome,
} from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { imageUpload } from "@/utils/imagesUpDB";
// import { savedUserData } from "@/actions/userData/userDbFUnctions";

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

const RegisterFrom = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    nid: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {};

    const password = formData.password;
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Please upload an image file" });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size must be less than 5MB" });
        return;
      }

      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (errors.image) {
        setErrors({ ...errors, image: null });
      }
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      let imageUrl = "";
      if (profileImage) {
        imageUrl = await imageUpload(profileImage);
      }

      const submitData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        nidNumber: formData.nid,
        password: formData.password,
        profileImage: imageUrl,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      // console.log("Form Data:", submitData);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      // console.log(result);

      if (result.success) {
        toast.success(result.message);

        // Auto login after registration
        const loginResult = await signIn("credentials", {
          email: submitData.email,
          password: submitData.password,
          redirect: false,
        });

        if (loginResult?.ok) {
          router.push("/");
        } else {
          router.push("/login");
        }

        setFormData({
          name: "",
          email: "",
          contact: "",
          nid: "",
          password: "",
        });
        setProfileImage(null);
        setImagePreview(null);
      } else {
        toast.error(result.message || "Registration failed.");
        setErrors({
          ...errors,
          submit: result.message || "Registration failed.",
        });
      }
    } catch (error) {
      // console.error(error);
      toast.error("Registration failed. Please try again.");
      setErrors({
        ...errors,
        submit: "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-30 flex flex-col justify-center py-12 px-4 lg:px-8 relative overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-rose-950/20 dark:to-gray-900">
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
          Create Account
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          Join us today! Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-rose-600 hover:text-rose-500 transition-colors"
          >
            Sign in
          </a>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl py-10 px-6 shadow-2xl rounded-[2.5rem] sm:px-12 border border-white/50 dark:border-gray-700/50"
        >
          <div className="space-y-6">
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm text-center font-medium"
                >
                  {errors.submit}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Profile Picture
              </label>

              <div className="relative group">
                {imagePreview ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-24 h-24"
                  >
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-full border-4 border-rose-100 dark:border-rose-900/50 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 bg-white text-red-500 rounded-full p-1 shadow-lg hover:bg-red-50 transition-all border border-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full cursor-pointer hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all group bg-gray-50 dark:bg-gray-900/50">
                    <Upload className="h-6 w-6 text-gray-400 group-hover:text-rose-500 transition-colors" />
                    <span className="text-[10px] text-gray-400 mt-1 font-medium group-hover:text-rose-500">
                      Upload
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              {errors.image && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.image}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "John Doe",
                  icon: User,
                },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "you@example.com",
                  icon: Mail,
                },
                {
                  name: "contact",
                  label: "Contact Number",
                  type: "tel",
                  placeholder: "+880 1234 567890",
                  icon: Phone,
                },
                {
                  name: "nid",
                  label: "NID Number",
                  type: "text",
                  placeholder: "NID Number",
                  icon: FileText,
                },
              ].map((field) => (
                <div key={field.name} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <field.icon className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                  </div>
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

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
              {errors.password && (
                <p className="text-xs text-red-500 font-medium ml-1">
                  {errors.password}
                </p>
              )}
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
                <span className="flex items-center">
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
                  Creating...
                </span>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
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
          Your data is protected with enterprise-grade encryption
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegisterFrom;
