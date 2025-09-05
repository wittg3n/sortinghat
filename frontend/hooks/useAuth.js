"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastId, setToastId] = useState(null);
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
        credentials: "include", // 👈 important!
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

      router.push("/dashboard"); // Redirect on success
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    return authenticate(
      "http://localhost:5000/api/v1/users/login",
      credentials
    );
  };

  const signup = async (credentials) => {
    return authenticate(
      "http://localhost:5000/api/v1/users/signup",
      credentials
    );
  };

  return { login, signup, loading, error };
}
