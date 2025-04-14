const User = require('../../models/auth/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/dotenv');
const { sendMailRecoveryPassword } = require('../../utils/mailer.utils');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario o contraseña incorrectos' }]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario o contraseña incorrectos' }]
            });
        }
        const payload = {
            id: user.id,
            roleId: user.roleId
        };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        res.json({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};

const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({
                errors: [{ msg: 'Token no válido' }]
            });
        }
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const payload = {
            user: {
                id: decoded.user.id
            }
        };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { email, ...rest } = req.body;
        const user = await User.create({ ...rest, email: email.toLowerCase() });
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

const profile = async (req, res, next) => {
    try {
        const idUser = req.user.id;
        const user = await User.findByPk(idUser, { attributes: { exclude: ['password'] } });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (email == null || email == undefined) {
            return res.status(400).json({
                errors: [{ msg: 'Correo requerido' }]
            });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario no encontrado' }]
            });
        }
        const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
        //send email
        await sendMailRecoveryPassword(user.email, resetToken);
        res.json({ message: 'Se ha enviado un correo para restablecer la contraseña' });
        } catch (err) {
        next(err);
        }
    };

    const passwordReset = async (req, res, next) => {
        try {
            const { token } = req.params;
            const { password } = req.body;

            if (!token) {
                return res.status(400).json({
                    errors: [{ msg: 'El enlace para restablecer la contraseña es inválido o falta el token.' }]
                });
            }
            if (!password) {
                return res.status(400).json({
                    errors: [{ msg: 'Por favor ingresa una nueva contraseña.' }]
                });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, JWT_SECRET);
            } catch (err) {
                return res.status(400).json({
                    errors: [{ msg: 'El enlace para restablecer la contraseña ha expirado o no es válido. Solicita uno nuevo.' }]
                });
            }

            const user = await User.findByPk(decoded.id);

            if (
                !user ||
                user.resetToken !== token ||
                !user.resetTokenExpiration ||
                user.resetTokenExpiration < Date.now() ||
                !user.resetToken
            ) {
                return res.status(400).json({
                    errors: [{ msg: 'El enlace para restablecer la contraseña ya fue utilizado, expiró o no es válido. Solicita uno nuevo.' }]
                });
            }

            user.password = password;
            user.resetToken = null;
            user.resetTokenExpiration = null;
            await user.save();

            res.json({ message: 'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.' });
        } catch (err) {
            next(err);
        }
};

module.exports = {
    login,
    refreshAccessToken,
    registerUser,
    profile,
    requestPasswordReset,
    passwordReset
};