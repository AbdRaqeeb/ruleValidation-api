import asyncHandler from "../middleware/async.js";
import { validation } from "../services/validation.js";


/**
 * @desc    Validate rule
 * @route   POST '/validate-rule'
 * @access  Public
 * */
export const validate = asyncHandler(async (req, res, next) => {
    const result = validation(req.body);

    res.status(result.statusCode).json({
        message: result.message,
        status: result.status,
        data: {
            validation: {
                error: result.data.validation.error,
                field: result.data.validation.field,
                field_value: result.data.validation.field_value,
                condition: result.data.validation.condition,
                condition_value: result.data.validation.condition_value
            }
        }
    });
});



