const express = require("express");
const { connection } = require("./config/db");
const {user_router}=require("./routes/user.routes");
const {post_router}=require("./routes/post.routes");
const {authhenticate}=require("./middleware/authenticate.middleware");
const cors=require("cors");
const app = express();
app.use(express.json());
app.get("/api", (req, res) => {
    res.send("Welcome");
})
app.use(cors({
    origin: '*'
}));

app.use("/api",user_router); 
app.use(authhenticate);
app.use("/api/posts",post_router);
app.listen(4500, async () => {
    try {
        await connection;
        console.log("Connected to Db");
    } catch (error) {
        console.log(error);
        console.log("Problem in db");
    }
    console.log("4500 running");
})


// {
//     "name":"Atul",
//     "email":"atul@gmail.com",
//     "password":"1234",
//      "dob": "10-10-2010",
//     "bio": "String"
//   }


// {
//     "user":"6450b6a0ab2aa143f528ae74",
//      "text" :"String",
//           "image": "String",
//           "createdAt": "10-12-2011"
//   }