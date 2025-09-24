"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("./schema/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// seedAdmin.js
_dotenv["default"].config({
  path: path.resolve(__dirname, "../.env")
});

// مسیر را مطابق ساختار پروژه‌تون تنظیم کنید
var MONGO_URI = process.env.MONGO_URI;
var ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin";
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

function main() {
  var existing, saltRounds, hash, adminUser;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!MONGO_URI) {
            console.error("MONGO_URI در فایل .env تنظیم نشده.");
            process.exit(1);
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: ADMIN_EMAIL
          }));

        case 6:
          existing = _context.sent;

          if (!existing) {
            _context.next = 12;
            break;
          }

          console.log("\u06A9\u0627\u0631\u0628\u0631 \u0628\u0627 \u0627\u06CC\u0645\u06CC\u0644 \"".concat(ADMIN_EMAIL, "\" \u0627\u0632 \u0642\u0628\u0644 \u0648\u062C\u0648\u062F \u062F\u0627\u0631\u062F. id: ").concat(existing._id));
          _context.next = 11;
          return regeneratorRuntime.awrap(_mongoose["default"].disconnect());

        case 11:
          return _context.abrupt("return");

        case 12:
          saltRounds = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(ADMIN_PASSWORD, saltRounds));

        case 15:
          hash = _context.sent;
          adminUser = new _User["default"]({
            email: ADMIN_EMAIL,
            password: hash,
            role: "admin"
          });
          _context.next = 19;
          return regeneratorRuntime.awrap(adminUser.save());

        case 19:
          console.log("کاربر admin ساخته شد:", {
            email: ADMIN_EMAIL,
            id: adminUser._id
          });
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](3);
          console.error("خطا هنگام ایجاد admin:", _context.t0);

        case 25:
          _context.prev = 25;
          _context.next = 28;
          return regeneratorRuntime.awrap(_mongoose["default"].disconnect());

        case 28:
          return _context.finish(25);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 22, 25, 29]]);
}

main(); //change .env file and make admin user and password
// then use this command node --experimental-json-modules seedAdmin.js