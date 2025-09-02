const mongoose=require('mongoose');
const initdata=require("./data.js")//sample data
const listing=require("../models/listing.js")
main().then((res)=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
};

const initDB= async()=>{
    await listing.deleteMany({});
   initdata.data=initdata.data.map((obj)=>({
    ...obj,
    owner:'68a5ab4bd5e826066b9a19e4',
   }))
    await listing.insertMany(initdata.data)
    console.log("data initialized")
}
initDB()