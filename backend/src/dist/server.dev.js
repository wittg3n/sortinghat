"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _db = require("./config/db.js");

require("./config/passport.js");

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _userUploadRoutes = _interopRequireDefault(require("./routes/userUploadRoutes.js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 5000; // Security

app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
})); // CORS

app.use((0, _cors["default"])({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
})); // Parse JSON

app.use(_express["default"].json());
app.use((0, _cookieParser["default"])()); // Passport

app.use(_passport["default"].initialize()); // Routes

app.use("/api/v1/users", _authRoutes["default"]);
app.use("/api/v1/user/upload/", _userUploadRoutes["default"]);
app.use("/uploads", _express["default"]["static"](_path["default"].join(process.cwd(), "uploads"))); // Root healthcheck

app.get("/", function (req, res) {
  return res.send("Server running");
}); // Error Handling

app.use(function (req, res) {
  return res.status(404).json({
    error: "Not Found"
  });
});
app.use(function (err, req, res, next) {
  console.error("Global error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error"
  });
}); // Retry DB connection

var MAX_RETRIES = 30;
var RETRY_DELAY = 2000;

function startServer() {
  var attempts;
  return regeneratorRuntime.async(function startServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          attempts = 0;

        case 1:
          if (!(attempts < MAX_RETRIES)) {
            _context.next = 21;
            break;
          }

          _context.prev = 2;
          attempts++;
          console.log("Attempt ".concat(attempts, "/").concat(MAX_RETRIES, " to connect DB..."));
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _db.connectDB)());

        case 7:
          console.log("✅ Database connected");
          app.listen(port, function () {
            return console.log("\uD83D\uDE80 Server listening on http://localhost:".concat(port));
          });
          return _context.abrupt("return");

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          console.error("\u274C DB connection failed (attempt ".concat(attempts, ")"), _context.t0.message);
          if (attempts >= MAX_RETRIES) process.exit(1);
          console.log("\u23F3 Retrying in ".concat(RETRY_DELAY / 1000, " seconds..."));
          _context.next = 19;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return setTimeout(resolve, RETRY_DELAY);
          }));

        case 19:
          _context.next = 1;
          break;

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

startServer();
var _default = app;
exports["default"] = _default;