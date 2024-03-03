import { useState } from "react";
import Header from "./Header";
import { emailRegex, passwordRegex } from "../utils/validate";
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
  });
  const [isSignIn, setIsSignIn] = useState(false);
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
    console.log("submitted!!!");
  }
  function switchSignIn() {
    setError({
      email: "",
      password: "",
      fullName: "",
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
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="netflix-background-img"
        className="w-full"
      />
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
          <button
            type="button"
            onClick={submit}
            className="text-white rounded-[3px] text-base block w-full py-1 bg-primary-main hover:bg-primary-shade"
          >
            {isSignIn ? 'Sign Up':'Sign In'}
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
