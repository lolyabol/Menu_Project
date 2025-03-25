import session from 'express-session';
import crypto from 'crypto';

const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);

app.use(session({
    secret: secret, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

