const bcrypt = require("bcrypt");

const hashing = async (password) => {
  try {
    const salt = await bcrypt.genSalt(3);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const verify = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    throw new Error("Check your password " + error.message);
  }
};

module.exports = { hashing, verify };
