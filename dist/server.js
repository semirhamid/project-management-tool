"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", function (req, res) {
    res.status(200);
    res.json({ message: "Hello from server" });
});
app.use("/api", auth_1.protectJwt, router_1.default);
app.use("/signup", user_1.createNewUser);
app.use("/signin", user_1.signin);
app.use(function (err, req, res, next) {
    if (err.type == "auth") {
        res.status(401).json({ message: "Invalid username or password" });
    }
    else if (err.type == "input") {
        res.status(400).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map