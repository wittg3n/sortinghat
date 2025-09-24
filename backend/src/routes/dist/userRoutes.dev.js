"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _userController = _interopRequireDefault(require("../controllers/userController.js"));

var _upload = _interopRequireDefault(require("../middleware/upload.js"));

var _path = _interopRequireDefault(require("path"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // http://localhost:5000/api/v1/user/upload/profile-picture


router.post("/profile-picture", _passport["default"].authenticate("jwt", {
  session: false
}), _upload["default"].single("profilePicture"), _userController["default"].uploadProfilePictureWithScan);
var _default = router;
exports["default"] = _default;