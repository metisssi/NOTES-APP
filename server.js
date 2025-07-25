const app = require('./app');
const connectDB = require('./server/config/db');

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  });
}
