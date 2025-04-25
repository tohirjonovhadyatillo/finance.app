import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { login } from "../app/features/userSlice";
import { useDispatch } from "react-redux";

export const useRegister = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const register = async (email, password, displayName) => {
    setIsPending(true);
    try {
      const req = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL:
          "https://api.dicebear.com/9.x/croodles/svg?seed=" + displayName,
      });
      const user = req.user;
      console.log(user);
      dispatch(login(user));
      setUser(user);
    } catch (err) {
      console.error("Registration error:", err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { user, register, isPending };
};
