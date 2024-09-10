
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true); // User is authenticated
        } else {
          router.push("/login"); // Redirect to login if not authenticated
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Show loading screen while checking authentication
    }

    return authenticated ? <Component {...props} /> : null;
  };
};

export default withAuth;
