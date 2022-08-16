const router= require('express').Router();
const{Report,Category}= require('../models');

class Controller{
    static async getAllReport(req,res,next){
        try {
            let data= await Report.findAll({where:{UserId: req.user.id, include: {model: Category}}})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async reportById(req,res,next){
        try {
            let{id}= req.params
            let data= await Report.findOne({where:{id:id}})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports= Controller