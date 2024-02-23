const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
// const local = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

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
