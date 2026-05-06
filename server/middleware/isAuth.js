import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try{
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader?.split(" ")[1];
        }

        if (!token) {
            return res.status(400).json({message: "Token is not found"});
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(400).json({message: "user doesn't have valid token"})
        }

        req.userId = verifyToken.id;
        next();
    } catch(error) {
       return res.status(500).json({message: `is auth error ${error}`})
    }
}

export default isAuth;