import mongoose from mongoose

export const adminModel = mongoose.model("admin", {
  
  name: String,
  password: String,
  status: String,
  
},{timestamps:true});

