import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
const SignUp = () => {
  const { createUser, updateName, googleLogin, setUser, setLoading, loading } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signupData, setsignupData] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const imgbbApi = process.env.REACT_APP_imgbbApi;
  const handleSignup = (signupData) => {
    setLoading(true);
    const image = signupData.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbApi}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const photoURL = imageData.data.url;
          createUser(signupData.email, signupData.password).then((result) => {
            const user = result.user;

            updateName(signupData.name, imageData.data.url).then(() => {
              setUser({ ...user, displayName: signupData.name, photoURL });
              const currentUser = {
                email: user.email,
              };

              fetch("http://localhost:5000/jwt", {
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
              saveUser(
                signupData.name,
                signupData.email,
                photoURL,
                signupData.userRole
              );
              toast.success(`Hello, ${user.displayName}. Signup Successed`);

              setLoading(false);
              navigate(from, { replace: true });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        navigate(from, { replace: true });
      });
  };
  const saveUser = (userName, userEmail, photoURL, userRole) => {
    const user = { userName, userEmail, photoURL, userRole };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(userEmail);
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
        fetch("http://localhost:5000/jwt", {
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
        saveUser(user.displayName, user.email, user.photoURL, "buyer");
        navigate(from, { replace: true });
        toast.success(`Hello, ${user.displayName}. Signup Successed`);

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>SignUp - BookRoy</title>
        <meta name="description" content="Signup for bookroy account" />
      </Helmet>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="hero-content flex-col">
          <form
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            onSubmit={handleSubmit(handleSignup)}
          >
            <div className="card-body">
              <h3 className="text-center text-2xl">Sign Up</h3>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <p className="label-text-alt mt-1 text-red-700">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <p className="label-text-alt mt-1 text-red-700">
                    {errors.email?.message}
                  </p>
                )}
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
                {errors.password && (
                  <p className="label-text-alt mt-1 text-red-700">
                    {errors.password?.message}
                  </p>
                )}
                {/* <label className="label">
                <Link to="/forgot" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label> */}
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Select Your Purpose</span>
                </label>
                <>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    {...register("userRole", {
                      required: "This field is required",
                    })}
                  >
                    <option value="buyer">I am a Buyer</option>
                    <option value="seller">I am A seller</option>
                  </select>
                </>
              </div>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  {...register("image", {
                    required: "image is required",
                  })}
                  type="file"
                  className="file-input w-full max-w-xs"
                />
                {errors.image && (
                  <p className="label-text-alt mt-1 text-red-700">
                    {errors.image?.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-2">
                <input className="btn" value="Signup" type="submit" />
              </div>
              <p>
                Already have an account?
                <Link to="/login" className="btn btn-xs m-2">
                  Log In
                </Link>
              </p>
              <div className="divider">OR</div>
              <button onClick={handelGoogleLogin} className="btn btn-outline">
                CONTINUE WITH GOOGLE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
