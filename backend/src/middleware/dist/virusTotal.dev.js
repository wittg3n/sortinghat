"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanFileWithVirusTotal = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _fs = _interopRequireDefault(require("fs"));

var _formData = _interopRequireDefault(require("form-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var scanFileWithVirusTotal = function scanFileWithVirusTotal(filePath) {
  var form, res;
  return regeneratorRuntime.async(function scanFileWithVirusTotal$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          form = new _formData["default"]();
          form.append("file", _fs["default"].createReadStream(filePath));
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post("https://www.virustotal.com/api/v3/files", form, {
            headers: _objectSpread({
              "x-apikey": process.env.VIRUSTOTAL_API_KEY
            }, form.getHeaders()),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
          }));

        case 5:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("VirusTotal scan failed:", _context.t0.message);
          throw new Error("Virus scan failed");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.scanFileWithVirusTotal = scanFileWithVirusTotal;