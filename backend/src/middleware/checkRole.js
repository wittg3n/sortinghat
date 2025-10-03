// middleware/checkRole.js

/**
 * Role-based access control middleware.
 * @param {Array<string>} roles - Allowed roles (e.g., ["admin"], ["user", "admin"])
 */
export const checkRole = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: no user found" });
      }

      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient role" });
      }

      next();
    } catch (err) {
      console.error("Role check error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
};
