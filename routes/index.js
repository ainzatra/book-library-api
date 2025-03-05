import express from "express";
// import transactions from "./pages/transactions.js";
import apiRoutes from "./api/index.js";
// import page404 from "./page-404.js";

const router = express.Router();

// pages routes
// router.use(transactions);

// api routes
router.use("/api", apiRoutes);

// page 404
// router.use(page404);

// Correct export for ES Modules
export default router;
