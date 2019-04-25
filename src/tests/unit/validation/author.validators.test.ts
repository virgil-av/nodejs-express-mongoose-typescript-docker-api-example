import { authValidators } from '../../../app/validation/auth.validators';


describe('Test auth validator', () => {

    it('should pass valid user auth', () => {
        const validUserAuth = {email: 'test@test.com', password: 'Password1#'};
        const validationResult = authValidators(validUserAuth);

        expect(validationResult).toBeTruthy();
    });

    it('should return error if user auth has invalid email', () => {
        const invalidAuthEmail = {email: 'abcd', password: 'Password1#'};
        const validationResult = authValidators(invalidAuthEmail);

        expect(validationResult).toHaveProperty('error');
    });

    it('should return error if user auth has invalid password', () => {
        const invalidAuthPassword = {email: 'test@test.com', password: '1234'};
        const validationResult = authValidators(invalidAuthPassword);

        expect(validationResult).toHaveProperty('error');
    });

});
