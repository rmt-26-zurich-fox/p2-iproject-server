const router= require('express').Router();
const {getPagingData,getPagination}= require('../middlewares/pagination');
const { Op } = require('sequelize');
const{Report,Category}= require('../models');
const midtransClient = require('midtrans-client');
 


class Controller{

    static async getAllReport(req,res,next){
        try {
            let{page,size,name}=req.query
            let where= {UserId: req.user.id}
            if(name){
                where.name=  { [Op.iLike]: `%${name}%` }
            }
            let {limit,offset}= getPagination(page,size)
            let data= await Report.findAndCountAll({where:where,limit,offset})
            let result= getPagingData(data,page,limit)
            res.status(200).json(result)
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

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : 'SB-Mid-server-V_dK50teqwrq_s7FnS_DHHo6'
            });

            let getRandom= Math.random()
            console.log(getRandom);
            let parameter = {
                "transaction_details": {
                    "order_id": `${getRandom}-BUY`,
                    "gross_amount": 10000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": req.user.name,
                    "email": req.user.email,
                    "phone": req.user.phoneNumber
                }
            };
          
              let transaction= await snap.createTransaction(parameter)
              let transactionUrl= transaction
            //   console.log('transactionToken:', transactionUrl);
            
            res.status(201).json(
               { data, trans: transactionUrl}
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