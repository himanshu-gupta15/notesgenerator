import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try{
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader?.split(" ")[1];
        }

        // Check for null, "null" string, or missing token
        if (!token || token === "null") {
            return res.status(401).json({message: "Token is not found or invalid"});
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({message: "user doesn't have valid token"})
        }

        req.userId = verifyToken.id;
        next();
    } catch(error) {
       return res.status(401).json({message: `Authentication error: ${error.message}`})
    }
}

export default isAuth;