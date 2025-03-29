const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/dotenv');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); 
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token requerido' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);        
        req.user = decoded; // Guardar el usuario en la petición
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = {authMiddleware};