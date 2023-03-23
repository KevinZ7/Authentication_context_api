import axios from "../../../api/axios";
import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schema";
import { formValues } from "../../../shared/interfaces/login";
import useAuth from "../../../hooks/useAuth";
import { AuthData } from "../../../shared/interfaces/auth";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "/login/";



const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();


  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      loginFailed: false
    },
    validationSchema: basicSchema,
    onSubmit: async (values: formValues, actions: any) => {
      console.log("logging in");
      try {
        const response = await axios.post(LOGIN_URL, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        const access = response?.data?.access;
        const refresh = response?.data?.refresh;
  
        setAuth({access,refresh,loggedIn: true});

        navigate("/userlist");
      } catch (err) {
        console.log(err);
        actions.setErrors({ loginFailed: true });
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={values.username}
          onChange={handleChange}
          id="username"
          type="text"
          placeholder="username"
          onBlur={handleBlur}
          className={errors.username && touched.username ? "input-error" : ""}
        />
        {errors.username && touched.username && (
          <p className="error">{errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          value={values.password}
          onChange={handleChange}
          id="password"
          type="password"
          placeholder="password"
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
      </div>

      {errors.loginFailed && <div>Login Failed</div>}
      
      <button disabled={isSubmitting} type="submit">
        Login
      </button>

      {isSubmitting && <p>Logging in...</p>}

    </form>
  );
};

export default LoginForm;
