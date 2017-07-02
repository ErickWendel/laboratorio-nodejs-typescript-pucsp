import * as Mongoose from 'mongoose';

class Spartan {
    public _id: String
    public name: String
    public age: Number
}

Object.seal(Spartan)
export default Spartan