"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config_1 = __importDefault(require("./config"));
server_1.default.listen(config_1.default.port, function () {
    console.log("Server listening on port http://localhost:".concat(config_1.default.port));
});
//# sourceMappingURL=index.js.map