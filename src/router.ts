import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { inputErrorHandler } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { create } from 'domain';

const router = Router();

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post("/product", body("name").isString(), inputErrorHandler, createProduct);
router.put("/product/:id", body("name").isString(), updateProduct);
router.delete("/product/:id", deleteProduct);


router.get("/update",getUpdates);
router.get("/update/:id", getOneUpdate);
router.post("/update",
    body("title").isString(),
    body("body").isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPING", "DEPRECATED"]),
    body("version").isString().optional(),
    body("assets").isString().optional(),
    body("productId").exists().isString(),
    inputErrorHandler,
    createUpdate);
router.put("/update/:id",
    body("title").isString(),
    body("body").isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPING", "DEPRECATED"]),
    body("version").isString().optional(),
    body("assets").isString().optional(),
    body("productId").exists().isString(),
    inputErrorHandler,
    updateUpdate);
router.delete("/update/:id", deleteUpdate);


router.get("/updatepoint", (req, res) => { });
router.get("/updatepoint/:id", (req, res) => { });
router.post("/updatepoint", body("name").exists().isString(), body("description").exists().isString(), body("updateId").exists().isString(), (req, res) => { });
router.put("/updatepoint/:id", body("name").optional().isString(), body("description").optional().isString(), body("updateId").optional().isString(), (req, res) => { });
router.delete("/updatepoint:id", (req, res) => { });

router.use((err, req, res, next) => {
    if (err.type == "auth") {
        res.status(401).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message });
    }
})

export default router;