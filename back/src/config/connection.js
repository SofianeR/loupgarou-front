const mongoose = require("mongoose");

module.exports = function connection() {
    mongoose.connect(process.env.DATABASE_URI)
        .then(() => {
            console.log("success mongo connection");
        })
        .catch((e) => {
            console.error("error mongo: ", e);
        });

}
