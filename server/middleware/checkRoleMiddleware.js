const jwt = require('jsonwebtoken')

module.exports = function (role) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: "Не авторизован!" })
			}

			decodedToken = jwt.verify(token, process.env.SECRET_KEY)
			if (decodedToken.role !== role) {
				return res.status(403).json({ message: "Форбиджян!" })
			}
			req.user = decodedToken

			next()
		} catch (er) {
			res.status(401).json({ message: "Не авторизован!" })
		}
	}
}