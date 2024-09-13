import mongoose from "mongoose";

export const dbConnection = () => {
mongoose.connect(process.env.MONGODB_URL,{
   
})
.then(() => {
    console.log("Connected To Database");
})
.catch((error) => {
    console.log("Error Occured While Connecting To Database");
});
};