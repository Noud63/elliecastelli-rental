import mongoose from 'mongoose'

let connected = false

//Mongoose object is async it returns a promise
const connectDB = async () => {
    mongoose.set('strictQuery', true);  // Only the fields in the schema are saved in the database

    //If database is already connected, don't connect again
    if(connected){
        console.log('MongoDB is already connected!')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoDB connected!')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB