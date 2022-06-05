const router=require("express").Router();
var oracledb = require('oracledb');
const config = require("../config/dbConfig");


router.get("/",async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        
        let sub=await connection.execute("select * from teacher_engage");
        res.status(200).json(sub);
        console.log(sub)


    }
    catch(err){
        console.log(err)
    }

})
router.post("/insert",async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);

        await connection.execute(`insert into teacher_engage values('${req.body.initials}','${req.body.day}',${req.body.period})`);
        connection.commit();
        console.log("inserted");
        res.send("Successfully inserted!");
    }
    catch(err){
        console.log(err)
    }
})
router.post("/update",async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        await connection.execute(`update teacher_engage set day=${req.body.day} where initials='${req.body.initials}'`);
        connection.commit();
        console.log("1 row updated");
        res.send("Successfully updated!");
    }
    catch(err){
        console.log(err)
    }
})
router.delete("/delete",async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        await connection.execute(`delete from teacher_engage where initials='${req.body.initials}'`);
        connection.commit();
        console.log("1 row deleted");
        res.send("Successfully deleted!");

    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;