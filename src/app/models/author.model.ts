import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    bio: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    website: {
        type: String,
        maxlength: 100,
    }
});

const AuthorModel = mongoose.model('Author', courseSchema);

export default AuthorModel;
