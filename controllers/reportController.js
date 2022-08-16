const router= require('express').Router();
const{Report,Category}= require('../models');

class Controller{
    static async getAllReport(req,res,next){
        try {
            let data= await Report.findAll({where:{UserId: req.user.id}})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async reportById(req,res,next){
        try {
            let{id}= req.params
            let data= await Report.findOne({where:{id:id}, include:{model:Category}})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addReport(req,res,next){
        try {
            let{imageUrl,name,CategoryId,UserId}= req.body
            let data= await Report.create({imageUrl,name,CategoryId,UserId: req.user.id})
            res.status(201).json(
                data
            )
        } catch (error) {
            next(error)
        }
    }

    static async updateReport(req,res,next){
        try {
            let {reportId} = req.params
            let {imageUrl,name,CategoryId}= req.body
            let data= await Report.update({imageUrl,name,CategoryId},{where:{id:reportId}})
            if(!data)throw({name: "data not found"})
            res.status(200).json({
                message: 'Success update Report'
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async deleteReport(req,res,next){
        try {
            let{id}=req.params
            let data= await Report.destroy({where:{id:id}})
            if(!data){
                throw ({name:'data not found'})
            }
            res.status(200).json({
                message: `Success deleted id ${id}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports= Controller