"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validator2 = _interopRequireDefault(require("validator"));

var _libphonenumberJs = require("libphonenumber-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// models/User.js
var otpSchema = new _mongoose["default"].Schema({
  code: String,
  purpose: {
    type: String,
    "enum": ["phone", "email"]
  },
  expiresAt: Date,
  tries: {
    type: Number,
    "default": 0
  }
});
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    validate: {
      validator: function validator(v) {
        return _validator2["default"].isEmail(v);
      },
      message: "Invalid email address"
    }
  },
  emailVerified: {
    type: Boolean,
    "default": false
  },
  phone: {
    type: String,
    index: true,
    validate: {
      validator: function validator(v) {
        if (!v) return true;
        var pn = (0, _libphonenumberJs.parsePhoneNumberFromString)(v);
        return pn ? pn.isValid() : false;
      },
      message: "Invalid phone number"
    }
  },
  phoneVerified: {
    type: Boolean,
    "default": false
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  },
  role: {
    type: String,
    "enum": ["user", "admin"],
    "default": "user"
  },
  documents: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Document"
  }],
  suggestions: [{
    universityId: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "University"
    },
    score: Number,
    createdAt: {
      type: Date,
      "default": Date.now
    },
    source: String
  }],
  lastSeen: {
    type: Date,
    "default": Date.now
  },
  otp: otpSchema
}, {
  timestamps: true
}); // Hash password

userSchema.pre("save", function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified("password")) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(this.password, salt));

        case 6:
          this.password = _context.sent;

        case 7:
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

userSchema.methods.isValidPassword = function _callee2(password) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, this.password));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;