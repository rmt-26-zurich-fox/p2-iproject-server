const axios = require('axios')

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
                    "X-RapidAPI-Key": "5ed81f92cemsh7e7ae9cefcb2fa5p102f81jsn75940b69943d",
                    "X-RapidAPI-Host": "mega-fitness-calculator1.p.rapidapi.com"
                }
            })
            res.status(200).json(data.info)
        } catch (error) {
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
                    "X-RapidAPI-Key": "5ed81f92cemsh7e7ae9cefcb2fa5p102f81jsn75940b69943d",
                    "X-RapidAPI-Host": "mega-fitness-calculator1.p.rapidapi.com"
                }
            })
            res.status(200).json(data.info)
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
                    "X-RapidAPI-Key": "5ed81f92cemsh7e7ae9cefcb2fa5p102f81jsn75940b69943d",
                    "X-RapidAPI-Host": "mega-fitness-calculator1.p.rapidapi.com"
                }
            })
            data.info.carbs = (data.info.bmr * 0.6) / 4
            data.info.protein = (data.info.bmr * 0.15) / 4
            data.info.fat = (data.info.bmr * 0.25) / 9
            res.status(200).json(data.info)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller