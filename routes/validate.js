import express from 'express';
import { validate } from '../controllers/validate.js';

const router = express.Router();

import { scan } from "../middleware/scan";

router.route('/').post(scan, validate);

export default router;