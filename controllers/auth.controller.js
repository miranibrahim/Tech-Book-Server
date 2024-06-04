const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    res.send({ token });
};

module.exports = { generateToken };
