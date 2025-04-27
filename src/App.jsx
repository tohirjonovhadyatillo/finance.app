import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import {
  Budget,
  RecurringBills,
  Login,
  Signup,
  Overview,
  Pots,
  Transactions,
} from "./pages";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { login } from "./app/features/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      setAuthChecked(true);
    });

    return () => unsub();
  }, [dispatch]);

  if (!authChecked) {
    return <div className="loading">Loading...</div>;
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: user ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Overview /> },
        { path: "pots", element: <Pots /> },
        { path: "transactions", element: <Transactions /> },
        { path: "budget", element: <Budget /> },
        { path: "recurringBills", element: <RecurringBills /> },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
