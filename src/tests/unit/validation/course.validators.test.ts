import {courseValidators} from "../../../app/validation/course.validators";


describe('Test Course validator', () => {

    it('should pass valid course that is published', () => {
        const validCourse = {
            name: 'Test Name',
            author: '5cb0b9fa67be6d7b9fca2dbb',
            tags: ['test'],
            isPublished: true,
            price: 100,
            category: 'backend'
        };
        const validationResult = courseValidators(validCourse);

        expect(validationResult).toBeTruthy();
    });

    it('should pass valid course that is not published', () => {
        const validCourse = {
            name: 'Test Name',
            author: '5cb0b9fa67be6d7b9fca2dbb',
            tags: ['test'],
            isPublished: false,
            category: 'backend'
        };
        const validationResult = courseValidators(validCourse);

        expect(validationResult).toBeTruthy();
    });

    it('should return error if course has invalid price', () => {
        const invalidCoursePrice = {
            name: 'Test Name',
            author: '5cb0b9fa67be6d7b9fca2dbb',
            tags: ['test'],
            isPublished: true,
            price: 5,
            category: 'backend'
        };
        const validationResult = courseValidators(invalidCoursePrice);

        expect(validationResult).toHaveProperty('error');
    });

    it('should return error if course has invalid id', () => {
        const invalidCourseAuthorId = {
            name: 'Test Name',
            author: '1234',
            tags: ['test'],
            isPublished: true,
            price: 100,
            category: 'backend'
        };
        const validationResult = courseValidators(invalidCourseAuthorId);

        expect(validationResult).toHaveProperty('error');
    });

    it('should return error if course has invalid category', () => {
        const invalidCourseCategory = {
            name: 'Test Name',
            author: '5cb0b9fa67be6d7b9fca2dbb',
            tags: ['test'],
            isPublished: true,
            price: 100,
            category: ''
        };
        const validationResult = courseValidators(invalidCourseCategory);

        expect(validationResult).toHaveProperty('error');
    });

});

