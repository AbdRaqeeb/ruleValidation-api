import server from "../../utils/server.js";
import { VALIDATE } from "../../utils/endpoints.js";

describe('Validate Endpoint', () => {
    it('should validate successfully', async () => {
        const req = {
            rule: {
                field: "missions",
                condition: "gte",
                condition_value: 30
            },
            data: {
                name: "James Holden",
                crew: "Rocinante",
                age: 34,
                position: "Captain",
                missions: 45
            }
        };

        const response = await server().post(VALIDATE).send(req);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "field missions successfully validated.",
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: "missions",
                    field_value: 45,
                    condition: "gte",
                    condition_value: 30
                }
            }
        });
    });

    it('should fail validation', async () => {
        const req = {
            rule: {
                field: "0",
                condition: "eq",
                condition_value: "a"
            },
            data: "damien-marley"
        };

        const response = await server().post(VALIDATE).send(req);

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            message: "field 0 failed validation.",
            status: "error",
            data: {
                validation: {
                    error: true,
                    field: "0",
                    field_value: "d",
                    condition: "eq",
                    condition_value: "a"
                }
            }
        });
    });

    it('should return missing data', async () => {
        const req = {
            rule: {
                field: "5",
                condition: "contains",
                condition_value: "rocinante"
            },
            data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        };

        const response = await server().post(VALIDATE).send(req);

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            message: "field 5 is missing from data.",
            status: "error",
            data: null
        });
    });
});