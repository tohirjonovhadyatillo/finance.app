import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

import { login as _login } from "../app/features/userSlice";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password) => {
    setIsPending(true);
    try {
      const req = await signInWithEmailAndPassword(auth, email, password);

      const user = req.user;
      dispatch(_login(user));
      setUser(user);
    } catch (err) {
      console.error("Registration error:", err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { user, login, isPending };
};
