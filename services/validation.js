import { equal, greater, greaterOrEqual, isContain, notEqual } from "../utils/evaluations.js";

export const validation = (body) => {
    const { rule, data } = (body);

    // check type of data that is received
    const type = checkType(data);

    // data of type 'string'
    if (type === 'string') {
        let arr = data.split('');

        // equals
        if (rule.condition === 'eq') {
            const result = equal(arr[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }

        // not equals
        if (rule.condition === 'neq') {
            const result = notEqual(arr[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }

        // greater && greater than or equal to
        if (rule.condition === 'gt' || rule.condition === 'gte') {
            const result = rule.condition === 'gt' ? greater(arr[+rule.field], rule.condition_value) : greaterOrEqual(arr[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }

        // contains
        if (rule.condition === 'contains') {
            const result = isContain(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }
    }

    // data of type 'array'
    if (type === 'array') {
        // equals
        if (rule.condition === 'eq') {
            const result = equal(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }

        // not equals
        if (rule.condition === 'neq') {
            const result = notEqual(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }

        // greater && greater than or equal to
        if (rule.condition === 'gt' || rule.condition === 'gte') {
            const result = rule.condition === 'gt' ? greater(data[+rule.field], rule.condition_value) : greaterOrEqual(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }

        // contains
        if (rule.condition === 'contains') {
            const result = isContain(data[+rule.field], rule.condition_value);

            return sendResponse(rule, data, result);
        }
    }

    // base case - when data is of type 'object'
    // equals
    if (rule.condition === 'eq') {
        const result = equal(data[rule.field], rule.condition_value);

        return sendResponse(rule, data, result);
    }

    if (rule.condition === 'neq') {
        const result = notEqual(data[rule.field], rule.condition_value);

        return sendResponse(rule, data, result);
    }

    if (rule.condition === 'gt' || rule.condition === 'gte') {
        const result = rule.condition === 'gt' ? greater(data[rule.field], rule.condition_value) : greaterOrEqual(data[rule.field], rule.condition_value);

        return sendResponse(rule, data, result);
    }

    const result = isContain(data[rule.field], rule.condition_value);

    return sendResponse(rule, data, result);
};

const checkType = (body) => {
    if (Array.isArray(body)) return 'array';
    return typeof body
};


// send response
const sendResponse = (rule, data, result) => {
    if (result.value) {
        // success validation response
        return {
            statusCode: 200,
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
        };
    } else {
        // failed validation response
        return {
            statusCode: 400,
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
        }
    }
};