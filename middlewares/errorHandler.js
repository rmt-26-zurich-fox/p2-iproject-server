const errorHandler = (error, req, res, next) => {
	console.log(error);
	//! check if error is from sequelize
	if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
		//compile the error since the error can be more than 1 data
		error = error.errors.map(x => x.message);
		res.status(400).json({ message: error });
		return;
	}
	//! check if error have error code
	if (error.code) {
		if (error.code === 1) {
			//code 1 is from data when it cant be found from (findAll,findByPk,destroy,create, etc)
			res.status(404).json({ message: `data with id : ${error.id} is not found` });
			return;
		} else if (error.code === 2) {
			//code 2 is from username/password incorrect
			res.status(401).json({ message: error.message });
			return;
		} else if (error.code === 3) {
			//code 3 is from username not available
			res.status(401).json({ message: error.message });
			return;
		} else if (error.code === 4) {
			//code 4 is from no login token
			res.status(401).json({ message: error.message });
			return;
		} else if (error.code === 5) {
			//code 5 is from Authorization @ middleware/authorization.js
			res.status(403).json({ message: `you dont have sufficient access` });
			return;
		} else if (error.code === 6) {
			//code 6 is from empty username/password form
			res.status(401).json({ message: error.message });
			return;
		} else if (error.code === 7) {
			//code 7 is from statusById @ movieController, because status === beforeEdit.dataValues.status
			res.status(400).json({ message: error.message });
			return;
		} else if (error.code === 8) {
			//code 8 is from statusById @ movieController, because status is not either active/inactive/archived
			res.status(400).json({ message: error.message });
			return;
		}
	}
	//! if there is no error from sequelize / error code is not available
	res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
