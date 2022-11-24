import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Login = () => {
  const { loginUserEmailPassword, googleLogin, setLoading, loading } =
    useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginData, setloginData] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = (loginData) => {
    setLoginError("");
    console.log(loginData);
    loginUserEmailPassword(loginData.email, loginData.password)
      .then((res) => {
        const user = res.user;
        const currentUser = {
          email: user.email,
        };
        fetch("https://bookroy-book-resale-market-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("bookroy-token", data.token);
          });
        navigate(from, { replace: true });
        setLoginUserEmail(loginData.email);
      })
      .catch((err) => {
        console.log(err.message);
        setLoginError(err.message);
      });
  };
  const provider = new GoogleAuthProvider();
  const handelGoogleLogin = () => {
    googleLogin(provider)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email,
        };
        fetch("https://bookroy-book-resale-market-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("bookroy-token", data.token);
          });

        navigate(from, { replace: true });
        toast.success(`Hello, ${user.displayName}. Signup Successed`);
        // const userData = {
        //   userName: user.displayName,
        //   userEmail: user?.email,
        //   photoURL: user?.photoURL,
        //   userRole: "buyer",
        // };

        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        navigate(from, { replace: true });
      });
  };
  return (
    <div>
      <div className="hero-content flex-col">
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="card-body">
            <h3 className="text-center text-2xl">Login</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email Address is required",
                })}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password need to be minimum 6 character",
                  },
                })}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              {loginError && (
                <p className="label-text-alt mt-1 text-red-700">{loginError}</p>
              )}
              {/* <label className="label">
                <Link to="/forgot" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label> */}
            </div>

            <div className="form-control mt-2">
              <input className="btn" value="Login" type="submit" />
            </div>
            <p>
              New to Hello Doctor?
              <Link to="/signup" className="text-secondary pl-1">
                Create new account
              </Link>
            </p>
            <div className="divider">OR</div>
            <button onClick={handelGoogleLogin} className="btn btn-outline">
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
