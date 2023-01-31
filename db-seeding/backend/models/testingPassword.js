const bcrypt = require("bcrypt");
const User = require("./user-schema");

const password = "blackoutcrew";


const user = new User({
    username: "pat",
    
})

bcrypt.hash(password, 10).then((hash) => {
    console.log(hash)
});