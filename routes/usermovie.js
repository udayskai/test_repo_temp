let express = require("express");
let router = express.Router();
let joi = require("@hapi/joi");
let fawn = require("fawn");


let user = require("../dbModel/user");
let movie = require("../dbModel/movie");

let usermovie = require("../dbModel/userMovie");

router.post("/usermovieMaster", async (req, res) => {
    let { error } = usermovievalidation(req.body);
    if (error) { return res.send(error.details[0].message) }

    let userstocks = await user.userModel.findById(req.body.userId).catch(error=> {return res.send("Invalid UserId")});

    if (!userstocks) { return res.status(403).send({ message: " invalid user id" }) }
    console.log(userstocks);

    let moviestocks = await movie.movieModel.findById(req.body.movieId).catch(error=> {return res.send("Invalid MovieId")});
    if (!moviestocks) { return res.status(403).send({ message: " invalid movie id" }) }
    console.log(moviestocks);
    // if (moviestocks === 0) { return res.status(404).send({ message: "out of stocks" }); }

    let data = new usermovie({
        userId:
        {
            firstname: userstocks.firstname,
            lastname: userstocks.lastname,
            email: userstocks.email
        }
        ,
        movieId: {

            name: moviestocks.name,
            actor: moviestocks.actor,
            price: moviestocks.price,
            stocks: moviestocks.stocks
        }

    });
    // let item = await data.save();
    // moviestocks.stocks--;
    // await moviestocks.save();
    // res.send(item);



    fawn
        .Task()
        .save("usermoviestocks", data)
        .update("moviestocks", { _id: moviestocks._id },
            { $inc: { stocks: -1 } }).run();
    res.send(data);


})
function usermovievalidation(error) {
    let schema = joi.object({
        userId: joi.string().required(),
        movieId: joi.string().required()
    })
    return schema.validate(error);
}

module.exports = router;