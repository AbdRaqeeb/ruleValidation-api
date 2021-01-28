import asyncHandler from "../middleware/async.js";



/**
 * @desc    Base Route
 * @route   GET '/'
 * @access  Public
 * **/
export const base = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: 'My Rule-Validation API',
        status: 'success',
        data: {
            name: 'Abdur-Raqeeb Adewale Ajao',
            github: '@AbdRaqeeb',
            email: 'Ajaorqb@gmail.com',
            mobile: '07062186100',
            twitter: '@Roqmania'
        }
    });
});