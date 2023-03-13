import mongoose from 'mongoose'

mongoose.set("strictQuery", true);
const connect = (uri) => {
    return mongoose.connect(uri)
}

export default connect