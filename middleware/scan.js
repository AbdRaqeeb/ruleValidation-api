import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";

// scan json payload

export const scan = asyncHandler(async (req, res, next) => {
    const { rule, data } = req.body;

    // check for rule field
    if (!rule) {
        return next(
            new ErrorResponse('rule is required.', 400)
        );
    }

    // check for data field
    if (!data) {
        return next(
            new ErrorResponse('data is required.', 400)
        );
    }


    // check for rule field type
    if (typeof rule !== 'object') {
        return next(
            new ErrorResponse('rule should be an object.', 400)
        );
    }

    // check for rule fields
    const fields = ['field', 'condition', 'condition_value'];

    const result = fields.filter(field => !Object.keys(rule).includes(field));
    if (result.length > 0) {
        return next(
            new ErrorResponse(`rule '${result[0]}' field is required.`, 400)
        );
    }

    // check for accepted conditions
    const conditions = ['eq', 'neq', 'gt', 'gte', 'contains'];
    if (!conditions.includes(rule.condition)) {
        return next (
            new ErrorResponse(`${rule.condition} is not an accepted condition value.`, 400)
        );
    }

    // check for data field type
    if (typeof data !== 'object' && typeof data !== "string" && !Array.isArray(data)) {
        return next(
            new ErrorResponse('data should be an object or a string or an array.', 400)
        );
    }

    // check field specified in the rule object from data passed
    if (typeof data === "object" && !Object.keys(data).includes(rule.field)) {
        return next(
            new ErrorResponse(`field ${rule.field} is missing from data.`, 400)
        );
    }

    if (Array.isArray(data) && +rule.field > data.length - 1) {
        return next(
            new ErrorResponse(`field ${rule.field} is missing from data.`, 400)
        );
    }

    if (typeof data === "string" && +rule.field > data.length - 1) {
        return next(
            new ErrorResponse(`field ${rule.field} is missing from data.`, 400)
        );
    }

    next();
});