export const equal = (a, b) => {
    return {
        value: a === b,
        field_value: a
    };
};

export const notEqual = (a, b) => {
    return {
        value: a !== b,
        field_value: a
    };
};

export const greater = (a, b) => {
    return {
        value: a > b,
        field_value: a
    };
};

export const greaterOrEqual = (a, b) => {
    return {
        value: a >= b,
        field_value: a
    } ;
};

export const isContain = (a, b) => {
    return {
        value: a.includes(b),
        field_value: a
    }
};