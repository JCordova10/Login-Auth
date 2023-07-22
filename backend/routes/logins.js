import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();
var test;

router.post("/", async (req, res) => {
    let newUser = {
        username: req.body.username,
        hashedPassword: req.body.hashedPassword,
        salt: req.body.saveSalt,       
    }
    let collection = db.collection("user");
    const userExists = await collection.findOne({username: newUser.username})
    if(userExists){
      return res.status(409).send({message:"Username already in use"})
    }
    let result = await collection.insertOne(newUser);
    res.send(result).status(204);
})

router.post("/username", async (req, res) => {
  let user = {
    username: req.body.username,
  }
  let collection = db.collection("user")
  let result = await collection.findOne({username:user.username})
  //console.log(result)
  
  if (!result) res.send({msg:"Not Found"}).status(404);
  else res.send({salt: result.salt}).status(200);
})

router.post("/hash", async (req, res) => {
  let user = {
    username: req.body.username,
    hashedPassword: req.body.hashedPassword
  }
  let collection = db.collection("user")
  let result = await collection.findOne({username:user.username})
  if (!result) res.send({msg:"Try again"}).status(404);
  if(result.hashedPassword === user.hashedPassword){
    test = true;
    res.send({test:test}).status(200);
  } else{
    test = false
    res.send({test:test}).status(200);
  }  
  
})

export default router;