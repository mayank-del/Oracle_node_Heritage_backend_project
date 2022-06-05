var express=require("express");
var cors=require("cors");

var app= express();

const subject=require("./routes/subject");
const class_allocated=require("./routes/class_allocated");
const current_sub=require("./routes/current_sub");
const teacher=require("./routes/teacher");
const teacher_engage=require("./routes/teacher_engage");
const period=require("./routes/period");
const rooms=require("./routes/rooms");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use("/api/subject",subject);
app.use("/api/class_allocated",class_allocated);
app.use("/api/current_sub",current_sub);
app.use("api/teacher",teacher);
app.use("teacher_engage",teacher_engage);
app.use("/api/period",period);
app.use("/api/rooms",rooms);

var port=5000;



app.listen(port,()=>{
    console.log(`server is listening to ${port}`);
})
