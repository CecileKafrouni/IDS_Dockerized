const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authortest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const authorSchema = mongoose.model('Author',{
    firstName: String,
    lastName: String
});

const testAuthor = () => {
    const author = new authorSchema({firstName: "test", lastName: "Uploaaad"});
    author.save().then(() => console.log('ok'));
}

module.exports = {testAuthor,authorSchema};