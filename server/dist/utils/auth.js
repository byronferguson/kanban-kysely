import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';
export async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
export async function verifyPassword(providedPassword, hashedPassword) {
    return bcrypt.compare(providedPassword, hashedPassword);
}
export function signToken(username) {
    return jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: '1h' });
}
export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return reject(new Error('Forbidden'));
            }
            resolve(payload);
        });
    });
}
