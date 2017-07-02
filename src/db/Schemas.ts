import * as Mongoose from 'mongoose';
const Spartan = new Mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    insertedDate: {
        type: Date,
        default: new Date()
    }
}) 

const spartanModel = Mongoose.model('spartan', Spartan)
export default {
    Spartan: spartanModel
}