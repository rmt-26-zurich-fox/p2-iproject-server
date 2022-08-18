const uploadImage = async (req, res, next) => {
    try {
        const multer = require("multer");
        const storage = multer.memoryStorage();
        const upload = multer({ storage });
        const FormData = require("form-data");
        const axios = require("axios");
        const privateKey = process.env.imagekit_API;
        const form = new FormData();
        // console.log(req.file);
        if (!req.file) {
            throw {name: "ImgUrlRequired"}
        } else {
            let fileType = req.file.mimetype.split("/");

            if (fileType[0] !== "image") {
                throw { name: "File needs to be an image" };
            }
        }

        form.append("file", req.file.buffer.toString("base64"));
        form.append("fileName", req.file.originalname);

        await axios({
            url: "https://upload.imagekit.io/api/v1/files/upload",
            method: "post",
            data: form,
            headers: form.getHeaders(),
            auth: {
                username: privateKey,
            },
        })
            .then((response) => {
                console.log(response.data.url);
                req.imgUrl = response.data.url;
                next();
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

module.exports = uploadImage;