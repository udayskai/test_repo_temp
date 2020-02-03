let express = require("express");
let app = express();
let mongoose = require("mongoose");
let stockuser = require("./routes/user");
let stockmovie = require("./routes/movie");
let usermoviestocks = require("./routes/usermovie.js");
let port = 4800 || process.env.PORT;
let fawn = require('fawn');
fawn.init(mongoose);


app.use(express.json());

mongoose.connect("mongodb://localhost/HHD", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected"))
    .catch((error) => console.log(`something went wrong ${error.message}`));

    app.use("/api/stocks", stockmovie);
    app.use("/api/stocks", stockuser);
    app.use("/api/stocks", usermoviestocks);

app.listen(port, () => console.log(`connected to port`));


