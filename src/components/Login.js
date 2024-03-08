import { useState } from "react";
import Header from "./Header";
import { emailRegex, passwordRegex } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    fullName: "",
    genric: "",
  });
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleInputBox(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }
  function validateForm() {
    let flag = false;
    let errorMsg = {};
    if (!emailRegex(user.email) || !user.email) {
      errorMsg.email = "Please enter a valid email address.";
      flag = true;
    }
    if (!passwordRegex(user.password) || !user.password) {
      errorMsg.password =
        "Your password must be strong and should contain between 6 and 16 characters.";
      flag = true;
    }
    if (isSignIn) {
      if (!user.fullName || user.fullName.length <= 4) {
        errorMsg.fullName = "Your fullName must have atleast 4 characters";
        flag = true;
      }
    }
    setError(errorMsg);
    return flag;
  }
  function submit() {
    //reset form before validating
    setError({
      email: "",
      password: "",
      fullName: "",
    });
    if (validateForm()) return;
    if (isSignIn) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const userInfo = userCredential.user;
          console.log(userInfo);
          updateProfile(userInfo, {
            displayName: user.fullName,
          })
            .then((res) => {
              console.log(res);
              console.log("profile updated");
              const { email, uid, displayName } = auth.currentUser;
              dispatch(addUser({ email, uid, displayName }));
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error)
            });
        })
        .then((userCredential) => {
          // Signed up
          /* const user = userCredential.user;
          console.log(user); */
          // ...
        })
        .catch((error) => {
          /* const errorCode = error.code; */
          const errorMessage = error.message;
          setError({ ...error, genric: errorMessage });
        });
    } else {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          /* const errorCode = error.code; */
          const errorMessage = error.message;
          setError({ ...error, genric: errorMessage });
        });
    }
  }
  function switchSignIn() {
    setError({
      email: "",
      password: "",
      fullName: "",
      genric: "",
    });
    setUser({
      email: "",
      password: "",
      fullName: "",
    });
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
      <Header />
      <div className="absolute top-0 left-0 h-screen w-screen -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="netflix-background-img"
          className="w-full h-full object-cover"
        />
      </div>
      <form className="bg-black max-w-[350px] bg-opacity-90  w-full absolute top-32 left-1/2 -translate-x-1/2  px-9 py-9 pb-14">
        <h1 className="text-white font-bold text-2xl mb-7">
          {isSignIn ? "Sign Up" : "Sign In"}
        </h1>
        <div>
          {isSignIn && (
            <div className="mb-3">
              <input
                value={user.fullName}
                type="text"
                className="block rounded-[3px] w-full h-[30px] text-white mb-[5px]"
                placeholder="Full Name"
                name="fullName"
                onChange={(e) => {
                  handleInputBox(e);
                }}
              />
              <div className="text-red text-xs">{error.fullName}</div>
            </div>
          )}
          <div className=" mb-3 ">
            <input
              value={user.email}
              type="text"
              className="block rounded-[3px] w-full h-[30px] text-white mb-[5px]"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                handleInputBox(e);
              }}
            />
            <div className="text-red text-xs">{error.email}</div>
          </div>
          <div className=" mb-3 ">
            <input
              value={user.password}
              type="password"
              name="password"
              className="block rounded-[3px] w-full h-[30px] mb-[5px]"
              placeholder="Password"
              onChange={(e) => {
                handleInputBox(e);
              }}
            />
            <div className="text-red text-xs">{error.password}</div>
          </div>
          <div className=" mb-3 text-red text-xs">{error.genric}</div>
          <button
            type="button"
            onClick={submit}
            className="text-white rounded-[3px] text-base block w-full py-1 bg-primary-main hover:bg-primary-shade"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
          <div className=" text-white mt-6">
            {isSignIn ? (
              <span>
                Already an User?{" "}
                <button
                  type="button"
                  className=" underline"
                  onClick={switchSignIn}
                >
                  Sign In now
                </button>
              </span>
            ) : (
              <span>
                New User?{" "}
                <button
                  type="button"
                  className=" underline"
                  onClick={switchSignIn}
                >
                  Sign Up now
                </button>
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
