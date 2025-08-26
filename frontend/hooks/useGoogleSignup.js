import { useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const useGoogleSignup = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/google/signup`,
          { token: tokenResponse.access_token },
          { withCredentials: true }
        );
        console.log("User signed up:", response.data);
      } catch (err) {
        console.error("Google signup failed:", err);
      }
    },
    onError: (err) => console.error("Login Failed:", err),
  });

  return { handleGoogleLogin };
};
