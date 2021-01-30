import asyncHandler from '../../../middleware/async.js';

const error = new Error('Test error');
const next = jest.fn();

describe('Async Handler', () => {
    it('should catch errors of function passed to it', async () => {
        const res = asyncHandler(() => {
            throw error;
        });

        expect(res).toThrow('Test error')
    });

    it('should call next when async func passed throws error', async () => {
        const res = asyncHandler(async (req, res, next) => {
            throw error;
        });

        await res(null, null, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('should call next when with arg of func passed to it', async () => {
        const res = asyncHandler(async (req, res, next) => {
            next('error');
        });

        await res(null, null, next);

        expect(next).toHaveBeenCalledWith('error');
    });
});