const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModels.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await userModels.generateToken(user.id);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Internal server error" });
  }
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModels.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModels.createUser({ name, email, password: hashedPassword });
    const token = await userModels.generateToken(newUser.id);
    return res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login: loginController,
  register: registerController,
};
