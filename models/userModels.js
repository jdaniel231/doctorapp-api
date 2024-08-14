const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const User = {
  createUser: async (user) => {
    const { name, email, password } = user;
    try {
      const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
      const values = [name, email, password];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  findUserById: async (id) => {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw error;
    }
  },
  findUserByEmail: async (email) => {
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },
  updateUser: async (id, user) => {
    try {
      const query = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`;
      const values = [user.name, user.email, user.password, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
  generateToken: async (userId) => {
    try {
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
  }
};

module.exports = User;
