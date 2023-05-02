const mongoose=require("mongoose");
const postschema=mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        image: String,
        createdAt: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [{
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          text: String,
          createdAt: Date
        }]
      }
)

const postmodel=mongoose.model("posts",postschema);

module.exports={
    postmodel
}