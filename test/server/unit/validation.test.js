import { validation } from "../../../services/validation.js";

describe('Validation Service', () => {
    describe('Data type of string', () => {
        it('should validate condition eq', () => {
            const req = {
                rule: {
                    field: "0",
                    condition: "eq",
                    condition_value: "a"
                },
                data: "damien-marley"
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 400,
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

        it('should validate condition neq', () => {
            const req = {
                rule: {
                    field: "0",
                    condition: "neq",
                    condition_value: "a"
                },
                data: "damien-marley"
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 200,
                message: "field 0 successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "0",
                        field_value: 'd',
                        condition: "neq",
                        condition_value: 'a'
                    }
                }
            });
        });

        it('should validate condition gt', () => {
            const req = {
                rule: {
                    field: "0",
                    condition: "gt",
                    condition_value: "a"
                },
                data: "damien-marley"
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 200,
                message: "field 0 successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "0",
                        field_value: 'd',
                        condition: "gt",
                        condition_value: 'a'
                    }
                }
            });
        });

        it('should validate condition gte', () => {
            const req = {
                rule: {
                    field: "0",
                    condition: "gte",
                    condition_value: "d"
                },
                data: "damien-marley"
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 200,
                message: "field 0 successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "0",
                        field_value: 'd',
                        condition: "gte",
                        condition_value: 'd'
                    }
                }
            });
        });

        it('should validate condition contains', () => {
            const req = {
                rule: {
                    field: "0",
                    condition: "contains",
                    condition_value: "f"
                },
                data: "damien-marley"
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 400,
                message: "field 0 failed validation.",
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: "0",
                        field_value: "d",
                        condition: "contains",
                        condition_value: "f"
                    }
                }
            });
        });
    });

    describe('Data type of array', () => {
        it('should validate condition eq', () => {
            const req = {
                rule: {
                    field: "2",
                    condition: "eq",
                    condition_value: 3
                },
                data: [1, 2, 4, 3]
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 400,
                message: "field 2 failed validation.",
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: "2",
                        field_value: 4,
                        condition: "eq",
                        condition_value: 3
                    }
                }
            });
        });

        it('should validate condition neq', () => {
            const req = {
                rule: {
                    field: "2",
                    condition: "neq",
                    condition_value: 4
                },
                data: [1, 2, 4, 3]
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 400,
                message: "field 2 failed validation.",
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: "2",
                        field_value: 4,
                        condition: "neq",
                        condition_value: 4
                    }
                }
            });
        });

        it('should validate condition gt', () => {
            const req = {
                rule: {
                    field: "2",
                    condition: "gt",
                    condition_value: 4
                },
                data: [1, 2, 5, 3]
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 200,
                message: "field 2 successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "2",
                        field_value: 5,
                        condition: "gt",
                        condition_value: 4
                    }
                }
            });
        });

        it('should validate condition gte', () => {
            const req = {
                rule: {
                    field: "2",
                    condition: "gte",
                    condition_value: 4
                },
                data: [1, 2, 5, 3]
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 200,
                message: "field 2 successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "2",
                        field_value: 5,
                        condition: "gte",
                        condition_value: 4
                    }
                }
            });
        });

        it('should validate condition contains', () => {
            const req = {
                rule: {
                    field: "0",
                    condition: "contains",
                    condition_value: 'fish'
                },
                data: ['fish', 'rat', 'dog']
            };

            const res = validation(req);

            expect(res).toMatchObject({
                statusCode: 200,
                message: "field 0 successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "0",
                        field_value: 'fish',
                        condition: "contains",
                        condition_value: 'fish'
                    }
                }
            });
        });
    });

    describe('Data of type object', () => {
        it('should validate condition eq', () => {
            const req = {
                rule: {
                    field: "missions",
                    condition: "eq",
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

            const res = validation(req);

            expect(res).toMatchObject({
                message: "field missions failed validation.",
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: "missions",
                        field_value: 45,
                        condition: "eq",
                        condition_value: 30
                    }
                }
            });
        });

        it('should validate condition neq', () => {

            const req = {
                rule: {
                    field: "age",
                    condition: "neq",
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

            const res = validation(req);

            expect(res).toMatchObject({
                message: "field age successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "age",
                        field_value: 34,
                        condition: "neq",
                        condition_value: 30
                    }
                }
            });
        });

        it('should validate condition gt', () => {
            const req = {
                rule: {
                    field: "age",
                    condition: "gt",
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

            const res = validation(req);

            expect(res).toMatchObject({
                message: "field age successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "age",
                        field_value: 34,
                        condition: "gt",
                        condition_value: 30
                    }
                }
            });
        });

        it('should validate condition gte', () => {
            const req = {
                rule: {
                    field: "age",
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

            const res = validation(req);

            expect(res).toMatchObject({
                message: "field age successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "age",
                        field_value: 34,
                        condition: "gte",
                        condition_value: 30
                    }
                }
            });
        });

        it('should validate condition contains', () => {
            const req = {
                rule: {
                    field: "position",
                    condition: "contains",
                    condition_value: "Captain"
                },
                data: {
                    name: "James Holden",
                    crew: "Rocinante",
                    age: 34,
                    position: "Captain",
                    missions: 45
                }
            };

            const res = validation(req);

            expect(res).toMatchObject({
                message: "field position successfully validated.",
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: "position",
                        field_value: "Captain",
                        condition: "contains",
                        condition_value: "Captain"
                    }
                }
            });
        });
    });
});