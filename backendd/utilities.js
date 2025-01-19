const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    
    if (!token) {
        return res.status(401).json({ error: true, message: 'Access token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      
        
        if (err) {
            console.log('JWT Error:', err);
            return res.status(403).json({ error: true, message: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
};
