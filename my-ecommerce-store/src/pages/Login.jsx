import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentstate] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength checker
  const checkPasswordStrength = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak";
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8)
      return "Strong";
    return "Medium";
  };

  const onPasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordStrength(checkPasswordStrength(val));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    // If sign-up, check password strength
    if (currentState === "Sign Up" && passwordStrength === "Weak") {
      return toast.error(
        "Password is too weak. Try adding numbers, capitals, or making it longer."
      );
    }

    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-sm"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">
            {currentState === "Login" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-gray-500 text-sm">
            {currentState === "Login"
              ? "Access your account"
              : "Join us today"}
          </p>
        </div>

        {/* Name Field (Sign Up only) */}
        {currentState === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="Your name"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label className="block text-sm mb-1">Password</label>
          <input
            onChange={onPasswordChange}
            value={password}
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            placeholder="••••••••"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-xs cursor-pointer text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          {currentState === "Sign Up" && password && (
            <p
              className={`text-xs mt-1 ${passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
                }`}
            >
              Password strength: {passwordStrength}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between text-xs mb-6 text-gray-500">
          <p className="cursor-pointer hover:underline">
            Forgot your password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentstate("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentstate("Login")}
              className="cursor-pointer hover:underline"
            >
              Login here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-black text-white font-medium hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          {loading
            ? "Processing..."
            : currentState === "Login"
              ? "Sign In"
              : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
