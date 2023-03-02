import mongoose from 'mongoose'

mongoose.set("strictQuery", false);
const connect = (uri) => {
    return mongoose.connect(uri)
}

export {connect}