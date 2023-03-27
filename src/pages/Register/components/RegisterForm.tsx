import React from "react";
import axios from "../../../api/axios";
import { useFormik } from "formik";
import { basicSchema } from "../schema";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

interface formValues {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_icon?: string | Blob | null;
}

interface loginValues{
  username: string;
  password: string;
}

const REGISTER_URL = "/account/create_user/";
const LOGIN_URL = "/login/";


const RegisterForm = () => {
  const navigate = useNavigate();
  const {setAuth} = useAuth();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      first_name: "",
      last_name: "",
      profile_icon: null
    },
    validationSchema: basicSchema,
    onSubmit: async (values: formValues, actions: any) => {
      console.log("submitting form");
      const {username, password, confirm_password, email, first_name, last_name, profile_icon} = values;
      const formData = new FormData();
    
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email",email);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("profile_icon", profile_icon? profile_icon : "");
      
    
      try {
        const response = await axios.post(REGISTER_URL, formData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    
      console.log("logging in");
    
      const loginCredentials: loginValues = {
        username: email,
        password
      }
    
      try {
        const response = await axios.post(LOGIN_URL, loginCredentials, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response);
        const access = response?.data?.access;
        const refresh = response?.data?.refresh;
        if (response.status === 200){
          setAuth({access,refresh,loggedIn: true});
          navigate("/userlist");
        }
      } catch (err) {
        console.log(err);
      }
       actions.resetForm();
    }
  });

  const imagePreviewUrl = values.profile_icon ? URL.createObjectURL(values.profile_icon) : null;

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
          <p data-testid="input_error" className="error">{errors.username}</p>
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
          <p data-testid="input_error" className="error">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirm_password">Password</label>
        <input
          value={values.confirm_password}
          onChange={handleChange}
          id="confirm_password"
          type="password"
          placeholder="confirm password"
          onBlur={handleBlur}
          className={
            errors.confirm_password && touched.confirm_password
              ? "input-error"
              : ""
          }
        />
        {errors.confirm_password && touched.confirm_password && (
          <p data-testid="input_error" className="error">{errors.confirm_password}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="email"
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p data-testid="input_error" className="error">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="first_name">First name</label>
        <input
          value={values.first_name}
          onChange={handleChange}
          id="first_name"
          type="text"
          placeholder="first name"
          onBlur={handleBlur}
          className={
            errors.first_name && touched.first_name ? "input-error" : ""
          }
        />
        {errors.first_name && touched.first_name && (
          <p data-testid="input_error" className="error">{errors.first_name}</p>
        )}
      </div>

      <div>
        <label htmlFor="last_name">Last name</label>
        <input
          value={values.last_name}
          onChange={handleChange}
          id="last_name"
          type="text"
          placeholder="last name"
          onBlur={handleBlur}
          className={errors.last_name && touched.last_name ? "input-error" : ""}
        />
        {errors.last_name && touched.last_name && (
          <p data-testid="input_error" className="error">{errors.last_name}</p>
        )}
      </div>

      <div>
        <input
          data-testid="upload_profile_icon"
          id="profile_icon"
          name="profile_icon"
          type="file"
          onChange={(event) => {
            if (event.currentTarget.files){
              setFieldValue("profile_icon", event.currentTarget.files[0]);
            }
          }}
        />
        {errors.profile_icon && <div>{errors.profile_icon}</div>}

        <div>
          {imagePreviewUrl && (
            <img src={imagePreviewUrl} alt="profile" width="100" height="100" />
          )}
        </div>
      </div>

      <button disabled={isSubmitting} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
