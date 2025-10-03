"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRole = void 0;

// middleware/checkRole.js

/**
 * Role-based access control middleware.
 * @param {Array<string>} roles - Allowed roles (e.g., ["admin"], ["user", "admin"])
 */
var checkRole = function checkRole() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized: no user found"
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Forbidden: insufficient role"
        });
      }

      next();
    } catch (err) {
      console.error("Role check error:", err);
      res.status(500).json({
        message: "Server error"
      });
    }
  };
};

exports.checkRole = checkRole;