import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { USER_LOGO, BRAND_LOGO } from "../utils/constants";
const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName } = user;
        dispatch(addUser({ email, uid, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div className=" absolute flex justify-between items-center w-full pt-2 pl-4">
      <div>
        <img
          className=" w-[200px]  bg-gradient-to-b from-black"
          src={BRAND_LOGO}
          alt="logo"
        />
      </div>
      {user && (
        <div className=" flex justify-start gap-2">
          <div>
            <img src={USER_LOGO} />
          </div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
};
export default Header;
