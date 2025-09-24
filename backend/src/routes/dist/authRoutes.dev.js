"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _userController = _interopRequireDefault(require("../controllers/userController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Signup route


router.post("/signup", _userController["default"].signup);
router.post("/login", _passport["default"].authenticate("local", {
  session: false
}), _userController["default"].login); // Protected routes - use JWT strategy

router.get("/profile", _passport["default"].authenticate("jwt", {
  session: false
}), _userController["default"].getProfile);
router.get("/loggedin", _passport["default"].authenticate("jwt", {
  session: false
}), _userController["default"].isLoggedIn);
router["delete"]("/logout", _userController["default"].logout);
router.post("/validate-token", _userController["default"].tokenValidator);
var _default = router;
exports["default"] = _default;