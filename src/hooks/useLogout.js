
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/config";
import { logout as _logout } from "../app/features/userSlice";
import { useState } from "react";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setIsPending(true);
    setError(null);
    try {
      await signOut(auth);
      dispatch(_logout());
    } catch (err) {
      console.error("Logout error:", err?.message || "Something went wrong");
      setError(err?.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending, error };
};
