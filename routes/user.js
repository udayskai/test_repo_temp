let express = require("express");
let router = express.Router();
// let joi = require("@hapi/joi");
let user = require("../dbModel/user");


router.post("/user", async(req, res) => {
    // let { error } = userValidation(req.body);
    // if (error) { return res.send(error.details[0].message) }

    let data = new user.userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })

    let item = await data.save();
    res.send({ i: item })

})

// function userValidation(error) {
//     let schema = joi.object({
//         firstname: joi.string().required(),
//         lastname: joi.string().required(),
//         email: joi.string()
//     })
//     return schema.validate(error);
// }

module.exports = router;



