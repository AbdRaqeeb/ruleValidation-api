import server from "../../utils/server.js";
import { BASE } from "../../utils/endpoints.js";


describe('Base Endpoint', () => {
    it('should return basic info', async () => {
        const response = await server().get(BASE);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
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
});
