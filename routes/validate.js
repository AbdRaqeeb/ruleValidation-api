import express from 'express';
import { validate } from '../controllers/validate.js';

const router = express.Router();

import { scan } from "../middleware/scan.js";

router.route('/').post(scan, validate);

export default router;