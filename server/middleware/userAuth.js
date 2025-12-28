import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.user = { id: decoded.id }; // FIXED: set on req.user, not req.body
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;

