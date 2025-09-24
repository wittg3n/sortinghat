"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserProfile = fetchUserProfile;

// services/userService.js
function fetchUserProfile(token) {
  var res;
  return regeneratorRuntime.async(function fetchUserProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (token) {
            _context.next = 2;
            break;
          }

          throw new Error("No token provided");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("http://localhost:5000/api/v1/users/profile", {
            headers: {
              Authorization: "Bearer ".concat(token)
            },
            credentials: "include"
          }));

        case 4:
          res = _context.sent;

          if (res.ok) {
            _context.next = 7;
            break;
          }

          throw new Error("Failed to fetch user profile: ".concat(res.status));

        case 7:
          return _context.abrupt("return", res.json());

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}