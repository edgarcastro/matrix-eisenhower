import { useEffect, useState, useTransition } from "react";
import { auth } from "../firebase";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setIsAuthenticated(auth.currentUser !== null);
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
    });
  }, []);

  return { isAuthenticated, isPending };
};
