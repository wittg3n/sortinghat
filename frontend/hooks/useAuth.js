"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const authenticate = async (endpoint, body) => {
    setLoading(true);
    setError("");

    try {
      console.log(body);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Authentication failed");
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      router.push("/profile"); // Redirect on success
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    return authenticate("http://localhost:5000/api/users/login", credentials);
  };

  const signup = async (credentials) => {
    return authenticate("http://localhost:5000/api/users/signup", credentials);
  };

  return { login, signup, loading, error };
}
