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
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include", // send cookies automatically
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Authentication failed");
      }

      // Success: no need to store token manually
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = (credentials) =>
    authenticate("http://localhost:5000/api/v1/users/login", credentials);

  const signup = (credentials) =>
    authenticate("http://localhost:5000/api/v1/users/signup", credentials);

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/v1/users/logout", {
        method: "DELETE",
        credentials: "include",
      });
      router.push("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, logout, loading, error };
}
