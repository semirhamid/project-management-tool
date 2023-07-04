"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var product_1 = require("./handlers/product");
var update_1 = require("./handlers/update");
var router = (0, express_1.Router)();
router.get("/product", product_1.getProducts);
router.get("/product/:id", product_1.getOneProduct);
router.post("/product", (0, express_validator_1.body)("name").isString(), middleware_1.inputErrorHandler, product_1.createProduct);
router.put("/product/:id", (0, express_validator_1.body)("name").isString(), product_1.updateProduct);
router.delete("/product/:id", product_1.deleteProduct);
router.get("/update", update_1.getUpdates);
router.get("/update/:id", update_1.getOneUpdate);
router.post("/update", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("body").isString(), (0, express_validator_1.body)("status").isIn(["IN_PROGRESS", "SHIPPING", "DEPRECATED"]), (0, express_validator_1.body)("version").isString().optional(), (0, express_validator_1.body)("assets").isString().optional(), (0, express_validator_1.body)("productId").exists().isString(), middleware_1.inputErrorHandler, update_1.createUpdate);
router.put("/update/:id", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("body").isString(), (0, express_validator_1.body)("status").isIn(["IN_PROGRESS", "SHIPPING", "DEPRECATED"]), (0, express_validator_1.body)("version").isString().optional(), (0, express_validator_1.body)("assets").isString().optional(), (0, express_validator_1.body)("productId").exists().isString(), middleware_1.inputErrorHandler, update_1.updateUpdate);
router.delete("/update/:id", update_1.deleteUpdate);
router.get("/updatepoint", function (req, res) { });
router.get("/updatepoint/:id", function (req, res) { });
router.post("/updatepoint", (0, express_validator_1.body)("name").exists().isString(), (0, express_validator_1.body)("description").exists().isString(), (0, express_validator_1.body)("updateId").exists().isString(), function (req, res) { });
router.put("/updatepoint/:id", (0, express_validator_1.body)("name").optional().isString(), (0, express_validator_1.body)("description").optional().isString(), (0, express_validator_1.body)("updateId").optional().isString(), function (req, res) { });
router.delete("/updatepoint:id", function (req, res) { });
router.use(function (err, req, res, next) {
    if (err.type == "auth") {
        res.status(401).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map