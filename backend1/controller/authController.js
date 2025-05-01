import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../model/User.js";

export async function registerUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        }

        const hashedPassword = await hash(password, 8);

        const inQuery = "INSERT INTO users (username, password) VALUES (?, ?)";

        db.run(inQuery, [username, hashedPassword], function (err) {
            if (err) {
                return res.status(500).json({ message: "Something went wrong", status: 500 });
            }

            const userId = this.lastID;

            const query = "SELECT id, username FROM users WHERE id = ?";
            db.get(query, [userId], (err, user) => {
                if (err) {
                    return res.status(500).json({ message: "Something went wrong, please use different credentials", error: err.message, status: 500 });
                }

                res.status(201).json({ message: "User registered", user, status: 201 });
            });
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message, status: 500 });
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        }

        const query = "SELECT * FROM users WHERE username = ?";
        db.get(query, [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message, status: 500 });
            }

            if (!user) {
                return res.status(404).json({ message: "User not found", status: 404 });
            }

            const isValid = await compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ message: "Invalid password", status: 401 });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' }
            );

            res.status(200).json({ message: "Login successful", token: token, user: user, status: 200 });
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message, status: 500 });
    }
}
