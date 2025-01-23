//mongodb+srv://rekha:m5cUrKPQj8IR3ZWC@cluster0.vbn8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//m5cUrKPQj8IR3ZWC
import mongoose from "mongoose";

const connectDB = async () =>{
  mongoose.connection.on('connected',()=> console.log("Database connected"))
  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}
export default connectDB