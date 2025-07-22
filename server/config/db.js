const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB');
    console.error(error.message);         // Покажи только текст ошибки
    process.exit(1);                      // Прерви процесс при ошибке
  }
};

module.exports = connectDb;
