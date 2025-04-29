import './LoginAdmin.css';
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const LoginAdmin = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Add this to prevent logged-in users from accessing login page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (isLoggedIn) {
      if (userRole === 'admin') {
        navigate("/Admin/Products");
      } else {
        navigate("/Home");
      }
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(Admin\.com|gmail\.com)$/,
        "Email must be in the format xxx@gmail.com"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const handleLogin = async (values) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'user');
        setSuccessMessage("Login completed successfully");
        setTimeout(() => navigate("/Home"), 1500);
        return;
      }

      const response = await fetch(
        `${BASE_URL}/users?email=${values.email}&password=${values.password}`
      );
      const users = await response.json();

      if (users.length > 0) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        setSuccessMessage("Login completed successfully");
        setTimeout(() => navigate("/Admin/Products"), 1500);
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error", error);
      setLoginError("An error occurred while trying to log in.");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleLogin(values).finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {successMessage}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          <Form className="login-container">
            <h1>Login</h1>
            <hr />
            {loginError && <div className="error">{loginError}</div>}
            <div>
              <label htmlFor="email">Email Address</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            <div className="mt-3">
              <p>
              
                Don't have an account? <Link to="/RegisterUser">Register here</Link>
              </p>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginAdmin;
