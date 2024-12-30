import mongoose, { mongo } from "mongoose"


export const connection= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"MERN_AUTHENTICATION"
    }).then(()=>{
        console.log("Connected to database");
    }).catch((e)=>{
        console.log(`Some error ocurred while connecting the server ${e}`)
    })
}