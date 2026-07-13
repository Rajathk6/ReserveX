import jwt from 'jsonwebtoken';
import env from '../src/config/env.js';

const token = jwt.sign({ role: 'ADMIN' }, env.JWT_ACCESS_SECRET);

const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

console.log(decoded);
