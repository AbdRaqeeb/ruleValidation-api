import asyncHandler from "../middleware/async.js";
import {equal, isContain, greater, greaterOrEqual, notEqual} from "../utils/evaluations.js";


/**
 * @desc    Validate rule
 * @route   POST '/validate-rule'
 * @access  Public
 * */
export const validate = asyncHandler(async (req, res, next) => {
    const {rule, data} = (req.body);

    // check type of data that is received
    const type = checkType(data);

    // data of type 'string'
    if (type === 'string') {
        let arr = data.split('');

        // equals
        if (rule.condition === 'eq') {
            const result = equal(arr[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result, res);
        }

        // not equals
        if (rule.condition === 'neq') {
            const result = notEqual(arr[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result, res);
        }

        // greater && greater than or equal to
        if (rule.condition === 'gt' || rule.condition === 'gte') {
            const result = rule.condition === 'gt' ? greater(arr[+rule.field], rule.condition_value) : greaterOrEqual(arr[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result, res);
        }

        // contains
        if (rule.condition === 'contains') {
            const result = isContain(data, rule.condition_value);

            return sendResponse(rule, data, result, res);
        }
    }

    // data of type 'array'
    if (type === 'array') {
        // equals
        if (rule.condition === 'eq') {
            const result = equal(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result, res);
        }

        // not equals
        if (rule.condition === 'neq') {
            const result = notEqual(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result, res);
        }

        // greater && greater than or equal to
        if (rule.condition === 'gt' || rule.condition === 'gte') {
            const result = rule.condition === 'gt' ? greater(data[+rule.field], rule.condition_value) : greaterOrEqual(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result, res);
        }

        // contains
        if (rule.condition === 'contains') {
            const result = isContain(data, rule.condition_value);

            return sendResponse(rule, data, result, res);
        }
    }

    // base case - when data is of type 'object'
    // equals
    if (rule.condition === 'eq') {
        const result = equal(data[rule.field], rule.condition_value);

        return sendResponse(rule, data, result, res);
    }

    if (rule.condition === 'neq') {
        const result = notEqual(data[rule.field], rule.condition_value);

        return sendResponse(rule, data, result, res);
    }

    if (rule.condition === 'gt' || rule.condition === 'gte') {
        const result = rule.condition === 'gt' ? greater(data[rule.field], rule.condition_value) : greaterOrEqual(data[rule.field], rule.condition_value);

        return sendResponse(rule, data, result, res);
    }

    const result = isContain(data[rule.field, rule.condition_value]);

    sendResponse(rule, data, result, res);
});

const checkType = (body) => {
    if (Array.isArray(body)) return 'array';
    return typeof body
};


// send response
const sendResponse = (rule, data, result, res) => {
    if (result.value) {
        // success validation response
        res.status(200).json({
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
                validation: {
                    error: false,
                    field: rule.field,
                    field_value: result.field_value,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        });
    } else {
        // failed validation response
        res.status(400).json({
            message: `field ${rule.field} failed validation.`,
            status: 'error',
            data: {
                validation: {
                    error: true,
                    field: rule.field,
                    field_value: result.field_value,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        });
    }
};



