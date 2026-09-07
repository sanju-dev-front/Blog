const jwt = require('jsonwebtoken');

const secretKey = '$uperMAn@123'; // Replace with your own secret key

function createTokenForUser(user) { 
    const payload = { 
        _id: user._id,
        email: user.email,
       profileImageURL: user.profileImageURL,
       role: user.role
    };
 const token = jwt.sign(payload, secretKey); 
 return token;
}

function validateToken(token) { 
    const payload = jwt.verify(token, secretKey);
    return payload;
}

module.exports = { createTokenForUser, validateToken };