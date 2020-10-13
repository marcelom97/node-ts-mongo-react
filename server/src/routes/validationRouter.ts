import express from 'express';

import {
  validateDuplicateEmail,
  validateDuplicateUsername
} from '../controllers/validationController';

const router = express.Router();

router.route('/checkemail/:email').get(validateDuplicateEmail);
router.route('/checkusername/:username').get(validateDuplicateUsername);

export { router as validationRouter };
