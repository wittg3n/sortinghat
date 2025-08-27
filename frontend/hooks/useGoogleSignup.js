import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const useGoogleSignup = () => {
  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code", // 🔑 must use auth-code for id_token
    onSuccess: async (codeResponse) => {
      console.log("Google code response:", codeResponse);
      try {
        // send code to your backend to exchange for id_token and/or access_token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/google/signup`,
          { code: codeResponse.code } // send auth code
        );
        console.log("User signed up:", response.data);
        localStorage.setItem("token", response.data.token);
      } catch (err) {
        console.error(
          "Google signup failed:",
          err.response?.data || err.message
        );
      }
    },
    onError: (err) => console.error("Google login failed:", err),
  });

  return { handleGoogleLogin };
};
