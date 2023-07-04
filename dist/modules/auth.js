"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectJwt = exports.createJwt = exports.comparePassword = exports.hashPassword = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var hashPassword = function (password) {
    return bcrypt_1.default.hashSync(password, 10);
};
exports.hashPassword = hashPassword;
var comparePassword = function (password, hash) {
    return bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
var createJwt = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJwt = createJwt;
var protectJwt = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    var authorization = bearer.split(" ");
    var token = authorization[1];
    if (!token) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.protectJwt = protectJwt;
//# sourceMappingURL=auth.js.map