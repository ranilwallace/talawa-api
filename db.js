
const mongoose = require("mongoose");

const connect = mongoose
.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@talawa-dev-nk4oo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

module.exports = connect