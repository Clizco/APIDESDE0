import { check } from 'express-validator';
import { validateResult } from '../helpers/validateHelpers.js';

const validateCreate = [
    check('firstname')
        .exists()
        .not()
        .isEmpty(),
    check('lastname')
        .exists()
        .not()
        .isEmpty(),
    check('phone')
        .exists()
        .isNumeric(),
    check('dateofbirth')
        .exists()
        .isNumeric(),
    check('email')
        .exists()
        .isEmail(),
        (req, res, next) => {
            validateResult(req, res, next)

        }

]

export { validateCreate }