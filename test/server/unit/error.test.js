import { errorHandler } from "../../../middleware/error.js";
import Response from "../../utils/response.js";

const req = {};

let err = {
    name: 'TypeError',
    message: 'Test'
};
const next = jest.fn();


describe('Error Handler', () => {
    it('should console to log error', () => {
        const res = new Response();
        err.name = 'TypeError';

        console.log = jest.fn();

        errorHandler(err, req, res, next);

        expect(console.log).toHaveBeenCalledWith(err);
    });

    it('should return 400 for invalid json payload', () => {
        const res = new Response();
        err.type = 'entity.parse.failed';

        errorHandler(err, req, res, next);

        expect(res.status).toBe(400);
    });

    it('should return 500', () => {
        const res = new Response();
        err.type = undefined;

        errorHandler(err, req, res, next);

        expect(res.status).toBe(500);
    });
});