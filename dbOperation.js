var oracledb = require('oracledb');
const config = require('./config/dbConfig');

async function getStudent(){
try{
    let stu=await (await oracledb.getConnection(config)).execute("select * from emp");
    return stu.recordsets;
}
catch(error){
    console.log(error);
}
}
module.exports={
    getStudent:getStudent,
}