import { check } from 'express-validator';
import { validateResult } from '../helpers/validateHelpers.js';

const validateCreate = [
    check('firstname').not().isEmpty().withMessage('please fill this camp').exists().withMessage ('Firstname is required'),

    check('lastname').not().isEmpty().withMessage('please fill this camp').exists().withMessage ('Lastname is required'),

    check('lastname').not().isEmpty().withMessage('please fill this camp').exists().withMessage ('Lastname is required').isLength({ min: 5, max: 20}).withMessage('Please enter minimum 8 characters or maximun 20 characters  '),
    check('phone').not().isEmpty().withMessage('please fill this camp').exists().isNumeric().withMessage('Please only enter numbers').isLength({ min: 8, max: 8 }).withMessage('Please enter minimun 8 characters or maximun 8 characters'),
    check('dateofbirth').not().isEmpty().withMessage('please fill this camp').toDate().optional({ checkFalsy: true}).withMessage('Please enter valid dateofbirth'),
    check('email').exists().isEmail().withMessage('Please enter valid email'),
            (req, res, next) => {
        validateResult(req, res, next);

            validateResult(req, res, next)


    }

]

export { validateCreate }
