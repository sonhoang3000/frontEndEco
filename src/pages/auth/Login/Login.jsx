import { useFormik } from "formik";
import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import loginImage from "../../../assets/img/loginImg.jpeg";
import logo from "../../../assets/img/logo_mealmate.png";
import { userLogin } from "../../../services/userService";
import "./Login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Tên đăng nhập không được để trống"),
  password: Yup.string().required("Mật khẩu không được để trống"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigator = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await userLogin({
          email: values.email,
          password: values.password,
        });
        if (response.errCode === 0) {
          toast.success("Đăng nhập thành công!");
          localStorage.setItem("user", JSON.stringify(response.user));
          navigator("/");
        } else {
          toast.error("Thông tin tài khoản hoặc mật khẩu không chính xác!");
          setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác.");
        }
      } catch (error) {
        setErrorMessage("Đã xảy ra lỗi trong quá trình đăng nhập.");
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="logo__wrappwer">
        <img src={logo} alt="Delicious meal" className="meal__logo" />
        <span className="logo__title">MEAL MATE</span>
      </div>

      <div className="login__content">
        <div className="login__wrapper">
          <img src={loginImage} alt="Delicious meal" className="meal-image" />

          <div className="login__form">
            <h2 className="login__title">Đăng nhập</h2>
            <form onSubmit={formik.handleSubmit}>
              <div
                className="input-field"
                style={{
                  borderColor: formik.errors.email ? "red" : null,
                  borderWidth: formik.errors.email ? "1px" : null,
                  borderStyle: formik.errors.email ? "double" : null,
                }}
              >
                <FaUser />
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>

              <div
                className="input-field"
                style={{
                  borderColor: formik.errors.password ? "red" : null,
                  borderWidth: formik.errors.password ? "1px" : null,
                  borderStyle: formik.errors.password ? "double" : null,
                }}
              >
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>

              <div className="login-links">
                <a href="#">Quên mật khẩu?</a>
                <Link to="/register">Bạn chưa có tài khoản? Đăng Kí?</Link>
              </div>

              <button type="submit">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
