import { useEffect, useContext } from "react";
import { AuthContext } from "../pages/AuthContext";

const AuthChecker = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:4000/user/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user); // Update context with logged-in user
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Login check failed:", err);
        setUser(null);
      }
    };

    checkLogin();
  }, [setUser]);

  return null; 
};

export default AuthChecker;
