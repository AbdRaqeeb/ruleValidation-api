import logger  from '../.././../middleware/logger.js';

const req = {
    method: 'POST',
    protocol: 'http',
    get: function (host) {
        return 'localhost:5000'
    },
    originalUrl: '/food'
};

const res = {};
const next = jest.fn();

describe('Logger function', () => {
    it('should call logger with req', () => {
        console.log = jest.fn();
        
        logger(req, res, next);

        expect(console.log).toHaveBeenCalledWith(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    });
});