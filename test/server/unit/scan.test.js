import { scan } from "../../../middleware/scan.js";
import ErrorResponse from "../../../utils/errorResponse.js";

const res = {};
let req = {
    body: {}
};

const next = jest.fn();

describe('Scan Middleware', () => {
    describe('Check for required fields', () => {
        it('should return rule is required', () => {
            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('rule is required.', 400));
        });

        it('should return data is required', () => {
            req.body.rule = {};
            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('data is required.', 400));
        });

        it('should return rule should be an object', () => {
            req.body.rule = 'ggh';
            req.body.data = {};

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('rule should be an object.', 400));
        });

        it('should return rule condition_value field is required.', () => {
            req.body.rule = {
                field: 'test',
                condition: 'neq'
            };
            req.body.data = {};

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('rule \'condition_value\' field is required.', 400));
        });

        it('should return equal is not an accepted condition', () => {
            req.body.rule = {
                field: 'test',
                condition: 'equal',
                condition_value: 'a'
            };
            req.body.data = {};

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('equal is not an accepted condition value.', 400));
        });

        it('should return data should be an object or a string or an aray.', () => {
            req.body.rule = {
                field: 'test',
                condition: 'eq',
                condition_value: 'a'
            };
            req.body.data = 234;

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('data should be an object or a string or an array.', 400));
        });

        it('should return field test is missing from data.', () => {
            req.body.rule = {
                field: 'test',
                condition: 'eq',
                condition_value: 'a'
            };

            req.body.data = {
                name: 'test'
            };

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse(`field ${req.body.rule.field} is missing from data.`, 400));
        });

        it('should return field 4 is missing from data.', () => {
            req.body.rule = {
                field: '4',
                condition: 'eq',
                condition_value: 'a'
            };

            req.body.data = ['a', 'b', 'c'];

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse(`field ${req.body.rule.field} is missing from data.`, 400));
        });

        it('should return field 3 is missing from data.', () => {
            req.body.rule = {
                field: '3',
                condition: 'eq',
                condition_value: 'a'
            };

            req.body.data = 'ata';

            scan(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse(`field ${req.body.rule.field} is missing from data.`, 400));
        });

        it('should call next function if no error picked', () => {
            req.body.rule = {
                field: "missions",
                condition: "gte",
                condition_value: 30
            };

            req.body.data = {
                name: "James Holden",
                crew: "Rocinante",
                age: 34,
                position: "Captain",
                missions: 45
            };

            scan(req, res, next);

            expect(next).toHaveBeenCalled();
        });
    });
});