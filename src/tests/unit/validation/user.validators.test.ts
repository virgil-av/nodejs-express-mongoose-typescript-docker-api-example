import {userValidators} from "../../../app/validation/user.validators";

describe('Test user validator', () => {

    it('should test if user object passes joi validation', () => {
        const validUser = {name: 'Test Name', email: 'test@testemail.com', password: 'Password1$'};
        const validationResult = userValidators(validUser);

        expect(validationResult).toBeTruthy();
    });

    it('should test if user object fails joi validation password', () => {
        const userInvalidPassword = {name: 'Test Name', email: 'test@testemail.com', password: '1234'};
        const validationResult = userValidators(userInvalidPassword);

        expect(validationResult).toHaveProperty('error');
    });

    it('should test if user object fails joi validation email', () => {
        const userInvalidEmail = {name: 'Test Name', email: '@@', password: 'Password1$'};
        const validationResult = userValidators(userInvalidEmail);

        expect(validationResult).toHaveProperty('error');
    });

    it('should test if user object fails joi validation name', () => {
        const userInvalidName = {name: 'A', email: 'test@testemail.com', password: 'Password1$'};
        const validationResult = userValidators(userInvalidName);

        expect(validationResult).toHaveProperty('error');
    });

});
