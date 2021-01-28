import express from 'express';
import { base } from "../controllers/base.js";

const router = express.Router();

router.route('/').get(base);

export default router;