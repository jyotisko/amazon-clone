const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const URI = process.env.DB_URI.replace('%USERNAME%', process.env.DB_USERNAME).replace('%PASSWORD%', process.env.DB_PASSWORD);
mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log(`DB connection sucessful!`));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));