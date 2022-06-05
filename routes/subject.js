const router=require("express").Router();
var oracledb = require('oracledb');
const config = require("../config/dbConfig");
const { authRole,authPassword } = require("../middlewares");


router.get("/",async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        
        let sub=await connection.execute("select * from subject");
        res.status(200).json(sub);
        console.log(sub)


    }
    catch(err){
        console.log(err)
    }

})
router.post("/insert",authRole(["teacher","admin"]),authPassword(["mk007","himma5"]),async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);

        await connection.execute(`insert into subject values('${req.body.name}','${req.body.code}',${req.body.semester},'${req.body.nature}')`);
        connection.commit();
        console.log("inserted");
        res.send("Successfully inserted!");
    }
    catch(err){
        console.log(err)
    }
})
router.post("/update",authRole(["teacher","admin"]),authPassword(["mk007","himma5"]),async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        await connection.execute(`update subject set name='${req.body.name}',semester=${req.body.semester} where code='${req.body.code}'`);
        connection.commit();
        console.log("1 row updated");
        res.send("Successfully updated!");
    }
    catch(err){
        console.log(err)
    }
})
router.delete("/delete",authRole(["admin"]),authPassword(["himma5"]),async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        await connection.execute(`delete from subject where code='${req.body.code}'`);
        connection.commit();
        console.log("1 row deleted");
        res.send("Successfully deleted!");

    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;