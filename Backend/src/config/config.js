require('dotenv').config()

const config = {
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    GOOGLE_GEMINI_API_KEY : process.env.GOOGLE_GEMINI_API_KEY
}

module.exports = config