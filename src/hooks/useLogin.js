import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { login as _login } from "../app/features/userSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null); // Added error state to manage errors

  const login = async (email, password) => {
    setIsPending(true);
    setError(null); // Reset previous error before attempting login
    try {
      // Check if user is already logged in (optional)
      if (user) {
        console.log("User already logged in.");
        return; // Prevent making an unnecessary login request
      }

      const req = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = req.user;
      dispatch(_login(loggedInUser));
      setUser(loggedInUser);
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message); // Set the error message to state for better UX
    } finally {
      setIsPending(false);
    }
  };

  return { user, login, isPending, error }; // Return error to display on UI
};
