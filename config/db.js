const mongoose=require("mongoose");
// const connection =mongoose.connect("mongodb+srv://atuldwivedi859:AtulDwivedi@cluster0.ohvwnav.mongodb.net/airline?retryWrites=true&w=majority");
const connection =mongoose.connect("mongodb+srv://atuldwivedi859:AtulDwivedi@cluster0.fdndrzv.mongodb.net/mock_social_media?retryWrites=true&w=majority");
module.exports={
    connection
}