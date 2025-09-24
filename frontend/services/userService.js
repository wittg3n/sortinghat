// services/userService.js
export async function fetchUserProfile(token) {
  if (!token) throw new Error("No token provided");

  const res = await fetch("http://localhost:5000/api/v1/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user profile: ${res.status}`);
  }

  return res.json();
}
