import {userValidators} from "../../app/validation/user.validators";


describe('Test user validator', () => {

    it('should test if user object passes joi validation', () => {
        const validUser = {name: 'Test Name', email: 'test@testemail.com', password: 'Password1$'};
        const validtaionResult = userValidators(validUser);

        expect(validtaionResult).toBeTruthy();
    });

    it('should test if user object fails joi validation password', () => {
        const validUser = {name: 'Test Name', email: 'test@testemail.com', password: '1234'};
        const validtaionResult = userValidators(validUser);

        expect(Object.keys(validtaionResult)).toContain('error');
    });

    it('should test if user object fails joi validation email', () => {
        const validUser = {name: 'Test Name', email: '@@', password: 'Password1$'};
        const validtaionResult = userValidators(validUser);

        expect(Object.keys(validtaionResult)).toContain('error');
    });

    it('should test if user object fails joi validation name', () => {
        const validUser = {name: 'A', email: 'test@testemail.com', password: 'Password1$'};
        const validtaionResult = userValidators(validUser);

        expect(Object.keys(validtaionResult)).toContain('error');
    });

});


// describe('', () => {
//
//     it('', () => {
//
//     });
//
//     it('', () => {
//
//     });
//
// });
