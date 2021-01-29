import { equal, isContain, greaterOrEqual, greater, notEqual } from "../../../utils/evaluations.js";

describe('Evaluation Methods', () => {
    describe('Equal', () => {
        it('should return true and first parameter for equal parameters', () => {
            const response = equal(1, 1);

            expect(response).toMatchObject({
                value: true,
                field_value: 1
            });
        });

        it('should return false and first patameter for unequal parameters', () => {
            const res = equal(2, 4);

            expect(res).toMatchObject({
                value: false,
                field_value: 2
            });
        });
    });

    describe('Not Equal', () => {
        it('should return true and first parameter for unequal parameters', () => {
            const response = notEqual(1, 2);

            expect(response).toMatchObject({
                value: true,
                field_value: 1
            });
        });

        it('should return false and first patameter for equal parameters', () => {
            const res = notEqual(2, 2);

            expect(res).toMatchObject({
                value: false,
                field_value: 2
            });
        });
    });

    describe('Greater Than', () => {
        it('should return true and first parameter for 1st param > 2nd param', () => {
            const response = greater(2, 1);

            expect(response).toMatchObject({
                value: true,
                field_value: 2
            });
        });

        it('should return false and first parameter for 1st param < 2nd param', () => {
            const res = greater(3, 4);

            expect(res).toMatchObject({
                value: false,
                field_value: 3
            });
        });
    });

    describe('Greater Than or Equal To', () => {
        it('should return true and first parameter for 1st param > 2nd param', () => {
            const response = greaterOrEqual(2, 1);

            expect(response).toMatchObject({
                value: true,
                field_value: 2
            });
        });

        it('should return true and first parameter for 1st param === 2nd param', () => {
            const response = greaterOrEqual(2, 2);

            expect(response).toMatchObject({
                value: true,
                field_value: 2
            });
        });

        it('should return false and first parameter for 1st param < 2nd param', () => {
            const res = greaterOrEqual(3, 4);

            expect(res).toMatchObject({
                value: false,
                field_value: 3
            });
        });
    });

    describe('Contains', () => {
        it('should return true and first parameter for 1st param contains 2nd param', () => {
            const arr = [2, 1, 4];
            const response = isContain(arr[1], 1);

            expect(response).toMatchObject({
                value: true,
                field_value: arr[1]
            });
        });

        it('should return false and first parameter for 1st param not contains 2nd param', () => {
            const arr = [2, 1, 4];
            const response = isContain(arr[2], 1);

            expect(response).toMatchObject({
                value: false,
                field_value: arr[2]
            });
        });
    });
});