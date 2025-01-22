const mongoose = require("mongoose");

const DbCon = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const con = await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = DbCon;
