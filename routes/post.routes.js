const express=require("express");
const post_router=express.Router();
const {postmodel}=require("../models/post.model")

post_router.get("/",async(req,res)=>{
    try {
        const data=await postmodel.find();
        res.send(data);    
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch data");
    }
    
})
post_router.put('/like/:id', async (req, res) => {
    try {
      const post = await postmodel.findById(req.params.id);
  
      // Check if the post has already been liked by the current user
      if (post.likes.some(like => like.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift(req.user.id);
  
      await post.save();res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

post_router.get("/:id",async(req,res)=>{
    const ID=req.params.id;
    let flight=await postmodel.findOne({_id:ID});
    try {
        res.send(flight);    
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch data");
    }
    
})

post_router.delete("/:id",async(req,res)=>{
    const ID=req.params.id;
    let flight=await postmodel.findByIdAndDelete({"_id":id});
    try {
        res.send("deleted");    
    } catch (error) {
        console.log(error);
        res.send("Unable to delte data");
    }
    
})

post_router.patch("/:id",async(req,res)=>{
    const ID=req.params.id;
    const payload=req.body;
    try {
        let flight=await postmodel.findByIdAndUpdate({"_id":id},payload);
        res.send("Updated");    
    } catch (error) {
      //  console.log(error);
        res.send(payload);
    }
    
})


post_router.post("/",async(req,res)=>{
    const payload=req.body;
    try {
        const newnote=new postmodel(payload);
        await newnote.save();
        res.send(" created")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
})

post_router.post("/posts/:id/like", async (req, res) => {
    try {
        const id = req.params.id;
        const myId = req.body.userId || req.body.userID;
        let post = await postmodel.findOne({ _id: id });
        post.likes.push(myId);
        await postmodel.findByIdAndUpdate({ _id: id }, post);
        res.send("liked");
    } catch (error) {
        res.send(error);
    }
})

post_router.post("/posts/:id/comment", async (req, res) => {
    try {
        const id = req.params.id;
        const myId = req.body.userId || req.body.userID;
        let obj = {
            user: myId,
            text: req.body.text,
            createdAt: new Date().toJSON()
        }
        let post = await PostModel.findOne({ _id: id });
        post.comments.push(obj);
        await postmodel.findByIdAndUpdate({ _id: id }, post);
        res.send("post successfully");
    } catch (error) {
        res.json(error);
    }
})

module.exports={
    post_router
}