const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    const salt = bcrypt.hash(password, 16)
    return salt;
}

const comparePassword = async (password, hashPassword) => {
    const comparePassword = await bcrypt.compare(password, hashPassword)
    return comparePassword
}

module.exports = {
    hashPassword,
    comparePassword
}