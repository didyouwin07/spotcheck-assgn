"use client";
import { useState } from "react";
import styles from "./loginStyles.module.css";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { SocialIcon } from "react-social-icons";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (
      formData.email === "test@gmail.com" &&
      formData.password === "password123"
    ) {

      setLoginError("");
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormTitleSection}>
          <div className={styles.signInText}>Sign In</div>
          <div className={styles.signInSubText}>
            Empowering E-Commerce with insights
          </div>
          <div className={styles.signInSubText}>That drive success</div>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {loginError && (
            <div className={styles.errorMessage}>{loginError}</div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ""}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.inputError : ""}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password}</span>
            )}
          </div>

          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
          <button type="submit" className={styles.loginButtonGoogle}>
            <FcGoogle size={20} className="icon" />
            Sign In with Google
          </button>
          <button type="submit" className={styles.loginButtonTwitter}>
            <SocialIcon
              network="twitter"
              style={{ height: 24, width: 24 }}
              className="icon"
            />
            Sign In with Twitter
          </button>
        </form>
        <div className={styles.signUpPrompt}>
            Don't have an account? <span className={styles.signUpText}>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
