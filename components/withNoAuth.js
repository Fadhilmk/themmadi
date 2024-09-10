import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withNoAuth = (Component) => {
    return function NoAuthRoute(props) {
      const router = useRouter();
  
      useEffect(() => {
        const token = Cookies.get("token");
  
        // If token exists, redirect to the dashboard
        if (token) {
          router.push(`/dashboard/${Cookies.get("userId")}`);
        }
      }, [router]);
  
      // If no token exists, render the login/signup page
      return <Component {...props} />;
    };
  };
  
  export default withNoAuth;