import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useFireStore } from "./useFireStore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../app/features/userSlice";

export const useSignOut = () => {
  const [isPending, setIsPending] = useState(false);
  const { updateDocument } = useFireStore("users");
  const dispatch = useDispatch();

  const signout = async () => {
    try {
      setIsPending(true);
      const user = auth.currentUser;

      if (!user) {
        throw new Error("user not found, try again");
      }

      const displayName = user.displayName || "Anonymous";

      await updateDocument(user.uid, { isOnline: false });
      await signOut(auth);
      dispatch(logOut());
    } catch (error) {
    } finally {
      setIsPending(false);
    }
  };

  return { signout, isPending };
};
