const router=require("express").Router();
var oracledb = require('oracledb');
const config = require("../config/dbConfig");


router.get("/",async(req,res)=>{
    try{
        let connection=await oracledb.getConnection(config);
        
        let sub=await connection.execute("select * from rooms");
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

        await connection.execute(`insert into rooms values('${req.body.day}',${req.body.period},'${req.body.room_no}','${req.body.sub_code}')`);
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
        await connection.execute(`update rooms set room_no='${req.body.room_no}' where sub_code='${req.body.sub_code}'`);
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
        await connection.execute(`delete from rooms where sub_code='${req.body.sub_code}'`);
        connection.commit();
        console.log("1 row deleted");
        res.send("Successfully deleted!");

    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;