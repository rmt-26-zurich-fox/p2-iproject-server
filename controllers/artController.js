 const { UserRefreshClient } = require('google-auth-library')
const {art, User} = require('../models')
const axios = require("axios")

class artController {
    
    static async art (req, res, next) {
        console.log("<<<dah masuk nih");
        try {
            const randId = Math.ceil(Math.random() * 480701)

            const {data} = await axios({
                url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randId}`
            })

            const image = data.primaryImageSmall

            // if(!data){
            //     throw {name: "noImage"}
            // }
            if(image === ""){
                throw {name: "noImage"}
            }

            res.status(200).json({message: 'success show art', image})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
    
    // static async arts (req, res, next) {
    //     try {
    //         let arts = await art.findAll({
    //             include: [{
    //                 model: User,
    //                 attributes: ['username']
    //             },{
    //                 model: Genre,
    //                 attributes: ['name']
    //             }],
    //         })
    //         res.status(200).json({
    //             message: "Successfully shown arts",
    //             arts: arts
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }


    // static async createart (req, res, next) {
    //     console.log(req.body,"<<<<<<<<<<")
    //     try {
    //         let { title, synopsis, trailerUrl, imgUrl, rating, genre_id} = req.body

    //         let user = await User.findByPk(+req.user.id,{
    //             attributes: ['email']
    //         });


    //         const createart = await art.create({
    //             title,
    //             synopsis,
    //             trailerUrl,
    //             imgUrl,
    //             rating,
    //             genre_id,
    //             user_id: req.user.id,
    //             status: "active"
    //         })

          
    //         let notification = `art with title ${createart.title} was created`

    //         await History.create({ title: createart.title, description: notification, updatedBy: user.email, art_id: createart.id })

    //         res.status(201).json({
    //             message: `art with title ${createart.title} has been created`,
    //             createart
    //         })
    //     } catch (error){
    //         next(error)

    //     }
    // }

//     static async updateart (req, res, next) {
//         try {
//             let id = req.params.id
//             let { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
//             let user = await User.findByPk(+req.user.id,{
//                 attributes: ['email']
//             });
        
//             let data = await art.findByPk(+id)

//             if(!data){
//                 throw { name: "artIdNotFound"}
//             }

//             await art.update(
//                 { title, synopsis, trailerUrl, imgUrl, rating, genreId}, 
//                 {where: {
//                     id
//                 }
//             })

//             let notification = `art with title ${data.title} has been updated`

//             await History.create({ title: data.title, description: notification, updatedBy: user.email, art_id: data.id })

//             res.status(200).json({ message: `art with title ${data.title} has been updated`})

            
//         } catch (error){
//             next(error)

//         }
//     }


//     static async updateStatus (req, res, next) {
//         try {
//             const {id} = req.params
//             const {status} = req.body
//             let user = await User.findByPk(+req.user.id,{
//                 attributes: ['email']
//             });

//             const findart = await art.findByPk(+id)

//             if (!findart) {
//                 throw { name: "artIdNotFound"}
//             }

//             await art.update(
//                 {status},
//                 {where: {
//                     id
//                 }}
//             )

//             let notification = `art with title ${findart.title} (id ${findart.id}) status' has been updated from ${findart.status} into ${status}`

//             await History.create({ title: findart.title, description: notification, updatedBy: user.email, art_id: findart.id })

//             res.status(200).json({message: "successfully update art status"})

//         } catch (error){
//             next(error)
//         }
//     }


//     static async showartById (req, res, next) {
        
//         try {
//             // let id = req.params.id
//             let id = +req.params.id
//             let data = await art.findOne({
//                 where: {
//                     id: id
//                 }
                
//             })
//             if(!data){
//                 throw { name: "artIdNotFound"}
//             }
//             res.status(200).json({data})
//         } catch (error) {
//            next(error) // success
//         }
//     }

//     static async deleteartById (req, res, next) {
//         try {
//             let data = await art.destroy({
//                 where: {
//                     id: +req.params.id
//                 }
//             })
//             if (!data){
//                 throw { name: "NotFound"}
//             }
//             res.status(200).json({
//                 message: "Success delete art with id: "+ req.params.id
//             })
//         } catch (error) {
//             next(error)
//             // if(error.name == "NotFound"){
//             //     res.status(404).json({message: "notFound"})
//             // } else {
//             //     res.status(500).json({message: "Internal server error"})
//             // }
//         }
//     }

//     static async genres (req, res, next) {
//         try{
//             let genres = await Genre.findAll()

//             res.status(200).json({
//                 message: "Here are our genres",
//                 genres: genres
//             })

//         } catch(error){
//             next(error)
//         }
//     }
// }

module.exports = {artController}