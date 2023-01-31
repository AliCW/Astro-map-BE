const bcrypt = require("bcrypt");
const User = require("./user-schema");

const password = "blackoutcrew";
let encrypted = ''

const user = new User({
    username: "pat",
    
})


bcrypt.hash(password, 10).then((hash) => {
    console.log(hash)
    encrypted = hash
}).then(() => {
    console.log(bcrypt.compareSync(password, encrypted), '<< compareSync')

})

