const axios = require('axios')
const apikey = process.env.rapid_apikey
const apihost = process.env.rapid_host

class Controller {
    static async bmi(req, res, next) {
        try {
            const { weight, height } = req.body
            if (!weight || !height) throw { name: 'inputError' }
            let reg = new RegExp('^[0-9]*$');
            if (reg.test(weight) == false || weight <= 0 || reg.test(height) == false || height <= 0) throw { name: `notInt` }
            const { data } = await axios({
                method: 'get',
                url: `https://mega-fitness-calculator1.p.rapidapi.com/bmi`,
                params: { weight, height },
                headers: {
                    "X-RapidAPI-Key": apikey,
                    "X-RapidAPI-Host": apihost
                }
            })
            res.status(200).json(data.info)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async fatPercent(req, res, next) {
        try {
            const { weight, height, age, gender } = req.body
            if (!weight) throw { name: 'weightError' }
            if (!height) throw { name: 'heightError' }
            if (!age) throw { name: 'ageError' }
            if (!gender) throw { name: 'genderError' }
            let reg = new RegExp('^[0-9]*$');
            if (reg.test(weight) == false || weight <= 0 || reg.test(height) == false || height <= 0
                || reg.test(age) == false || age <= 0) throw { name: `notInt` }
            const { data } = await axios({
                method: 'get',
                url: `https://mega-fitness-calculator1.p.rapidapi.com/bfp`,
                params: { weight, height, age, gender: gender.toLowerCase() },
                headers: {
                    "X-RapidAPI-Key": apikey,
                    "X-RapidAPI-Host": apihost
                }
            })
            const result = {
                bfp: data.info.bfp.toFixed(2),
                fat_mass: data.info.fat_mass.toFixed(2),
                lean_mass: data.info.lean_mass.toFixed(2),
                description: data.info.description,
                gender: data.info.gender
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async bmr(req, res, next) {
        try {
            const { weight, height, age, gender } = req.body
            if (!weight) throw { name: 'weightError' }
            if (!height) throw { name: 'heightError' }
            if (!age) throw { name: 'ageError' }
            if (!gender) throw { name: 'genderError' }
            let reg = new RegExp('^[0-9]*$');
            if (reg.test(weight) == false || weight <= 0 || reg.test(height) == false || height <= 0
                || reg.test(age) == false || age <= 0) throw { name: `notInt` }
            const { data } = await axios({
                method: 'get',
                url: `https://mega-fitness-calculator1.p.rapidapi.com/bmr`,
                params: { weight, height, age, gender: gender.toLowerCase() },
                headers: {
                    "X-RapidAPI-Key": apikey,
                    "X-RapidAPI-Host": apihost
                }
            })
            data.info.carbs = Math.floor((data.info.bmr * 0.6) / 4)
            data.info.protein = Math.floor((data.info.bmr * 0.15) / 4)
            data.info.fat = Math.floor((data.info.bmr * 0.25) / 9)
            res.status(200).json(data.info)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller