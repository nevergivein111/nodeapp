const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
const local = process.env.DATABASE_LOCAL;

mongoose.connect(local).then(() => console.log('DB connection successful!'));

const blogSchema = new mongoose.Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

const Blog = mongoose.model('Blog', blogSchema);

const blogresult = Blog.create({
  title: 'hey ok s333 ',
  author: 'mohsin'
});
/*
const firstblog = new Blog({ title: 'hey 33', author: 'mohsin' });

firstblog
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });
  */

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
